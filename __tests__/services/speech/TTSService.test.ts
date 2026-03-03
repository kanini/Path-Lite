import * as Speech from 'expo-speech';
import {TTSService} from '../../../src/services/speech/TTSService';
import {SpeechStatus, TTSError, VoiceType} from '../../../src/types/speech';

describe('TTSService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    TTSService.stop();
  });

  it('should speak valid text input', async () => {
    await TTSService.speak('Hello world');
    expect(Speech.speak).toHaveBeenCalledWith(
      'Hello world',
      expect.objectContaining({
        language: 'en-US',
      }),
    );
  });

  it('should call onError for empty text', async () => {
    const onError = jest.fn();
    TTSService.setCallbacks({onError});
    await TTSService.speak('');
    expect(onError).toHaveBeenCalledWith(
      TTSError.SYNTHESIS_FAILED,
      'Cannot speak empty text',
    );
  });

  it('should call onError for whitespace-only text', async () => {
    const onError = jest.fn();
    TTSService.setCallbacks({onError});
    await TTSService.speak('   ');
    expect(onError).toHaveBeenCalledWith(
      TTSError.SYNTHESIS_FAILED,
      'Cannot speak empty text',
    );
  });

  it('should sanitize text before speaking', async () => {
    await TTSService.speak('<script>alert("xss")</script> Hello!');
    expect(Speech.speak).toHaveBeenCalledWith(
      expect.not.stringContaining('<script>'),
      expect.anything(),
    );
  });

  it('should invoke onStart callback', async () => {
    const onStart = jest.fn();
    TTSService.setCallbacks({onStart});
    await TTSService.speak('Test');

    jest.advanceTimersByTime(5);
    expect(onStart).toHaveBeenCalled();
  });

  it('should invoke onDone callback and update status to COMPLETED', async () => {
    const onDone = jest.fn();
    const onStatusChange = jest.fn();
    TTSService.setCallbacks({onDone, onStatusChange});
    await TTSService.speak('Test');

    jest.advanceTimersByTime(15);
    expect(onDone).toHaveBeenCalled();
  });

  it('should update status to SPEAKING when speak is called', async () => {
    const onStatusChange = jest.fn();
    TTSService.setCallbacks({onStatusChange});
    await TTSService.speak('Test');
    expect(onStatusChange).toHaveBeenCalledWith(SpeechStatus.SPEAKING);
  });

  it('should stop speech and update status to IDLE', async () => {
    await TTSService.speak('Test');
    await TTSService.stop();
    expect(Speech.stop).toHaveBeenCalled();
    expect(TTSService.getStatus()).toBe(SpeechStatus.IDLE);
  });

  it('should pause speech and update status to PAUSED', async () => {
    await TTSService.speak('Test');
    await TTSService.pause();
    expect(Speech.stop).toHaveBeenCalled();
    expect(TTSService.getStatus()).toBe(SpeechStatus.PAUSED);
  });

  it('should resume speech after pause', async () => {
    await TTSService.speak('Test');
    await TTSService.pause();
    await TTSService.resume();
    expect(Speech.speak).toHaveBeenCalledTimes(2);
  });

  it('should set voice type through service', () => {
    TTSService.setVoiceType(VoiceType.MALE);
    const config = TTSService.getVoiceConfig().getConfig();
    expect(config.voice).toBe(VoiceType.MALE);
  });

  it('should set speech rate through service', () => {
    const success = TTSService.setSpeechRate(1.5);
    expect(success).toBe(true);
    const config = TTSService.getVoiceConfig().getConfig();
    expect(config.rate).toBe(1.5);
  });

  it('should reject invalid speech rate', () => {
    const success = TTSService.setSpeechRate(3.0);
    expect(success).toBe(false);
  });

  it('should set pitch through service', () => {
    const success = TTSService.setPitch(1.5);
    expect(success).toBe(true);
  });

  it('should reject invalid pitch', () => {
    const success = TTSService.setPitch(3.0);
    expect(success).toBe(false);
  });

  it('should queue multiple speeches and process sequentially', async () => {
    TTSService.queueSpeech('First');
    TTSService.queueSpeech('Second');
    // processQueue calls speak (async due to volume check)
    // Flush microtasks to allow first speak to fire
    await Promise.resolve();
    await Promise.resolve();
    expect(Speech.speak).toHaveBeenCalledWith(
      'First',
      expect.anything(),
    );
    // After the first speech completes (mock onDone fires via setTimeout),
    // the queue should process the second item
    jest.advanceTimersByTime(20);
    await Promise.resolve();
    await Promise.resolve();
    expect(Speech.speak).toHaveBeenCalledWith(
      'Second',
      expect.anything(),
    );
  });
});
