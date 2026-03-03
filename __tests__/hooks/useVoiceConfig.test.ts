import {renderHook, act} from '@testing-library/react-native';
import {useVoiceConfig} from '../../src/hooks/useVoiceConfig';
import {VoiceType} from '../../src/types/speech';

describe('useVoiceConfig', () => {
  it('should initialize with default config', () => {
    const {result} = renderHook(() => useVoiceConfig());
    expect(result.current.config.rate).toBe(1.0);
    expect(result.current.config.voice).toBe(VoiceType.FEMALE);
    expect(result.current.isPreviewPlaying).toBe(false);
  });

  it('should update speech rate with valid value', () => {
    const {result} = renderHook(() => useVoiceConfig());
    act(() => {
      result.current.updateSpeechRate(1.5);
    });
    expect(result.current.config.rate).toBe(1.5);
  });

  it('should reject invalid speech rate', () => {
    const {result} = renderHook(() => useVoiceConfig());
    act(() => {
      const success = result.current.updateSpeechRate(3.0);
      expect(success).toBe(false);
    });
  });

  it('should update voice type', () => {
    const {result} = renderHook(() => useVoiceConfig());
    act(() => {
      result.current.updateVoiceType(VoiceType.MALE);
    });
    expect(result.current.config.voice).toBe(VoiceType.MALE);
  });

  it('should update pitch with valid value', () => {
    const {result} = renderHook(() => useVoiceConfig());
    act(() => {
      result.current.updatePitch(1.5);
    });
    expect(result.current.config.pitch).toBe(1.5);
  });

  it('should reset to defaults', () => {
    const {result} = renderHook(() => useVoiceConfig());
    act(() => {
      result.current.updateSpeechRate(1.5);
      result.current.updateVoiceType(VoiceType.MALE);
    });
    act(() => {
      result.current.resetToDefaults();
    });
    expect(result.current.config.rate).toBe(1.0);
    expect(result.current.config.voice).toBe(VoiceType.FEMALE);
  });

  it('should provide previewVoice function', () => {
    const {result} = renderHook(() => useVoiceConfig());
    expect(typeof result.current.previewVoice).toBe('function');
  });

  it('should provide cancelPreview function', () => {
    const {result} = renderHook(() => useVoiceConfig());
    expect(typeof result.current.cancelPreview).toBe('function');
  });
});
