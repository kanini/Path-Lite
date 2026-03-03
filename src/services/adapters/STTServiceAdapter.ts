import {STTService as NativeSTTService} from '../speech/STTService';
import {STTService} from '../AIVoiceService';
import {RecognitionStatus} from '../../types/speech';

class STTServiceAdapter implements STTService {
  private audioLevel = 0;

  constructor() {
    NativeSTTService.setCallbacks({
      onVolumeChange: (volume: number) => {
        this.audioLevel = volume;
      },
    });
  }

  async startListening(): Promise<void> {
    await NativeSTTService.startListening();
  }

  async stopListening(): Promise<string> {
    const transcript = await NativeSTTService.stopListening();
    return transcript;
  }

  isListening(): boolean {
    return NativeSTTService.getStatus() === RecognitionStatus.LISTENING;
  }

  getAudioLevel(): number {
    return this.audioLevel;
  }
}

export const sttServiceAdapter = new STTServiceAdapter();
