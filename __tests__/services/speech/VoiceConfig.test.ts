import {Platform} from 'react-native';
import {VoiceConfigService} from '../../../src/services/speech/VoiceConfig';
import {VoiceType} from '../../../src/types/speech';

describe('VoiceConfigService', () => {
  let service: VoiceConfigService;

  beforeEach(() => {
    service = new VoiceConfigService();
  });

  it('should have correct default configuration', () => {
    const config = service.getConfig();
    expect(config.rate).toBe(1.0);
    expect(config.pitch).toBe(1.0);
    expect(config.voice).toBe(VoiceType.FEMALE);
    expect(config.language).toBe('en-US');
  });

  it('should return iOS FEMALE voice identifier', () => {
    Platform.OS = 'ios';
    const id = service.getVoiceIdentifier(VoiceType.FEMALE);
    expect(id).toBe('com.apple.ttsbundle.Samantha-compact');
  });

  it('should return iOS MALE voice identifier', () => {
    Platform.OS = 'ios';
    const id = service.getVoiceIdentifier(VoiceType.MALE);
    expect(id).toBe('com.apple.ttsbundle.Daniel-compact');
  });

  it('should return Android FEMALE voice identifier', () => {
    Platform.OS = 'android';
    const id = service.getVoiceIdentifier(VoiceType.FEMALE);
    expect(id).toBe('en-us-x-sfg#female_1-local');
  });

  it('should return Android MALE voice identifier', () => {
    Platform.OS = 'android';
    const id = service.getVoiceIdentifier(VoiceType.MALE);
    expect(id).toBe('en-us-x-sfg#male_1-local');
  });

  it('should validate speech rate within range', () => {
    expect(VoiceConfigService.validateSpeechRate(0.5)).toBe(true);
    expect(VoiceConfigService.validateSpeechRate(1.0)).toBe(true);
    expect(VoiceConfigService.validateSpeechRate(2.0)).toBe(true);
  });

  it('should reject speech rate outside range', () => {
    expect(VoiceConfigService.validateSpeechRate(0.3)).toBe(false);
    expect(VoiceConfigService.validateSpeechRate(2.5)).toBe(false);
    expect(VoiceConfigService.validateSpeechRate(-1)).toBe(false);
  });

  it('should validate pitch within range', () => {
    expect(VoiceConfigService.validatePitch(0.5)).toBe(true);
    expect(VoiceConfigService.validatePitch(2.0)).toBe(true);
  });

  it('should reject pitch outside range', () => {
    expect(VoiceConfigService.validatePitch(0.3)).toBe(false);
    expect(VoiceConfigService.validatePitch(2.5)).toBe(false);
  });

  it('should set speech rate and persist', () => {
    const result = service.setSpeechRate(1.5);
    expect(result).toBe(true);
    expect(service.getConfig().rate).toBe(1.5);
  });

  it('should reject invalid speech rate', () => {
    const result = service.setSpeechRate(3.0);
    expect(result).toBe(false);
    expect(service.getConfig().rate).toBe(1.0);
  });

  it('should set voice type', () => {
    service.setVoiceType(VoiceType.MALE);
    expect(service.getConfig().voice).toBe(VoiceType.MALE);
  });

  it('should set pitch and persist', () => {
    const result = service.setPitch(1.5);
    expect(result).toBe(true);
    expect(service.getConfig().pitch).toBe(1.5);
  });

  it('should reset to defaults', () => {
    service.setSpeechRate(1.5);
    service.setVoiceType(VoiceType.MALE);
    service.setPitch(1.8);
    service.resetToDefaults();

    const config = service.getConfig();
    expect(config.rate).toBe(1.0);
    expect(config.pitch).toBe(1.0);
    expect(config.voice).toBe(VoiceType.FEMALE);
  });

  it('should use current config voice when no voiceType parameter given', () => {
    service.setVoiceType(VoiceType.MALE);
    const id = service.getVoiceIdentifier();
    expect(id).toBeTruthy();
  });
});
