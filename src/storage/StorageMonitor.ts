import { MMKV } from 'react-native-mmkv';

export interface StorageMetrics {
  totalSize: number;
  keyCount: number;
  averageKeySize: number;
  lastChecked: string;
}

export class StorageMonitor {
  private static readonly MAX_STORAGE_SIZE = 50 * 1024 * 1024;
  private static readonly WARNING_THRESHOLD = 0.8;

  static getMetrics(storage: MMKV): StorageMetrics {
    const totalSize = storage.size;
    const keys = storage.getAllKeys();
    const keyCount = keys.length;
    const averageKeySize = keyCount > 0 ? totalSize / keyCount : 0;

    return {
      totalSize,
      keyCount,
      averageKeySize,
      lastChecked: new Date().toISOString(),
    };
  }

  static isQuotaExceeded(storage: MMKV): boolean {
    return storage.size >= this.MAX_STORAGE_SIZE;
  }

  static isNearQuota(storage: MMKV): boolean {
    return storage.size >= this.MAX_STORAGE_SIZE * this.WARNING_THRESHOLD;
  }

  static getUsagePercentage(storage: MMKV): number {
    return (storage.size / this.MAX_STORAGE_SIZE) * 100;
  }

  static formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
}
