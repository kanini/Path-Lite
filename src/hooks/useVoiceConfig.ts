import {useState, useCallback, useEffect, useRef} from 'react';
import {SpeechConfig, VoiceType} from '../types/speech';
import {TTSService} from '../services/speech/TTSService';

export function useVoiceConfig() {
  const voiceConfigRef = useRef(TTSService.getVoiceConfig());
  const [config, setConfig] = useState<SpeechConfig>(
    voiceConfigRef.current.getConfig(),
  );
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  useEffect(() => {
    setConfig(voiceConfigRef.current.getConfig());
  }, []);

  const updateSpeechRate = useCallback(
    (rate: number) => {
      const success = TTSService.setSpeechRate(rate);
      if (success) {
        setConfig(voiceConfigRef.current.getConfig());
        logConfigChange('speech_rate', rate);
      }
      return success;
    },
    [],
  );

  const updateVoiceType = useCallback(
    (voice: VoiceType) => {
      TTSService.setVoiceType(voice);
      setConfig(voiceConfigRef.current.getConfig());
      logConfigChange('voice_type', voice);
    },
    [],
  );

  const updatePitch = useCallback(
    (pitch: number) => {
      const success = TTSService.setPitch(pitch);
      if (success) {
        setConfig(voiceConfigRef.current.getConfig());
        logConfigChange('pitch', pitch);
      }
      return success;
    },
    [],
  );

  const resetToDefaults = useCallback(() => {
    voiceConfigRef.current.resetToDefaults();
    setConfig(voiceConfigRef.current.getConfig());
    logConfigChange('reset_to_defaults', null);
  }, []);

  const previewVoice = useCallback(async () => {
    setIsPreviewPlaying(true);
    const prevCallbacks = {...TTSService};

    TTSService.setCallbacks({
      onDone: () => setIsPreviewPlaying(false),
      onError: () => setIsPreviewPlaying(false),
    });

    await TTSService.speak('This is how I will sound');
  }, []);

  const cancelPreview = useCallback(async () => {
    await TTSService.stop();
    setIsPreviewPlaying(false);
  }, []);

  return {
    config,
    isPreviewPlaying,
    updateSpeechRate,
    updateVoiceType,
    updatePitch,
    resetToDefaults,
    previewVoice,
    cancelPreview,
  };
}

function logConfigChange(setting: string, value: unknown): void {
  if (__DEV__) {
    console.log('[VoiceConfig Audit]', {
      timestamp: new Date().toISOString(),
      setting,
      newValue: value,
    });
  }
}
