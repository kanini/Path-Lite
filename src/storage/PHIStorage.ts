import { MMKV } from 'react-native-mmkv';
import { MMKVStorage } from './MMKVStorage';
import { StorageErrorCode } from './types';

export class PHIStorage {
  private storage: MMKV | null = null;
  private performanceMonitor: Map<string, number> = new Map();

  async initialize(): Promise<void> {
    this.storage = await MMKVStorage.initializePHIStorage();
  }

  private ensureInitialized(): MMKV {
    if (!this.storage) {
      throw {
        code: StorageErrorCode.INITIALIZATION_FAILED,
        message: 'PHI storage not initialized. Call initialize() first.',
      };
    }
    return this.storage;
  }

  private measurePerformance<T>(operation: string, fn: () => T): T {
    const startTime = Date.now();
    try {
      const result = fn();
      const duration = Date.now() - startTime;
      this.performanceMonitor.set(operation, duration);
      
      if (duration > 500) {
        console.warn(`PHI Storage operation '${operation}' took ${duration}ms (exceeds 500ms threshold)`);
      }
      
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.performanceMonitor.set(operation, duration);
      throw error;
    }
  }

  set(key: string, value: any): void {
    this.measurePerformance(`set:${key}`, () => {
      const storage = this.ensureInitialized();
      
      if (typeof value === 'object') {
        storage.set(key, JSON.stringify(value));
      } else if (typeof value === 'string') {
        storage.set(key, value);
      } else if (typeof value === 'number') {
        storage.set(key, value);
      } else if (typeof value === 'boolean') {
        storage.set(key, value);
      } else {
        throw {
          code: StorageErrorCode.INVALID_DATA,
          message: `Unsupported data type for key '${key}'`,
        };
      }
    });
  }

  get(key: string): any | undefined {
    return this.measurePerformance(`get:${key}`, () => {
      const storage = this.ensureInitialized();
      
      const stringValue = storage.getString(key);
      if (stringValue !== undefined) {
        try {
          return JSON.parse(stringValue);
        } catch {
          return stringValue;
        }
      }
      
      const numberValue = storage.getNumber(key);
      if (numberValue !== undefined) {
        return numberValue;
      }
      
      const booleanValue = storage.getBoolean(key);
      if (booleanValue !== undefined) {
        return booleanValue;
      }
      
      return undefined;
    });
  }

  delete(key: string): void {
    this.measurePerformance(`delete:${key}`, () => {
      const storage = this.ensureInitialized();
      storage.delete(key);
    });
  }

  getAllKeys(): string[] {
    return this.measurePerformance('getAllKeys', () => {
      const storage = this.ensureInitialized();
      return storage.getAllKeys();
    });
  }

  contains(key: string): boolean {
    const storage = this.ensureInitialized();
    return storage.contains(key);
  }

  clearAll(): void {
    const storage = this.ensureInitialized();
    storage.clearAll();
  }

  getSize(): number {
    const storage = this.ensureInitialized();
    return storage.size;
  }

  getPerformanceMetrics(): Map<string, number> {
    return new Map(this.performanceMonitor);
  }
}
