import {useEffect, useCallback} from 'react';
import {useAIVoice} from '../context/AIVoiceContext';
import {aiVoiceService} from '../services/AIVoiceService';
import {VoiceState} from '../types/voice';

interface UseAIVoiceSyncProps {
  autoActivate?: boolean;
}

export const useAIVoiceSync = ({autoActivate = false}: UseAIVoiceSyncProps = {}) => {
  const {
    isActive,
    isListening,
    isTTSPlaying,
    audioLevel,
    activateVoice,
    deactivateVoice,
    startListening,
    stopListening,
    setTTSPlaying,
    setAudioLevel,
  } = useAIVoice();

  const getVoiceState = useCallback((): VoiceState => {
    if (!isActive) return VoiceState.INACTIVE;
    if (isListening) return VoiceState.LISTENING;
    return VoiceState.ACTIVE;
  }, [isActive, isListening]);

  useEffect(() => {
    aiVoiceService.onStateChange((state: VoiceState) => {
      switch (state) {
        case VoiceState.INACTIVE:
          deactivateVoice();
          break;
        case VoiceState.ACTIVE:
          stopListening();
          break;
        case VoiceState.LISTENING:
          startListening();
          break;
      }
    });

    aiVoiceService.onAudioLevelChange((level: number) => {
      setAudioLevel(level);
    });

    return () => {
      aiVoiceService.cleanup();
    };
  }, [deactivateVoice, stopListening, startListening, setAudioLevel]);

  useEffect(() => {
    const checkTTSStatus = setInterval(() => {
      const playing = aiVoiceService.isTTSPlaying();
      setTTSPlaying(playing);
    }, 100);

    return () => clearInterval(checkTTSStatus);
  }, [setTTSPlaying]);

  useEffect(() => {
    if (autoActivate) {
      activateVoice();
      aiVoiceService.activateVoice();
    }
  }, [autoActivate, activateVoice]);

  const handleVoiceToggle = useCallback(async () => {
    if (!isActive) {
      activateVoice();
      await aiVoiceService.activateVoice();
    } else {
      deactivateVoice();
      await aiVoiceService.deactivateVoice();
    }
  }, [isActive, activateVoice, deactivateVoice]);

  const handleStartListening = useCallback(async () => {
    if (isActive && !isListening && !isTTSPlaying) {
      await aiVoiceService.startListening();
    }
  }, [isActive, isListening, isTTSPlaying]);

  const handleStopListening = useCallback(async (): Promise<string> => {
    if (isListening) {
      return await aiVoiceService.stopListening();
    }
    return '';
  }, [isListening]);

  return {
    voiceState: getVoiceState(),
    isActive,
    isListening,
    isTTSPlaying,
    audioLevel,
    handleVoiceToggle,
    handleStartListening,
    handleStopListening,
  };
};
