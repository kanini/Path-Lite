import {aiVoiceService} from './AIVoiceService';
import {sttServiceAdapter} from './adapters/STTServiceAdapter';
import {ttsServiceAdapter} from './adapters/TTSServiceAdapter';

export const initializeVoiceServices = (): void => {
  aiVoiceService.setSttService(sttServiceAdapter);
  aiVoiceService.setTtsService(ttsServiceAdapter);
};
