import {useState, useCallback, useEffect, useRef} from 'react';
import {VoiceState, VoiceInputResult} from '../types/voice';
import {TranscriptionResult, VoiceError} from '../types/transcription';
import {PermissionStatus} from '../types/permissions';
import {VoiceService} from '../services/voice/VoiceService';
import {usePermissions} from './usePermissions';
import {validateConfidence} from '../utils/confidenceValidator';

const DEBOUNCE_MS = 300;

export function useVoiceInput() {
  const [voiceState, setVoiceState] = useState<VoiceState>(VoiceState.INACTIVE);
  const [result, setResult] = useState<VoiceInputResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const lastTapRef = useRef<number>(0);
  const {microphoneStatus, checkPermission, requestPermission} = usePermissions();

  useEffect(() => {
    VoiceService.setCallbacks({
      onStart: () => {
        setVoiceState(VoiceState.LISTENING);
        setError(null);
        setWarning(null);
      },
      onResult: (transcription: TranscriptionResult) => {
        const validation = validateConfidence(transcription.confidence);
        setResult({
          text: transcription.text,
          confidence: transcription.confidence,
          error: null,
        });
        if (!validation.isAcceptable) {
          setWarning(validation.warningMessage);
        }
        setVoiceState(VoiceState.INACTIVE);
      },
      onError: (voiceError: VoiceError, message: string) => {
        setError(message);
        setVoiceState(VoiceState.INACTIVE);
        setIsLoading(false);
      },
      onEnd: () => {
        setVoiceState(VoiceState.INACTIVE);
        setIsLoading(false);
      },
    });

    return () => {
      VoiceService.destroy();
    };
  }, []);

  const startListening = useCallback(async () => {
    const now = Date.now();
    if (now - lastTapRef.current < DEBOUNCE_MS) {
      return;
    }
    lastTapRef.current = now;

    setIsLoading(true);
    setError(null);
    setWarning(null);

    let status = microphoneStatus;
    if (status !== PermissionStatus.GRANTED) {
      const permResult = await requestPermission();
      status = permResult.status;
    }

    if (status === PermissionStatus.GRANTED) {
      setVoiceState(VoiceState.ACTIVE);
      await VoiceService.startRecording();
      setIsLoading(false);
    } else {
      setError('Microphone access required for voice input. Enable in Settings.');
      setVoiceState(VoiceState.INACTIVE);
      setIsLoading(false);
    }
  }, [microphoneStatus, requestPermission]);

  const stopListening = useCallback(async () => {
    await VoiceService.stopRecording();
    setVoiceState(VoiceState.INACTIVE);
    setIsLoading(false);
  }, []);

  return {
    voiceState,
    result,
    error,
    warning,
    isLoading,
    startListening,
    stopListening,
    checkPermission,
  };
}
