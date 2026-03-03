import Voice, {
  SpeechResultsEvent,
  SpeechStartEvent,
  SpeechErrorEvent,
  SpeechEndEvent,
} from '@react-native-voice/voice';
import {TranscriptionResult, VoiceError} from '../../types/transcription';
import {NoiseSuppressionConfig} from './NoiseSuppressionConfig';

const RECORDING_TIMEOUT_MS = 5000;
const CONFIDENCE_THRESHOLD = 0.7;
// Mock mode simulates voice responses for testing without microphone
// Set to false to use real voice recognition with actual audio input
const USE_MOCK_STT = false;

type VoiceServiceCallback = {
  onStart?: () => void;
  onResult?: (result: TranscriptionResult) => void;
  onError?: (error: VoiceError, message: string) => void;
  onEnd?: () => void;
};

class VoiceServiceImpl {
  private noiseConfig: NoiseSuppressionConfig;
  private callbacks: VoiceServiceCallback = {};
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private isRecording = false;
  private startTime = 0;
  private mockResponseIndex = 0;

  constructor() {
    this.noiseConfig = new NoiseSuppressionConfig();
    this.setupListeners();
  }

  private setupListeners(): void {
    Voice.onSpeechStart = this.handleSpeechStart;
    Voice.onSpeechResults = this.handleSpeechResults;
    Voice.onSpeechError = this.handleSpeechError;
    Voice.onSpeechEnd = this.handleSpeechEnd;
  }

  setCallbacks(callbacks: VoiceServiceCallback): void {
    this.callbacks = callbacks;
  }

  async startRecording(): Promise<void> {
    if (this.isRecording) {
      await this.stopRecording();
    }

    if (USE_MOCK_STT) {
      console.log('[VoiceService Mock] Starting mock recording...');
      this.isRecording = true;
      this.startTime = Date.now();
      
      // Simulate recording start
      setTimeout(() => {
        this.callbacks.onStart?.();
      }, 100);

      // Simulate user speaking after 1.5 seconds
      this.timeoutId = setTimeout(() => {
        const mockResponses = [
          'John',
          'None',
          'Doe',
          '12345',
          'January 15, 1980',
          'Male',
          'ADM001',
          '101',
          'ICU-CCU',
          'Negative',
          'February 1, 2026',
          'Lab',
          'Immuno20',
          'February 1, 2026',
          'Lab',
        ];
        
        // Use sequential responses matching question order
        const mockText = mockResponses[this.mockResponseIndex % mockResponses.length];
        this.mockResponseIndex++;
        
        console.log('[VoiceService Mock] Simulating voice input:', mockText);
        
        const result: TranscriptionResult = {
          text: mockText,
          confidence: 0.95,
          timestamp: Date.now() - this.startTime,
          language: 'en-US',
        };
        
        this.callbacks.onResult?.(result);
        
        // Simulate recording end
        setTimeout(() => {
          this.callbacks.onEnd?.();
          this.isRecording = false;
        }, 200);
      }, 1500);
      
      return;
    }

    try {
      this.isRecording = true;
      this.startTime = Date.now();
      await Voice.start('en-US');

      this.timeoutId = setTimeout(() => {
        this.stopRecording();
        this.callbacks.onError?.(
          VoiceError.TIMEOUT,
          'Recording timed out after 5 seconds',
        );
      }, RECORDING_TIMEOUT_MS);
    } catch {
      this.isRecording = false;
      this.callbacks.onError?.(
        VoiceError.UNKNOWN,
        'Failed to start voice recognition',
      );
    }
  }

  async stopRecording(): Promise<void> {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    if (USE_MOCK_STT) {
      console.log('[VoiceService Mock] Stopping mock recording');
      this.isRecording = false;
      return;
    }

    try {
      this.isRecording = false;
      await Voice.stop();
    } catch {
      this.isRecording = false;
    }
  }

  async destroy(): Promise<void> {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.isRecording = false;
    try {
      await Voice.destroy();
    } catch {
      // Ignore destroy errors
    }
    Voice.removeAllListeners();
  }

  getIsRecording(): boolean {
    return this.isRecording;
  }

  getNoiseConfig(): NoiseSuppressionConfig {
    return this.noiseConfig;
  }

  // TODO: Future backend LLM cleaning pipeline integration
  async sendToLLMPipeline(text: string): Promise<string> {
    // Placeholder for Server/app/routers/voice.py integration
    // Expected request: POST /api/voice/clean { text: string }
    // Expected response: { cleaned_text: string, confidence: number }
    return text;
  }

  private handleSpeechStart = (_event: SpeechStartEvent): void => {
    this.callbacks.onStart?.();
  };

  private handleSpeechResults = (event: SpeechResultsEvent): void => {
    const text = event.value?.[0] ?? '';
    const elapsed = Date.now() - this.startTime;

    // Native APIs don't always provide confidence; default to 0.85
    const confidence = CONFIDENCE_THRESHOLD + 0.15;

    const result: TranscriptionResult = {
      text,
      confidence,
      timestamp: elapsed,
      language: 'en-US',
    };

    this.callbacks.onResult?.(result);
  };

  private handleSpeechError = (event: SpeechErrorEvent): void => {
    this.isRecording = false;

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    const code = event.error?.code;
    let voiceError = VoiceError.UNKNOWN;
    let message = event.error?.message ?? 'Unknown speech error';

    switch (code) {
      case '5':
      case 'client':
        voiceError = VoiceError.NO_SPEECH;
        message = 'No speech detected. Please try again.';
        break;
      case '9':
      case 'permissions':
        voiceError = VoiceError.PERMISSION_DENIED;
        message = 'Microphone permission not granted';
        break;
      case '2':
      case 'network':
        voiceError = VoiceError.NETWORK_ERROR;
        message = 'Network error during speech recognition';
        break;
    }

    this.callbacks.onError?.(voiceError, message);
  };

  private handleSpeechEnd = (_event: SpeechEndEvent): void => {
    this.isRecording = false;

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    this.callbacks.onEnd?.();
  };
}

export const VoiceService = new VoiceServiceImpl();
