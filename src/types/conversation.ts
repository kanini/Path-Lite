export enum ConversationState {
  IDLE = 'idle',
  SPEAKING = 'speaking',
  LISTENING = 'listening',
  PROCESSING = 'processing',
}

export interface ConversationConfig {
  autoActivateSTT: boolean;
  firstQuestion: string;
  questions: string[];
  delayBetweenTTSAndSTT: number;
}

export interface ConversationEvent {
  type: 'state_change' | 'transcription' | 'error';
  state?: ConversationState;
  text?: string;
  error?: string;
  timestamp: number;
}
