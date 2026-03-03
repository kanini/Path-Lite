import {useState, useCallback, useEffect, useRef} from 'react';
import {ConversationState, ConversationConfig} from '../types/conversation';
import {VoiceError} from '../types/transcription';
import {SpeechStatus} from '../types/speech';
import {PermissionStatus} from '../types/permissions';
import {TTSService} from '../services/speech/TTSService';
import {VoiceService} from '../services/voice/VoiceService';
import {usePermissions} from './usePermissions';

const TTS_STT_DELAY_MS = 300;

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

interface ConversationalFlowResult {
  conversationState: ConversationState;
  currentQuestionIndex: number;
  currentAnswer: {text: string; index: number} | null;
  error: string | null;
  startConversation: () => Promise<void>;
  stopConversation: () => Promise<void>;
  skipQuestion: () => void;
  retryCurrentQuestion: () => Promise<void>;
  setValidationCallback: (callback: (answer: string, questionIndex: number) => ValidationResult) => void;
}

export function useConversationalFlow(
  questions: string[],
  config?: Partial<ConversationConfig>,
): ConversationalFlowResult {
  const [conversationState, setConversationState] = useState<ConversationState>(
    ConversationState.IDLE,
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<{text: string; index: number} | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const hasStartedRef = useRef(false);
  const currentQuestionIndexRef = useRef(0);
  const validationCallbackRef = useRef<((answer: string, questionIndex: number) => ValidationResult) | null>(null);
  const {checkPermission, requestPermission} = usePermissions();

  const delayMs = config?.delayBetweenTTSAndSTT ?? TTS_STT_DELAY_MS;

  const setValidationCallback = useCallback((callback: (answer: string, questionIndex: number) => ValidationResult) => {
    validationCallbackRef.current = callback;
  }, []);

  useEffect(() => {
    return () => {
      TTSService.stop();
      VoiceService.destroy();
    };
  }, []);

  const activateSTT = useCallback(async () => {
    console.log('[ConversationalFlow] Activating STT...');
    const permResult = await checkPermission();
    console.log('[ConversationalFlow] Permission check result:', permResult.status);
    
    if (permResult.status !== PermissionStatus.GRANTED) {
      console.log('[ConversationalFlow] Requesting permission...');
      const reqResult = await requestPermission();
      console.log('[ConversationalFlow] Permission request result:', reqResult.status);
      
      if (reqResult.status !== PermissionStatus.GRANTED) {
        setError('Microphone permission required for voice input');
        setConversationState(ConversationState.IDLE);
        return;
      }
    }

    console.log('[ConversationalFlow] Setting state to LISTENING');
    setConversationState(ConversationState.LISTENING);

    VoiceService.setCallbacks({
      onStart: () => {
        console.log('[ConversationalFlow] STT started');
        setConversationState(ConversationState.LISTENING);
      },
      onResult: transcription => {
        console.log('[ConversationalFlow] STT result:', transcription.text, 'for question index:', currentQuestionIndexRef.current);
        setCurrentAnswer({text: transcription.text, index: currentQuestionIndexRef.current});
        setConversationState(ConversationState.PROCESSING);
      },
      onError: (_voiceError: VoiceError, message: string) => {
        console.log('[ConversationalFlow] STT error:', message, '- treating as empty response for question index:', currentQuestionIndexRef.current);
        // Treat STT errors (like "no match" when saying "none") as empty responses
        setCurrentAnswer({text: '', index: currentQuestionIndexRef.current});
        setConversationState(ConversationState.PROCESSING);
      },
      onEnd: () => {
        console.log('[ConversationalFlow] STT ended');
        if (conversationState === ConversationState.LISTENING) {
          setConversationState(ConversationState.PROCESSING);
        }
      },
    });

    console.log('[ConversationalFlow] Starting voice recording...');
    await VoiceService.startRecording();
    console.log('[ConversationalFlow] Voice recording started');
  }, [checkPermission, requestPermission, conversationState]);

  const speakQuestion = useCallback(
    async (questionIndex: number) => {
      if (questionIndex >= questions.length) {
        setConversationState(ConversationState.IDLE);
        return;
      }

      const question = questions[questionIndex];
      setConversationState(ConversationState.SPEAKING);
      setError(null);
      setCurrentAnswer(null);

      TTSService.setCallbacks({
        onStart: () => {
          console.log('[ConversationalFlow] TTS onStart fired - audio should be playing now');
        },
        onDone: () => {
          console.log('[ConversationalFlow] TTS done, scheduling STT activation in', delayMs, 'ms');
          setTimeout(() => {
            console.log('[ConversationalFlow] Calling activateSTT now');
            activateSTT();
          }, delayMs);
        },
        onError: (_err, message) => {
          console.log('[ConversationalFlow] TTS error:', message);
          setError(message);
          setConversationState(ConversationState.IDLE);
        },
        onStatusChange: (status: SpeechStatus) => {
          console.log('[ConversationalFlow] TTS status change:', status);
          if (status === SpeechStatus.COMPLETED) {
            logAuditEvent('tts_question_completed', {questionIndex});
          }
        },
      });

      console.log('[ConversationalFlow] About to speak question:', question);
      await TTSService.speak(question, {
        rate: 0.5,
      });
      console.log('[ConversationalFlow] TTSService.speak() returned');
    },
    [questions, activateSTT, delayMs],
  );

  const startConversation = useCallback(async () => {
    hasStartedRef.current = true;
    setCurrentQuestionIndex(0);
    currentQuestionIndexRef.current = 0;
    setError(null);
    await speakQuestion(0);
  }, [speakQuestion]);

  const stopConversation = useCallback(async () => {
    await TTSService.stop();
    await VoiceService.stopRecording();
    setConversationState(ConversationState.IDLE);
    hasStartedRef.current = false;
  }, []);

  const skipQuestion = useCallback(() => {
    VoiceService.stopRecording();
    TTSService.stop();
    const nextIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);
    if (nextIndex < questions.length) {
      speakQuestion(nextIndex);
    } else {
      setConversationState(ConversationState.IDLE);
    }
  }, [currentQuestionIndex, questions.length, speakQuestion]);

  const retryCurrentQuestion = useCallback(async () => {
    setError(null);
    await speakQuestion(currentQuestionIndex);
  }, [currentQuestionIndex, speakQuestion]);

  // Advance to next question when processing completes
  useEffect(() => {
    if (conversationState === ConversationState.PROCESSING && currentAnswer !== null) {
      // Validate answer if callback is provided
      if (validationCallbackRef.current) {
        const validation = validationCallbackRef.current(currentAnswer.text, currentAnswer.index);
        
        if (!validation.isValid && validation.errorMessage) {
          // Validation failed - speak error and retry current question
          setValidationError(validation.errorMessage);
          const timer = setTimeout(async () => {
            setConversationState(ConversationState.SPEAKING);
            
            TTSService.setCallbacks({
              onStart: () => {
                console.log('[ConversationalFlow] TTS validation error start');
              },
              onDone: () => {
                console.log('[ConversationalFlow] TTS validation error done, retrying question');
                setTimeout(() => {
                  speakQuestion(currentQuestionIndex);
                }, delayMs);
              },
              onError: (_err, message) => {
                console.log('[ConversationalFlow] TTS validation error failed:', message);
                setError(message);
                setConversationState(ConversationState.IDLE);
              },
              onStatusChange: (status: SpeechStatus) => {
                console.log('[ConversationalFlow] TTS validation status:', status);
              },
            });
            
            await TTSService.speak(validation.errorMessage || 'Invalid input. Please try again.', {rate: 0.5});
            setValidationError(null);
          }, 500);
          return () => clearTimeout(timer);
        }
      }
      
      // Validation passed or no validation - proceed to next question
      const nextIndex = currentQuestionIndex + 1;
      const timer = setTimeout(() => {
        setCurrentQuestionIndex(nextIndex);
        currentQuestionIndexRef.current = nextIndex;
        if (nextIndex < questions.length) {
          speakQuestion(nextIndex);
        } else {
          setConversationState(ConversationState.IDLE);
          hasStartedRef.current = false;
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [
    conversationState,
    currentAnswer,
    currentQuestionIndex,
    questions.length,
    speakQuestion,
    delayMs,
  ]);

  return {
    conversationState,
    currentQuestionIndex,
    currentAnswer,
    error,
    startConversation,
    stopConversation,
    skipQuestion,
    retryCurrentQuestion,
    setValidationCallback,
  };
}

function logAuditEvent(event: string, details: Record<string, unknown>): void {
  if (__DEV__) {
    console.log('[ConversationalFlow Audit]', {
      timestamp: new Date().toISOString(),
      event,
      ...details,
    });
  }
}
