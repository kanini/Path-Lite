import {check, request, openSettings, RESULTS} from 'react-native-permissions';
import {PermissionService} from '../../../src/services/permissions/PermissionService';
import {PermissionStatus} from '../../../src/types/permissions';

describe('PermissionService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('checkMicrophonePermission', () => {
    it('should return GRANTED when native check returns granted', async () => {
      (check as jest.Mock).mockResolvedValue(RESULTS.GRANTED);
      const result = await PermissionService.checkMicrophonePermission();
      expect(result.status).toBe(PermissionStatus.GRANTED);
      expect(result.canOpenSettings).toBe(false);
    });

    it('should return DENIED when native check returns denied', async () => {
      (check as jest.Mock).mockResolvedValue(RESULTS.DENIED);
      const result = await PermissionService.checkMicrophonePermission();
      expect(result.status).toBe(PermissionStatus.DENIED);
      expect(result.canOpenSettings).toBe(true);
    });

    it('should return BLOCKED when native check returns blocked', async () => {
      (check as jest.Mock).mockResolvedValue(RESULTS.BLOCKED);
      const result = await PermissionService.checkMicrophonePermission();
      expect(result.status).toBe(PermissionStatus.BLOCKED);
      expect(result.canOpenSettings).toBe(true);
    });

    it('should return UNAVAILABLE when native check returns unavailable', async () => {
      (check as jest.Mock).mockResolvedValue(RESULTS.UNAVAILABLE);
      const result = await PermissionService.checkMicrophonePermission();
      expect(result.status).toBe(PermissionStatus.UNAVAILABLE);
      expect(result.canOpenSettings).toBe(false);
    });

    it('should return UNAVAILABLE on check failure', async () => {
      (check as jest.Mock).mockRejectedValue(new Error('Native error'));
      const result = await PermissionService.checkMicrophonePermission();
      expect(result.status).toBe(PermissionStatus.UNAVAILABLE);
      expect(result.canOpenSettings).toBe(false);
    });
  });

  describe('requestMicrophonePermission', () => {
    it('should return GRANTED when user grants permission', async () => {
      (request as jest.Mock).mockResolvedValue(RESULTS.GRANTED);
      const result = await PermissionService.requestMicrophonePermission();
      expect(result.status).toBe(PermissionStatus.GRANTED);
    });

    it('should return DENIED when user denies permission', async () => {
      (request as jest.Mock).mockResolvedValue(RESULTS.DENIED);
      const result = await PermissionService.requestMicrophonePermission();
      expect(result.status).toBe(PermissionStatus.DENIED);
      expect(result.canOpenSettings).toBe(true);
    });

    it('should return BLOCKED when permission is blocked', async () => {
      (request as jest.Mock).mockResolvedValue(RESULTS.BLOCKED);
      const result = await PermissionService.requestMicrophonePermission();
      expect(result.status).toBe(PermissionStatus.BLOCKED);
      expect(result.canOpenSettings).toBe(true);
    });

    it('should return UNAVAILABLE on request failure', async () => {
      (request as jest.Mock).mockRejectedValue(new Error('Request error'));
      const result = await PermissionService.requestMicrophonePermission();
      expect(result.status).toBe(PermissionStatus.UNAVAILABLE);
    });
  });

  describe('openAppSettings', () => {
    it('should call openSettings', async () => {
      await PermissionService.openAppSettings();
      expect(openSettings).toHaveBeenCalled();
    });
  });
});
