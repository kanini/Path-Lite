import {VoiceState} from '../types/voice';

export interface STTService {
  startListening: () => Promise<void>;
  stopListening: () => Promise<string>;
  isListening: () => boolean;
  getAudioLevel: () => number;
}

export interface TTSService {
  speak: (text: string) => Promise<void>;
  stop: () => void;
  isSpeaking: () => boolean;
}

export class AIVoiceService {
  private sttService: STTService | null = null;
  private ttsService: TTSService | null = null;
  private stateChangeCallback: ((state: VoiceState) => void) | null = null;
  private audioLevelCallback: ((level: number) => void) | null = null;
  private audioLevelInterval: NodeJS.Timeout | null = null;

  setSttService(service: STTService): void {
    this.sttService = service;
  }

  setTtsService(service: TTSService): void {
    this.ttsService = service;
  }

  onStateChange(callback: (state: VoiceState) => void): void {
    this.stateChangeCallback = callback;
  }

  onAudioLevelChange(callback: (level: number) => void): void {
    this.audioLevelCallback = callback;
  }

  async activateVoice(): Promise<void> {
    this.stateChangeCallback?.(VoiceState.ACTIVE);
  }

  async deactivateVoice(): Promise<void> {
    await this.stopListening();
    this.stateChangeCallback?.(VoiceState.INACTIVE);
  }

  async startListening(): Promise<void> {
    if (!this.sttService) {
      throw new Error('STT service not configured');
    }

    try {
      await this.sttService.startListening();
      this.stateChangeCallback?.(VoiceState.LISTENING);
      this.startAudioLevelMonitoring();
    } catch (error) {
      console.error('Failed to start listening:', error);
      throw error;
    }
  }

  async stopListening(): Promise<string> {
    if (!this.sttService) {
      return '';
    }

    try {
      this.stopAudioLevelMonitoring();
      const transcript = await this.sttService.stopListening();
      this.stateChangeCallback?.(VoiceState.ACTIVE);
      return transcript;
    } catch (error) {
      console.error('Failed to stop listening:', error);
      return '';
    }
  }

  async speak(text: string): Promise<void> {
    if (!this.ttsService) {
      throw new Error('TTS service not configured');
    }

    try {
      await this.ttsService.speak(text);
    } catch (error) {
      console.error('Failed to speak:', error);
      throw error;
    }
  }

  stopSpeaking(): void {
    this.ttsService?.stop();
  }

  isTTSPlaying(): boolean {
    return this.ttsService?.isSpeaking() ?? false;
  }

  isSTTListening(): boolean {
    return this.sttService?.isListening() ?? false;
  }

  private startAudioLevelMonitoring(): void {
    this.stopAudioLevelMonitoring();
    
    this.audioLevelInterval = setInterval(() => {
      if (this.sttService && this.audioLevelCallback) {
        const level = this.sttService.getAudioLevel();
        this.audioLevelCallback(level);
      }
    }, 100);
  }

  private stopAudioLevelMonitoring(): void {
    if (this.audioLevelInterval) {
      clearInterval(this.audioLevelInterval);
      this.audioLevelInterval = null;
      this.audioLevelCallback?.(0);
    }
  }

  cleanup(): void {
    this.stopAudioLevelMonitoring();
    this.stopSpeaking();
    if (this.sttService?.isListening()) {
      this.sttService.stopListening();
    }
  }
}

export const aiVoiceService = new AIVoiceService();
