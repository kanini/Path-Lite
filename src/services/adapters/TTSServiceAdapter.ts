import {TTSService} from '../AIVoiceService';

class TTSServiceAdapter implements TTSService {
  private speaking = false;

  async speak(text: string): Promise<void> {
    this.speaking = true;
    return new Promise((resolve) => {
      setTimeout(() => {
        this.speaking = false;
        resolve();
      }, text.length * 50);
    });
  }

  stop(): void {
    this.speaking = false;
  }

  isSpeaking(): boolean {
    return this.speaking;
  }
}

export const ttsServiceAdapter = new TTSServiceAdapter();
