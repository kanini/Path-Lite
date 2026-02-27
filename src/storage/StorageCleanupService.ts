import { PHIStorage } from './PHIStorage';
import { AuditStorage } from './AuditStorage';
import { RetentionPolicyManager } from './RetentionPolicyManager';
import { TreatmentSession } from '../types/PHIData';
import { StorageMonitor } from './StorageMonitor';
import { MMKVStorage } from './MMKVStorage';

export interface CleanupResult {
  sessionsDeleted: number;
  logsDeleted: number;
  bytesFreed: number;
  timestamp: string;
}

export class StorageCleanupService {
  private static readonly SESSION_EXPIRY_HOURS = 24;

  static async cleanupExpiredSessions(phiStorage: PHIStorage): Promise<CleanupResult> {
    const keys = phiStorage.getAllKeys();
    const sessionKeys = keys.filter(key => key.startsWith('session:'));
    
    let sessionsDeleted = 0;
    const now = new Date();
    const expiryThreshold = new Date(now.getTime() - this.SESSION_EXPIRY_HOURS * 60 * 60 * 1000);

    for (const key of sessionKeys) {
      const session = phiStorage.get(key) as TreatmentSession;
      if (session && session.status === 'incomplete') {
        const updatedAt = new Date(session.updatedAt);
        if (updatedAt < expiryThreshold) {
          phiStorage.delete(key);
          sessionsDeleted++;
        }
      }
    }

    return {
      sessionsDeleted,
      logsDeleted: 0,
      bytesFreed: 0,
      timestamp: new Date().toISOString(),
    };
  }

  static async cleanupExpiredAuditLogs(auditStorage: AuditStorage): Promise<CleanupResult> {
    const allLogs = auditStorage.getAllLogs();
    const expiredLogs = RetentionPolicyManager.filterExpiredLogs(allLogs);
    
    let logsDeleted = 0;
    for (const log of expiredLogs) {
      auditStorage.deleteLog(log.logId);
      logsDeleted++;
    }

    return {
      sessionsDeleted: 0,
      logsDeleted,
      bytesFreed: 0,
      timestamp: new Date().toISOString(),
    };
  }

  static async performFullCleanup(
    phiStorage: PHIStorage,
    auditStorage: AuditStorage
  ): Promise<CleanupResult> {
    const phiInstance = MMKVStorage.getPHIInstance();
    const auditInstance = MMKVStorage.getAuditInstance();

    const sizeBefore = (phiInstance?.size || 0) + (auditInstance?.size || 0);

    const sessionCleanup = await this.cleanupExpiredSessions(phiStorage);
    const auditCleanup = await this.cleanupExpiredAuditLogs(auditStorage);

    const sizeAfter = (phiInstance?.size || 0) + (auditInstance?.size || 0);
    const bytesFreed = Math.max(0, sizeBefore - sizeAfter);

    return {
      sessionsDeleted: sessionCleanup.sessionsDeleted,
      logsDeleted: auditCleanup.logsDeleted,
      bytesFreed,
      timestamp: new Date().toISOString(),
    };
  }

  static async cleanupIfQuotaExceeded(
    phiStorage: PHIStorage,
    auditStorage: AuditStorage
  ): Promise<CleanupResult | null> {
    const phiInstance = MMKVStorage.getPHIInstance();
    const auditInstance = MMKVStorage.getAuditInstance();

    const phiQuotaExceeded = phiInstance && StorageMonitor.isQuotaExceeded(phiInstance);
    const auditQuotaExceeded = auditInstance && StorageMonitor.isQuotaExceeded(auditInstance);

    if (phiQuotaExceeded || auditQuotaExceeded) {
      return await this.performFullCleanup(phiStorage, auditStorage);
    }

    return null;
  }
}
