import {Platform} from 'react-native';
import {MMKV} from 'react-native-mmkv';
import {SpeechConfig, VoiceType} from '../../types/speech';

const STORAGE_KEY = 'voice_config';
const MIN_RATE = 0.5;
const MAX_RATE = 2.0;
const MIN_PITCH = 0.5;
const MAX_PITCH = 2.0;

const IOS_VOICES: Record<VoiceType, string> = {
  [VoiceType.MALE]: 'com.apple.ttsbundle.Daniel-compact',
  [VoiceType.FEMALE]: 'com.apple.ttsbundle.Samantha-compact',
};

const ANDROID_VOICES: Record<VoiceType, string> = {
  [VoiceType.MALE]: 'en-us-x-sfg#male_1-local',
  [VoiceType.FEMALE]: 'en-us-x-sfg#female_1-local',
};

const DEFAULT_CONFIG: SpeechConfig = {
  rate: 0.75,
  pitch: 1.0,
  voice: VoiceType.FEMALE,
  language: 'en-US',
};

export class VoiceConfigService {
  private config: SpeechConfig;
  private storage: MMKV;

  constructor(storage?: MMKV) {
    this.storage = storage ?? new MMKV();
    this.config = this.loadConfig();
  }

  getConfig(): SpeechConfig {
    return {...this.config};
  }

  getVoiceIdentifier(voiceType?: VoiceType): string {
    const type = voiceType ?? this.config.voice;
    const voices = Platform.OS === 'ios' ? IOS_VOICES : ANDROID_VOICES;
    return voices[type];
  }

  static validateSpeechRate(rate: number): boolean {
    return rate >= MIN_RATE && rate <= MAX_RATE;
  }

  static validatePitch(pitch: number): boolean {
    return pitch >= MIN_PITCH && pitch <= MAX_PITCH;
  }

  setSpeechRate(rate: number): boolean {
    if (!VoiceConfigService.validateSpeechRate(rate)) {
      return false;
    }
    this.config.rate = rate;
    this.saveConfig();
    return true;
  }

  setVoiceType(voice: VoiceType): void {
    this.config.voice = voice;
    this.saveConfig();
  }

  setPitch(pitch: number): boolean {
    if (!VoiceConfigService.validatePitch(pitch)) {
      return false;
    }
    this.config.pitch = pitch;
    this.saveConfig();
    return true;
  }

  resetToDefaults(): void {
    this.config = {...DEFAULT_CONFIG};
    this.saveConfig();
  }

  private loadConfig(): SpeechConfig {
    try {
      const stored = this.storage.getString(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<SpeechConfig>;
        return {
          rate: parsed.rate ?? DEFAULT_CONFIG.rate,
          pitch: parsed.pitch ?? DEFAULT_CONFIG.pitch,
          voice: parsed.voice ?? DEFAULT_CONFIG.voice,
          language: parsed.language ?? DEFAULT_CONFIG.language,
        };
      }
    } catch {
      // Fall through to default
    }
    return {...DEFAULT_CONFIG};
  }

  private saveConfig(): void {
    try {
      this.storage.set(STORAGE_KEY, JSON.stringify(this.config));
    } catch {
      // Storage write failure is non-fatal
    }
  }
}
