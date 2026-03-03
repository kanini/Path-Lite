export enum VoiceState {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  LISTENING = 'listening',
}

export interface VoiceInputResult {
  text: string;
  confidence: number;
  error: string | null;
}

export interface VoiceIconProps {
  state: VoiceState;
  onPress: () => void;
  disabled?: boolean;
  size?: number;
  tooltipMessage?: string | null;
}
