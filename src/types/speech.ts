export interface SpeechConfig {
  rate: number;
  pitch: number;
  voice: VoiceType;
  language: string;
}

export enum VoiceType {
  MALE = 'male',
  FEMALE = 'female',
}

export type SpeechRate = number; // 0.5 to 2.0

export enum TTSError {
  SYNTHESIS_FAILED = 'synthesis_failed',
  INTERRUPTED = 'interrupted',
  MUTED_DEVICE = 'muted_device',
}

export enum SpeechStatus {
  IDLE = 'idle',
  SPEAKING = 'speaking',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

export enum STTError {
  PERMISSION_DENIED = 'permission_denied',
  RECOGNITION_FAILED = 'recognition_failed',
  NO_MATCH = 'no_match',
  NETWORK_ERROR = 'network_error',
  SERVICE_NOT_AVAILABLE = 'service_not_available',
}

export enum RecognitionStatus {
  IDLE = 'idle',
  LISTENING = 'listening',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  ERROR = 'error',
}

export interface STTResult {
  transcript: string;
  isFinal: boolean;
  confidence?: number;
}

export interface STTConfig {
  language: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
}
