export enum VoiceIconState {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  LISTENING = 'listening',
}

export interface AIVoiceContextState {
  isActive: boolean;
  isListening: boolean;
  isTTSPlaying: boolean;
  currentQuestion: string | null;
  audioLevel: number;
}

export interface AIVoiceContextValue extends AIVoiceContextState {
  activateVoice: () => void;
  deactivateVoice: () => void;
  startListening: () => void;
  stopListening: () => void;
  setTTSPlaying: (playing: boolean) => void;
  setCurrentQuestion: (question: string | null) => void;
  setAudioLevel: (level: number) => void;
}
