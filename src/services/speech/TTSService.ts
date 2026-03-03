import Tts from 'react-native-tts';
import {SpeechConfig, SpeechStatus, TTSError, VoiceType} from '../../types/speech';
import {VoiceConfigService} from './VoiceConfig';
import {checkVolumeState, getVolumeWarningMessage} from '../../utils/audioStateDetector';

type TTSCallback = {
  onStart?: () => void;
  onDone?: () => void;
  onError?: (error: TTSError, message: string) => void;
  onStatusChange?: (status: SpeechStatus) => void;
};

class TTSServiceImpl {
  private voiceConfig: VoiceConfigService;
  private callbacks: TTSCallback = {};
  private status: SpeechStatus = SpeechStatus.IDLE;
  private currentText: string | null = null;
  private speechQueue: string[] = [];
  private isSpeaking = false;

  constructor() {
    this.voiceConfig = new VoiceConfigService();
  }

  setCallbacks(callbacks: TTSCallback): void {
    this.callbacks = callbacks;
  }

  getStatus(): SpeechStatus {
    return this.status;
  }

  getVoiceConfig(): VoiceConfigService {
    return this.voiceConfig;
  }

  async speak(text: string, configOverride?: Partial<SpeechConfig>): Promise<void> {
    if (!text || text.trim().length === 0) {
      this.callbacks.onError?.(
        TTSError.SYNTHESIS_FAILED,
        'Cannot speak empty text',
      );
      return;
    }

    const sanitized = this.sanitizeText(text);

    const volumeState = await checkVolumeState();
    if (volumeState.isMuted) {
      this.callbacks.onError?.(
        TTSError.MUTED_DEVICE,
        getVolumeWarningMessage(),
      );
      return;
    }

    const config = this.voiceConfig.getConfig();
    const mergedConfig: SpeechConfig = {
      ...config,
      ...configOverride,
    };

    this.currentText = sanitized;
    this.updateStatus(SpeechStatus.SPEAKING);

    const startTime = Date.now();

    try {
      // Set TTS configuration
      await Tts.setDefaultLanguage(mergedConfig.language);
      await Tts.setDefaultRate(mergedConfig.rate);
      await Tts.setDefaultPitch(mergedConfig.pitch);

      // Setup event listeners
      Tts.addEventListener('tts-start', () => {
        const elapsed = Date.now() - startTime;
        this.logAuditEvent('tts_started', {elapsed, textLength: sanitized.length});
        this.isSpeaking = true;
        this.callbacks.onStart?.();
      });

      Tts.addEventListener('tts-finish', () => {
        this.isSpeaking = false;
        this.updateStatus(SpeechStatus.COMPLETED);
        this.callbacks.onDone?.();
        this.processQueue();
        Tts.removeAllListeners('tts-start');
        Tts.removeAllListeners('tts-finish');
        Tts.removeAllListeners('tts-error');
      });

      Tts.addEventListener('tts-error', () => {
        this.isSpeaking = false;
        this.updateStatus(SpeechStatus.IDLE);
        this.callbacks.onError?.(
          TTSError.SYNTHESIS_FAILED,
          'Speech synthesis failed',
        );
        Tts.removeAllListeners('tts-start');
        Tts.removeAllListeners('tts-finish');
        Tts.removeAllListeners('tts-error');
      });

      await Tts.speak(sanitized);
    } catch (error) {
      this.isSpeaking = false;
      this.updateStatus(SpeechStatus.IDLE);
      this.callbacks.onError?.(
        TTSError.SYNTHESIS_FAILED,
        'Failed to initialize TTS',
      );
    }
  }

  async pause(): Promise<void> {
    if (this.status === SpeechStatus.SPEAKING) {
      await Tts.stop();
      this.isSpeaking = false;
      this.updateStatus(SpeechStatus.PAUSED);
    }
  }

  async resume(): Promise<void> {
    if (this.status === SpeechStatus.PAUSED && this.currentText) {
      await this.speak(this.currentText);
    }
  }

  async stop(): Promise<void> {
    await Tts.stop();
    Tts.removeAllListeners('tts-start');
    Tts.removeAllListeners('tts-finish');
    Tts.removeAllListeners('tts-error');
    this.isSpeaking = false;
    this.currentText = null;
    this.speechQueue = [];
    this.updateStatus(SpeechStatus.IDLE);
  }

  queueSpeech(text: string): void {
    this.speechQueue.push(text);
    if (!this.isSpeaking) {
      this.processQueue();
    }
  }

  setVoiceType(voice: VoiceType): void {
    this.voiceConfig.setVoiceType(voice);
    this.logAuditEvent('voice_type_changed', {voice});
  }

  setSpeechRate(rate: number): boolean {
    const result = this.voiceConfig.setSpeechRate(rate);
    if (result) {
      this.logAuditEvent('speech_rate_changed', {rate});
    }
    return result;
  }

  setPitch(pitch: number): boolean {
    const result = this.voiceConfig.setPitch(pitch);
    if (result) {
      this.logAuditEvent('pitch_changed', {pitch});
    }
    return result;
  }

  private processQueue(): void {
    if (this.speechQueue.length > 0 && !this.isSpeaking) {
      const next = this.speechQueue.shift()!;
      this.speak(next);
    }
  }

  private updateStatus(status: SpeechStatus): void {
    this.status = status;
    this.callbacks.onStatusChange?.(status);
  }

  private sanitizeText(text: string): string {
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/[^\w\s.,?!;:'"()-]/g, '')
      .trim();
  }

  private logAuditEvent(
    event: string,
    details: Record<string, unknown>,
  ): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      ...details,
    };
    // Redact PII: only log event type and non-sensitive metadata
    if (__DEV__) {
      console.log('[TTSService Audit]', JSON.stringify(logEntry));
    }
  }
}

export const TTSService = new TTSServiceImpl();
