export enum PermissionStatus {
  GRANTED = 'granted',
  DENIED = 'denied',
  BLOCKED = 'blocked',
  UNAVAILABLE = 'unavailable',
}

export interface PermissionResult {
  status: PermissionStatus;
  canOpenSettings: boolean;
}

export interface PermissionState {
  microphoneStatus: PermissionStatus;
  isLoading: boolean;
  error: string | null;
}
