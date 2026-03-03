import {useEffect, useState, useCallback} from 'react';
import {TTSService} from '../services/speech/TTSService';
import {STTService} from '../services/speech/STTService';
import {
  SpeechStatus,
  RecognitionStatus,
  TTSError,
  STTError,
  STTResult,
} from '../types/speech';

interface UseSpeechServicesReturn {
  speak: (text: string) => Promise<void>;
  stopSpeaking: () => Promise<void>;
  startListening: () => Promise<void>;
  stopListening: () => Promise<string>;
  cancelListening: () => Promise<void>;
  isSpeaking: boolean;
  isListening: boolean;
  ttsStatus: SpeechStatus;
  sttStatus: RecognitionStatus;
  partialTranscript: string;
  finalTranscript: string;
  audioLevel: number;
  error: string | null;
}

export const useSpeechServices = (): UseSpeechServicesReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [ttsStatus, setTtsStatus] = useState<SpeechStatus>(SpeechStatus.IDLE);
  const [sttStatus, setSttStatus] = useState<RecognitionStatus>(
    RecognitionStatus.IDLE,
  );
  const [partialTranscript, setPartialTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    TTSService.setCallbacks({
      onStart: () => {
        setIsSpeaking(true);
        setError(null);
      },
      onDone: () => {
        setIsSpeaking(false);
      },
      onError: (errorType: TTSError, message: string) => {
        setIsSpeaking(false);
        setError(`TTS Error: ${message}`);
      },
      onStatusChange: (status: SpeechStatus) => {
        setTtsStatus(status);
      },
    });

    STTService.setCallbacks({
      onStart: () => {
        setIsListening(true);
        setError(null);
        setPartialTranscript('');
        setFinalTranscript('');
      },
      onResult: (result: STTResult) => {
        if (result.isFinal) {
          setFinalTranscript(result.transcript);
          setPartialTranscript('');
        } else {
          setPartialTranscript(result.transcript);
        }
      },
      onEnd: (transcript: string) => {
        setIsListening(false);
        setFinalTranscript(transcript);
        setPartialTranscript('');
      },
      onError: (errorType: STTError, message: string) => {
        setIsListening(false);
        setError(`STT Error: ${message}`);
      },
      onStatusChange: (status: RecognitionStatus) => {
        setSttStatus(status);
      },
      onVolumeChange: (volume: number) => {
        setAudioLevel(volume);
      },
    });

    return () => {
      TTSService.stop();
      STTService.destroy();
    };
  }, []);

  const speak = useCallback(async (text: string) => {
    try {
      await TTSService.speak(text);
    } catch (err) {
      setError(`Failed to speak: ${err}`);
    }
  }, []);

  const stopSpeaking = useCallback(async () => {
    try {
      await TTSService.stop();
    } catch (err) {
      setError(`Failed to stop speaking: ${err}`);
    }
  }, []);

  const startListening = useCallback(async () => {
    try {
      await STTService.startListening();
    } catch (err) {
      setError(`Failed to start listening: ${err}`);
    }
  }, []);

  const stopListening = useCallback(async (): Promise<string> => {
    try {
      const transcript = await STTService.stopListening();
      return transcript;
    } catch (err) {
      setError(`Failed to stop listening: ${err}`);
      return '';
    }
  }, []);

  const cancelListening = useCallback(async () => {
    try {
      await STTService.cancelListening();
      setPartialTranscript('');
      setFinalTranscript('');
    } catch (err) {
      setError(`Failed to cancel listening: ${err}`);
    }
  }, []);

  return {
    speak,
    stopSpeaking,
    startListening,
    stopListening,
    cancelListening,
    isSpeaking,
    isListening,
    ttsStatus,
    sttStatus,
    partialTranscript,
    finalTranscript,
    audioLevel,
    error,
  };
};
