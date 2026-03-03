import {renderHook, act} from '@testing-library/react-native';
import {useVoiceInput} from '../../src/hooks/useVoiceInput';
import {VoiceState} from '../../src/types/voice';
import Voice from '@react-native-voice/voice';
import {check, request, RESULTS} from 'react-native-permissions';

describe('useVoiceInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (check as jest.Mock).mockResolvedValue(RESULTS.GRANTED);
    (request as jest.Mock).mockResolvedValue(RESULTS.GRANTED);
  });

  it('should initialize with INACTIVE state', () => {
    const {result} = renderHook(() => useVoiceInput());
    expect(result.current.voiceState).toBe(VoiceState.INACTIVE);
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.warning).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should start listening when permission is granted', async () => {
    const {result} = renderHook(() => useVoiceInput());

    await act(async () => {
      await result.current.startListening();
    });

    expect(Voice.start).toHaveBeenCalledWith('en-US');
  });

  it('should request permission before starting', async () => {
    (check as jest.Mock).mockResolvedValue(RESULTS.DENIED);
    (request as jest.Mock).mockResolvedValue(RESULTS.GRANTED);

    const {result} = renderHook(() => useVoiceInput());

    await act(async () => {
      await result.current.startListening();
    });

    expect(request).toHaveBeenCalled();
  });

  it('should set error when permission is denied', async () => {
    (check as jest.Mock).mockResolvedValue(RESULTS.DENIED);
    (request as jest.Mock).mockResolvedValue(RESULTS.DENIED);

    const {result} = renderHook(() => useVoiceInput());

    await act(async () => {
      await result.current.startListening();
    });

    expect(result.current.error).toBe(
      'Microphone access required for voice input. Enable in Settings.',
    );
    expect(result.current.voiceState).toBe(VoiceState.INACTIVE);
  });

  it('should stop listening when stopListening is called', async () => {
    const {result} = renderHook(() => useVoiceInput());

    await act(async () => {
      await result.current.startListening();
    });
    await act(async () => {
      await result.current.stopListening();
    });

    expect(Voice.stop).toHaveBeenCalled();
    expect(result.current.voiceState).toBe(VoiceState.INACTIVE);
  });

  it('should debounce rapid tap events', async () => {
    const {result} = renderHook(() => useVoiceInput());

    await act(async () => {
      await result.current.startListening();
      await result.current.startListening();
    });

    expect(Voice.start).toHaveBeenCalledTimes(1);
  });

  it('should provide checkPermission function', () => {
    const {result} = renderHook(() => useVoiceInput());
    expect(result.current.checkPermission).toBeDefined();
  });

  it('should cleanup voice service on unmount', () => {
    const {unmount} = renderHook(() => useVoiceInput());
    unmount();
    expect(Voice.destroy).toHaveBeenCalled();
  });

  it('should have null warning initially', () => {
    const {result} = renderHook(() => useVoiceInput());
    expect(result.current.warning).toBeNull();
  });

  it('should have null result initially', () => {
    const {result} = renderHook(() => useVoiceInput());
    expect(result.current.result).toBeNull();
  });
});
