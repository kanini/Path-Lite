import {Platform, Linking} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {PermissionStatus, PermissionResult} from '../../types/permissions';

const MICROPHONE_PERMISSION = Platform.select({
  ios: PERMISSIONS.IOS.MICROPHONE,
  android: PERMISSIONS.ANDROID.RECORD_AUDIO,
})!;

function mapNativeStatus(nativeResult: string): PermissionStatus {
  switch (nativeResult) {
    case RESULTS.GRANTED:
    case RESULTS.LIMITED:
      return PermissionStatus.GRANTED;
    case RESULTS.DENIED:
      return PermissionStatus.DENIED;
    case RESULTS.BLOCKED:
      return PermissionStatus.BLOCKED;
    case RESULTS.UNAVAILABLE:
    default:
      return PermissionStatus.UNAVAILABLE;
  }
}

export class PermissionService {
  static async checkMicrophonePermission(): Promise<PermissionResult> {
    try {
      const result = await check(MICROPHONE_PERMISSION);
      const status = mapNativeStatus(result);
      return {
        status,
        canOpenSettings:
          status === PermissionStatus.BLOCKED ||
          status === PermissionStatus.DENIED,
      };
    } catch {
      return {
        status: PermissionStatus.UNAVAILABLE,
        canOpenSettings: false,
      };
    }
  }

  static async requestMicrophonePermission(): Promise<PermissionResult> {
    try {
      const result = await request(MICROPHONE_PERMISSION);
      const status = mapNativeStatus(result);
      return {
        status,
        canOpenSettings:
          status === PermissionStatus.BLOCKED ||
          status === PermissionStatus.DENIED,
      };
    } catch {
      return {
        status: PermissionStatus.UNAVAILABLE,
        canOpenSettings: false,
      };
    }
  }

  static async openAppSettings(): Promise<void> {
    try {
      await openSettings();
    } catch {
      await Linking.openSettings();
    }
  }
}
