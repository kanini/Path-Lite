import { MMKV } from 'react-native-mmkv';
import { MMKVStorage } from './MMKVStorage';
import { StorageErrorCode } from './types';
import { AuditLog } from '../types/AuditLog';

export class AuditStorage {
  private storage: MMKV | null = null;

  async initialize(): Promise<void> {
    this.storage = await MMKVStorage.initializeAuditStorage();
  }

  private ensureInitialized(): MMKV {
    if (!this.storage) {
      throw {
        code: StorageErrorCode.INITIALIZATION_FAILED,
        message: 'Audit storage not initialized. Call initialize() first.',
      };
    }
    return this.storage;
  }

  logEntry(auditLog: AuditLog): void {
    const storage = this.ensureInitialized();
    const key = `audit:${auditLog.logId}`;
    storage.set(key, JSON.stringify(auditLog));
  }

  getLogsByDateRange(startDate: Date, endDate: Date): AuditLog[] {
    const storage = this.ensureInitialized();
    const keys = storage.getAllKeys();
    const auditKeys = keys.filter((key: string) => key.startsWith('audit:'));
    
    const logs: AuditLog[] = [];
    for (const key of auditKeys) {
      const logData = storage.getString(key);
      if (logData) {
        try {
          const log: AuditLog = JSON.parse(logData);
          const logDate = new Date(log.timestamp);
          if (logDate >= startDate && logDate <= endDate) {
            logs.push(log);
          }
        } catch (error) {
          console.error(`Failed to parse audit log for key ${key}:`, error);
        }
      }
    }
    
    return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  getAllLogs(): AuditLog[] {
    const storage = this.ensureInitialized();
    const keys = storage.getAllKeys();
    const auditKeys = keys.filter((key: string) => key.startsWith('audit:'));
    
    const logs: AuditLog[] = [];
    for (const key of auditKeys) {
      const logData = storage.getString(key);
      if (logData) {
        try {
          logs.push(JSON.parse(logData));
        } catch (error) {
          console.error(`Failed to parse audit log for key ${key}:`, error);
        }
      }
    }
    
    return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  deleteLog(logId: string): void {
    const storage = this.ensureInitialized();
    const key = `audit:${logId}`;
    storage.delete(key);
  }

  getLogCount(): number {
    const storage = this.ensureInitialized();
    const keys = storage.getAllKeys();
    return keys.filter((key: string) => key.startsWith('audit:')).length;
  }

  getSize(): number {
    const storage = this.ensureInitialized();
    return storage.size;
  }

  clearAll(): void {
    const storage = this.ensureInitialized();
    storage.clearAll();
  }
}
