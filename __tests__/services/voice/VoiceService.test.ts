import Voice from '@react-native-voice/voice';
import {VoiceService} from '../../../src/services/voice/VoiceService';
import {VoiceError} from '../../../src/types/transcription';

describe('VoiceService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should start recording and call Voice.start', async () => {
    await VoiceService.startRecording();
    expect(Voice.start).toHaveBeenCalledWith('en-US');
    expect(VoiceService.getIsRecording()).toBe(true);
  });

  it('should stop recording and call Voice.stop', async () => {
    await VoiceService.startRecording();
    await VoiceService.stopRecording();
    expect(Voice.stop).toHaveBeenCalled();
    expect(VoiceService.getIsRecording()).toBe(false);
  });

  it('should stop existing recording before starting a new one', async () => {
    await VoiceService.startRecording();
    await VoiceService.startRecording();
    expect(Voice.stop).toHaveBeenCalledTimes(1);
    expect(Voice.start).toHaveBeenCalledTimes(2);
  });

  it('should invoke onStart callback when speech starts', async () => {
    const onStart = jest.fn();
    VoiceService.setCallbacks({onStart});
    await VoiceService.startRecording();

    const handler = Voice.onSpeechStart;
    if (handler) handler({});
    expect(onStart).toHaveBeenCalled();
  });

  it('should invoke onResult callback with transcription on speech results', async () => {
    const onResult = jest.fn();
    VoiceService.setCallbacks({onResult});
    await VoiceService.startRecording();

    const handler = Voice.onSpeechResults;
    if (handler) handler({value: ['hello world']});
    expect(onResult).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'hello world',
        language: 'en-US',
      }),
    );
  });

  it('should invoke onError callback with NO_SPEECH for error code 5', async () => {
    const onError = jest.fn();
    VoiceService.setCallbacks({onError});
    await VoiceService.startRecording();

    const handler = Voice.onSpeechError;
    if (handler) handler({error: {code: '5', message: 'Client error'}});
    expect(onError).toHaveBeenCalledWith(
      VoiceError.NO_SPEECH,
      expect.any(String),
    );
  });

  it('should invoke onError callback with PERMISSION_DENIED for error code 9', async () => {
    const onError = jest.fn();
    VoiceService.setCallbacks({onError});
    await VoiceService.startRecording();

    const handler = Voice.onSpeechError;
    if (handler) handler({error: {code: '9', message: 'Permissions'}});
    expect(onError).toHaveBeenCalledWith(
      VoiceError.PERMISSION_DENIED,
      expect.any(String),
    );
  });

  it('should invoke onError callback with NETWORK_ERROR for error code 2', async () => {
    const onError = jest.fn();
    VoiceService.setCallbacks({onError});
    await VoiceService.startRecording();

    const handler = Voice.onSpeechError;
    if (handler) handler({error: {code: '2', message: 'Network error'}});
    expect(onError).toHaveBeenCalledWith(
      VoiceError.NETWORK_ERROR,
      expect.any(String),
    );
  });

  it('should timeout after 5 seconds and invoke onError with TIMEOUT', async () => {
    const onError = jest.fn();
    VoiceService.setCallbacks({onError});
    await VoiceService.startRecording();

    jest.advanceTimersByTime(5000);
    expect(onError).toHaveBeenCalledWith(
      VoiceError.TIMEOUT,
      expect.stringContaining('timed out'),
    );
  });

  it('should clear timeout when stopRecording is called', async () => {
    const onError = jest.fn();
    VoiceService.setCallbacks({onError});
    await VoiceService.startRecording();
    await VoiceService.stopRecording();

    jest.advanceTimersByTime(5000);
    expect(onError).not.toHaveBeenCalled();
  });

  it('should invoke onEnd callback when speech ends', async () => {
    const onEnd = jest.fn();
    VoiceService.setCallbacks({onEnd});
    await VoiceService.startRecording();

    const handler = Voice.onSpeechEnd;
    if (handler) handler({});
    expect(onEnd).toHaveBeenCalled();
    expect(VoiceService.getIsRecording()).toBe(false);
  });

  it('should destroy voice and remove listeners', async () => {
    await VoiceService.destroy();
    expect(Voice.destroy).toHaveBeenCalled();
    expect(Voice.removeAllListeners).toHaveBeenCalled();
  });

  it('should return noise suppression config', () => {
    const config = VoiceService.getNoiseConfig();
    expect(config).toBeDefined();
    expect(config.isEnabled()).toBe(true);
  });

  it('should return text as-is from sendToLLMPipeline placeholder', async () => {
    const result = await VoiceService.sendToLLMPipeline('test input');
    expect(result).toBe('test input');
  });

  it('should handle empty speech results gracefully', async () => {
    const onResult = jest.fn();
    VoiceService.setCallbacks({onResult});
    await VoiceService.startRecording();

    const handler = Voice.onSpeechResults;
    if (handler) handler({value: []});
    expect(onResult).toHaveBeenCalledWith(
      expect.objectContaining({text: ''}),
    );
  });
});
