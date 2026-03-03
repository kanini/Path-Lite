import {useState, useCallback} from 'react';
import {PermissionStatus, PermissionState} from '../types/permissions';
import {PermissionService} from '../services/permissions/PermissionService';

export function usePermissions() {
  const [state, setState] = useState<PermissionState>({
    microphoneStatus: PermissionStatus.DENIED,
    isLoading: false,
    error: null,
  });

  const checkPermission = useCallback(async () => {
    setState(prev => ({...prev, isLoading: true, error: null}));
    try {
      const result = await PermissionService.checkMicrophonePermission();
      setState({
        microphoneStatus: result.status,
        isLoading: false,
        error: null,
      });
      return result;
    } catch {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to check microphone permission',
      }));
      return {status: PermissionStatus.UNAVAILABLE, canOpenSettings: false};
    }
  }, []);

  const requestPermission = useCallback(async () => {
    setState(prev => ({...prev, isLoading: true, error: null}));
    try {
      const result = await PermissionService.requestMicrophonePermission();
      setState({
        microphoneStatus: result.status,
        isLoading: false,
        error: null,
      });
      return result;
    } catch {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to request microphone permission',
      }));
      return {status: PermissionStatus.UNAVAILABLE, canOpenSettings: false};
    }
  }, []);

  const openSettings = useCallback(async () => {
    try {
      await PermissionService.openAppSettings();
    } catch {
      setState(prev => ({
        ...prev,
        error: 'Failed to open app settings',
      }));
    }
  }, []);

  return {
    ...state,
    checkPermission,
    requestPermission,
    openSettings,
  };
}
