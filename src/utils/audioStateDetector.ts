import {Platform, NativeModules} from 'react-native';

export interface VolumeState {
  isMuted: boolean;
  currentVolume: number;
}

export async function checkVolumeState(): Promise<VolumeState> {
  try {
    if (Platform.OS === 'ios') {
      // iOS: AVAudioSession volume check via native bridge
      // Falls back to assuming not muted when native module unavailable
      const AudioSession = NativeModules.AudioSession;
      if (AudioSession?.getOutputVolume) {
        const volume = await AudioSession.getOutputVolume();
        return {isMuted: volume < 0.01, currentVolume: volume};
      }
    }

    if (Platform.OS === 'android') {
      // Android: AudioManager volume check via native bridge
      const AudioManager = NativeModules.AudioManager;
      if (AudioManager?.getCurrentVolume) {
        const volume = await AudioManager.getCurrentVolume();
        return {isMuted: volume < 0.01, currentVolume: volume};
      }
    }

    // Default: assume not muted when native modules unavailable
    return {isMuted: false, currentVolume: 1.0};
  } catch {
    return {isMuted: false, currentVolume: 1.0};
  }
}

export function getVolumeWarningMessage(): string {
  return 'Please unmute device to hear questions';
}
