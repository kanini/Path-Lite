export interface MMKVConfig {
  id: string;
  encryptionKey?: string;
}

export interface StorageError {
  code: string;
  message: string;
  originalError?: Error;
}

export enum StorageErrorCode {
  INITIALIZATION_FAILED = 'INITIALIZATION_FAILED',
  ENCRYPTION_KEY_MISSING = 'ENCRYPTION_KEY_MISSING',
  KEYCHAIN_ACCESS_FAILED = 'KEYCHAIN_ACCESS_FAILED',
  STORAGE_QUOTA_EXCEEDED = 'STORAGE_QUOTA_EXCEEDED',
  INVALID_DATA = 'INVALID_DATA',
}
