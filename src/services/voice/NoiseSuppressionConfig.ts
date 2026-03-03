import {Platform} from 'react-native';
import {NoiseSuppressionLevel} from '../../types/transcription';

interface NoiseSuppression {
  level: NoiseSuppressionLevel;
  enabled: boolean;
}

const PLATFORM_DEFAULTS: Record<string, NoiseSuppression> = {
  ios: {level: NoiseSuppressionLevel.MEDIUM, enabled: true},
  android: {level: NoiseSuppressionLevel.MEDIUM, enabled: true},
};

export class NoiseSuppressionConfig {
  private config: NoiseSuppression;

  constructor(level: NoiseSuppressionLevel = NoiseSuppressionLevel.MEDIUM) {
    const platform = Platform.OS;
    this.config = {
      ...PLATFORM_DEFAULTS[platform] ?? PLATFORM_DEFAULTS.android,
      level,
    };
  }

  getLevel(): NoiseSuppressionLevel {
    return this.config.level;
  }

  setLevel(level: NoiseSuppressionLevel): void {
    this.config.level = level;
  }

  isEnabled(): boolean {
    return this.config.enabled;
  }

  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled;
  }

  getIOSConfig(): Record<string, unknown> {
    return {
      EXTRA_PARTIAL_RESULTS: true,
      EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 1000,
    };
  }

  getAndroidConfig(): Record<string, unknown> {
    return {
      EXTRA_PARTIAL_RESULTS: true,
      EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 1000,
      RECOGNIZER_ENGINE: 'GOOGLE',
    };
  }

  getPlatformConfig(): Record<string, unknown> {
    return Platform.OS === 'ios'
      ? this.getIOSConfig()
      : this.getAndroidConfig();
  }
}
