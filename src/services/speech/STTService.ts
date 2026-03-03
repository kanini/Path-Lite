import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
  SpeechStartEvent,
  SpeechEndEvent,
} from '@react-native-voice/voice';
import {
  STTConfig,
  STTResult,
  STTError,
  RecognitionStatus,
} from '../../types/speech';
import {Platform} from 'react-native';

type STTCallback = {
  onStart?: () => void;
  onResult?: (result: STTResult) => void;
  onEnd?: (finalTranscript: string) => void;
  onError?: (error: STTError, message: string) => void;
  onStatusChange?: (status: RecognitionStatus) => void;
  onVolumeChange?: (volume: number) => void;
};

class STTServiceImpl {
  private callbacks: STTCallback = {};
  private status: RecognitionStatus = RecognitionStatus.IDLE;
  private config: STTConfig = {
    language: 'en-US',
    continuous: false,
    interimResults: true,
    maxAlternatives: 1,
  };
  private isInitialized = false;
  private partialTranscript = '';
  private finalTranscript = '';

  constructor() {
    this.initializeVoice();
  }

  private initializeVoice(): void {
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
    this.isInitialized = true;
  }

  setCallbacks(callbacks: STTCallback): void {
    this.callbacks = callbacks;
  }

  getStatus(): RecognitionStatus {
    return this.status;
  }

  setConfig(config: Partial<STTConfig>): void {
    this.config = {
      ...this.config,
      ...config,
    };
  }

  getConfig(): STTConfig {
    return {...this.config};
  }

  async startListening(configOverride?: Partial<STTConfig>): Promise<void> {
    if (this.status === RecognitionStatus.LISTENING) {
      this.logAuditEvent('start_listening_ignored', {
        reason: 'already_listening',
      });
      return;
    }

    const mergedConfig: STTConfig = {
      ...this.config,
      ...configOverride,
    };

    try {
      this.partialTranscript = '';
      this.finalTranscript = '';
      this.updateStatus(RecognitionStatus.LISTENING);

      await Voice.start(mergedConfig.language, {
        EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 2000,
        EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS: 2000,
        EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 1500,
      });

      this.logAuditEvent('listening_started', {
        language: mergedConfig.language,
      });
    } catch (error) {
      this.updateStatus(RecognitionStatus.ERROR);
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to start listening';
      this.callbacks.onError?.(STTError.RECOGNITION_FAILED, errorMessage);
      this.logAuditEvent('start_listening_failed', {error: errorMessage});
    }
  }

  async stopListening(): Promise<string> {
    if (this.status !== RecognitionStatus.LISTENING) {
      return this.finalTranscript;
    }

    try {
      this.updateStatus(RecognitionStatus.PROCESSING);
      await Voice.stop();
      this.logAuditEvent('listening_stopped', {
        transcriptLength: this.finalTranscript.length,
      });
      return this.finalTranscript;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to stop listening';
      this.callbacks.onError?.(STTError.RECOGNITION_FAILED, errorMessage);
      this.logAuditEvent('stop_listening_failed', {error: errorMessage});
      return this.finalTranscript;
    }
  }

  async cancelListening(): Promise<void> {
    try {
      await Voice.cancel();
      this.partialTranscript = '';
      this.finalTranscript = '';
      this.updateStatus(RecognitionStatus.IDLE);
      this.logAuditEvent('listening_cancelled', {});
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to cancel listening';
      this.callbacks.onError?.(STTError.RECOGNITION_FAILED, errorMessage);
    }
  }

  async destroy(): Promise<void> {
    try {
      await Voice.destroy();
      Voice.removeAllListeners();
      this.updateStatus(RecognitionStatus.IDLE);
      this.isInitialized = false;
      this.logAuditEvent('service_destroyed', {});
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to destroy service';
      this.logAuditEvent('destroy_failed', {error: errorMessage});
    }
  }

  isListening(): boolean {
    return this.status === RecognitionStatus.LISTENING;
  }

  getPartialTranscript(): string {
    return this.partialTranscript;
  }

  getFinalTranscript(): string {
    return this.finalTranscript;
  }

  private onSpeechStart = (event: SpeechStartEvent): void => {
    this.updateStatus(RecognitionStatus.LISTENING);
    this.callbacks.onStart?.();
    this.logAuditEvent('speech_started', {});
  };

  private onSpeechEnd = (event: SpeechEndEvent): void => {
    this.updateStatus(RecognitionStatus.COMPLETED);
    this.callbacks.onEnd?.(this.finalTranscript);
    this.logAuditEvent('speech_ended', {
      finalTranscriptLength: this.finalTranscript.length,
    });
  };

  private onSpeechResults = (event: SpeechResultsEvent): void => {
    if (event.value && event.value.length > 0) {
      const transcript = event.value[0];
      this.finalTranscript = transcript;

      const result: STTResult = {
        transcript,
        isFinal: true,
        confidence: 1.0,
      };

      this.callbacks.onResult?.(result);
      this.logAuditEvent('final_result', {
        transcriptLength: transcript.length,
      });
    }
  };

  private onSpeechPartialResults = (event: SpeechResultsEvent): void => {
    if (event.value && event.value.length > 0) {
      const transcript = event.value[0];
      this.partialTranscript = transcript;

      const result: STTResult = {
        transcript,
        isFinal: false,
        confidence: 0.5,
      };

      this.callbacks.onResult?.(result);
    }
  };

  private onSpeechError = (event: SpeechErrorEvent): void => {
    this.updateStatus(RecognitionStatus.ERROR);

    let errorType: STTError;
    let errorMessage = event.error?.message || 'Unknown error';

    switch (event.error?.code) {
      case '7':
        errorType = STTError.NO_MATCH;
        errorMessage = 'No speech detected';
        break;
      case '9':
        errorType = STTError.PERMISSION_DENIED;
        errorMessage = 'Microphone permission denied';
        break;
      case '2':
        errorType = STTError.NETWORK_ERROR;
        errorMessage = 'Network error occurred';
        break;
      case '8':
        errorType = STTError.SERVICE_NOT_AVAILABLE;
        errorMessage = 'Speech recognition service not available';
        break;
      default:
        errorType = STTError.RECOGNITION_FAILED;
    }

    this.callbacks.onError?.(errorType, errorMessage);
    this.logAuditEvent('speech_error', {
      errorType,
      errorCode: event.error?.code,
      errorMessage,
    });
  };

  private onSpeechVolumeChanged = (event: any): void => {
    if (event.value !== undefined) {
      const normalizedVolume = Math.min(Math.max(event.value / 10, 0), 1);
      this.callbacks.onVolumeChange?.(normalizedVolume);
    }
  };

  private updateStatus(status: RecognitionStatus): void {
    this.status = status;
    this.callbacks.onStatusChange?.(status);
  }

  private logAuditEvent(
    event: string,
    details: Record<string, unknown>,
  ): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      platform: Platform.OS,
      ...details,
    };
    if (__DEV__) {
      console.log('[STTService Audit]', JSON.stringify(logEntry));
    }
  }
}

export const STTService = new STTServiceImpl();
