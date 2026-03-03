import {useState, useCallback, useRef, useEffect} from 'react';
import {VoiceState} from '../types/voice';

interface UseAIVoiceIconProps {
  onStateChange?: (state: VoiceState) => void;
  isTTSPlaying?: boolean;
  debounceDelay?: number;
}

interface UseAIVoiceIconReturn {
  state: VoiceState;
  handlePress: () => void;
  isDisabled: boolean;
  tooltipMessage: string | null;
}

export const useAIVoiceIcon = ({
  onStateChange,
  isTTSPlaying = false,
  debounceDelay = 500,
}: UseAIVoiceIconProps = {}): UseAIVoiceIconReturn => {
  const [state, setState] = useState<VoiceState>(VoiceState.INACTIVE);
  const [tooltipMessage, setTooltipMessage] = useState<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastPressTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handlePress = useCallback(() => {
    const now = Date.now();
    const timeSinceLastPress = now - lastPressTimeRef.current;

    if (isTTSPlaying) {
      setTooltipMessage('Please wait for question to complete');
      setTimeout(() => setTooltipMessage(null), 3000);
      return;
    }

    if (timeSinceLastPress < debounceDelay) {
      return;
    }

    lastPressTimeRef.current = now;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const nextState =
        state === VoiceState.INACTIVE ? VoiceState.ACTIVE : VoiceState.INACTIVE;
      setState(nextState);
      onStateChange?.(nextState);
    }, 50);
  }, [state, isTTSPlaying, debounceDelay, onStateChange]);

  const transitionToListening = useCallback(() => {
    setState(VoiceState.LISTENING);
    onStateChange?.(VoiceState.LISTENING);
  }, [onStateChange]);

  const transitionToActive = useCallback(() => {
    setState(VoiceState.ACTIVE);
    onStateChange?.(VoiceState.ACTIVE);
  }, [onStateChange]);

  const transitionToInactive = useCallback(() => {
    setState(VoiceState.INACTIVE);
    onStateChange?.(VoiceState.INACTIVE);
  }, [onStateChange]);

  return {
    state,
    handlePress,
    isDisabled: isTTSPlaying,
    tooltipMessage,
  };
};
