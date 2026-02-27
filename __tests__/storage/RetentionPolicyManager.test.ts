import { RetentionPolicyManager } from '../../src/storage/RetentionPolicyManager';
import { AuditLog } from '../../src/types/AuditLog';

describe('RetentionPolicyManager', () => {
  const createMockLog = (daysOld: number): AuditLog => {
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - daysOld);

    return {
      logId: `log-${daysOld}`,
      timestamp: createdAt.toISOString(),
      userId: 'user-123',
      actionType: 'CREATE',
      entityType: 'PATIENT',
      entityId: 'patient-456',
      createdAt: createdAt.toISOString(),
    };
  };

  describe('createRetentionMetadata', () => {
    it('should create metadata with 6-year retention period', () => {
      const metadata = RetentionPolicyManager.createRetentionMetadata();

      expect(metadata.retentionPeriodDays).toBe(2190);
      expect(new Date(metadata.createdAt)).toBeInstanceOf(Date);
      expect(new Date(metadata.expiresAt)).toBeInstanceOf(Date);
    });

    it('should set expiration date 2190 days in future', () => {
      const metadata = RetentionPolicyManager.createRetentionMetadata();
      const createdDate = new Date(metadata.createdAt);
      const expiresDate = new Date(metadata.expiresAt);

      const daysDiff = Math.round(
        (expiresDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      expect(daysDiff).toBe(2190);
    });
  });

  describe('isExpired', () => {
    it('should return false for logs less than 6 years old', () => {
      const log = createMockLog(365);
      expect(RetentionPolicyManager.isExpired(log)).toBe(false);
    });

    it('should return false for logs exactly 6 years old', () => {
      const log = createMockLog(2190);
      expect(RetentionPolicyManager.isExpired(log)).toBe(false);
    });

    it('should return true for logs older than 6 years', () => {
      const log = createMockLog(2191);
      expect(RetentionPolicyManager.isExpired(log)).toBe(true);
    });
  });

  describe('getDaysUntilExpiration', () => {
    it('should return correct days until expiration', () => {
      const log = createMockLog(100);
      const daysRemaining = RetentionPolicyManager.getDaysUntilExpiration(log);

      expect(daysRemaining).toBeGreaterThan(2000);
      expect(daysRemaining).toBeLessThanOrEqual(2190);
    });

    it('should return 0 for expired logs', () => {
      const log = createMockLog(2200);
      const daysRemaining = RetentionPolicyManager.getDaysUntilExpiration(log);

      expect(daysRemaining).toBe(0);
    });
  });

  describe('filterExpiredLogs', () => {
    it('should filter out only expired logs', () => {
      const logs = [
        createMockLog(100),
        createMockLog(2191),
        createMockLog(500),
        createMockLog(2200),
      ];

      const expired = RetentionPolicyManager.filterExpiredLogs(logs);

      expect(expired).toHaveLength(2);
      expect(expired.map(l => l.logId)).toContain('log-2191');
      expect(expired.map(l => l.logId)).toContain('log-2200');
    });
  });

  describe('filterActiveLogs', () => {
    it('should filter out only active logs', () => {
      const logs = [
        createMockLog(100),
        createMockLog(2191),
        createMockLog(500),
        createMockLog(2200),
      ];

      const active = RetentionPolicyManager.filterActiveLogs(logs);

      expect(active).toHaveLength(2);
      expect(active.map(l => l.logId)).toContain('log-100');
      expect(active.map(l => l.logId)).toContain('log-500');
    });
  });

  describe('getRetentionSummary', () => {
    it('should return correct summary statistics', () => {
      const logs = [
        createMockLog(10),
        createMockLog(100),
        createMockLog(2160),
        createMockLog(2191),
        createMockLog(2200),
      ];

      const summary = RetentionPolicyManager.getRetentionSummary(logs);

      expect(summary.total).toBe(5);
      expect(summary.active).toBe(3);
      expect(summary.expired).toBe(2);
      expect(summary.expiringWithin30Days).toBe(1);
    });

    it('should handle empty log array', () => {
      const summary = RetentionPolicyManager.getRetentionSummary([]);

      expect(summary.total).toBe(0);
      expect(summary.active).toBe(0);
      expect(summary.expired).toBe(0);
      expect(summary.expiringWithin30Days).toBe(0);
    });
  });
});
