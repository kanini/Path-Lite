export interface TranscriptionResult {
  text: string;
  confidence: number;
  timestamp: number;
  language: string;
}

export enum VoiceError {
  PERMISSION_DENIED = 'permission_denied',
  NO_SPEECH = 'no_speech',
  NETWORK_ERROR = 'network_error',
  TIMEOUT = 'timeout',
  UNKNOWN = 'unknown',
}

export enum NoiseSuppressionLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}
