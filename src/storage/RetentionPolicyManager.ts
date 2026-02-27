import { AuditLog, RetentionMetadata } from '../types/AuditLog';

export class RetentionPolicyManager {
  private static readonly RETENTION_PERIOD_DAYS = 2190;

  static createRetentionMetadata(): RetentionMetadata {
    const createdAt = new Date().toISOString();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + this.RETENTION_PERIOD_DAYS);

    return {
      createdAt,
      retentionPeriodDays: this.RETENTION_PERIOD_DAYS,
      expiresAt: expiresAt.toISOString(),
    };
  }

  static isExpired(log: AuditLog): boolean {
    const createdDate = new Date(log.createdAt);
    const expirationDate = new Date(createdDate);
    expirationDate.setDate(expirationDate.getDate() + this.RETENTION_PERIOD_DAYS);
    
    return new Date() > expirationDate;
  }

  static getDaysUntilExpiration(log: AuditLog): number {
    const createdDate = new Date(log.createdAt);
    const expirationDate = new Date(createdDate);
    expirationDate.setDate(expirationDate.getDate() + this.RETENTION_PERIOD_DAYS);
    
    const now = new Date();
    const daysRemaining = Math.ceil((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    return Math.max(0, daysRemaining);
  }

  static filterExpiredLogs(logs: AuditLog[]): AuditLog[] {
    return logs.filter(log => this.isExpired(log));
  }

  static filterActiveLogs(logs: AuditLog[]): AuditLog[] {
    return logs.filter(log => !this.isExpired(log));
  }

  static getRetentionSummary(logs: AuditLog[]): {
    total: number;
    active: number;
    expired: number;
    expiringWithin30Days: number;
  } {
    const expired = logs.filter(log => this.isExpired(log));
    const active = logs.filter(log => !this.isExpired(log));
    const expiringWithin30Days = active.filter(log => this.getDaysUntilExpiration(log) <= 30);

    return {
      total: logs.length,
      active: active.length,
      expired: expired.length,
      expiringWithin30Days: expiringWithin30Days.length,
    };
  }
}
