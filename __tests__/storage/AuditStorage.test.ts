import { AuditStorage } from '../../src/storage/AuditStorage';
import { MMKVStorage } from '../../src/storage/MMKVStorage';
import { AuditLog } from '../../src/types/AuditLog';
import { MMKV } from 'react-native-mmkv';

jest.mock('../../src/storage/MMKVStorage');
jest.mock('react-native-mmkv');

describe('AuditStorage', () => {
  let auditStorage: AuditStorage;
  let mockMMKV: jest.Mocked<MMKV>;

  const createMockAuditLog = (overrides?: Partial<AuditLog>): AuditLog => ({
    logId: 'log-123',
    timestamp: new Date().toISOString(),
    userId: 'user-456',
    actionType: 'CREATE',
    entityType: 'PATIENT',
    entityId: 'patient-789',
    createdAt: new Date().toISOString(),
    ...overrides,
  });

  beforeEach(async () => {
    mockMMKV = {
      set: jest.fn(),
      getString: jest.fn(),
      delete: jest.fn(),
      getAllKeys: jest.fn(),
      clearAll: jest.fn(),
      size: 2048,
    } as any;

    (MMKVStorage.initializeAuditStorage as jest.Mock).mockResolvedValue(mockMMKV);

    auditStorage = new AuditStorage();
    await auditStorage.initialize();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('logEntry', () => {
    it('should store audit log with correct key format', () => {
      const log = createMockAuditLog();
      auditStorage.logEntry(log);

      expect(mockMMKV.set).toHaveBeenCalledWith(
        `audit:${log.logId}`,
        JSON.stringify(log)
      );
    });

    it('should store all audit log fields', () => {
      const log = createMockAuditLog({
        beforeValue: { name: 'Old Name' },
        afterValue: { name: 'New Name' },
        ipAddress: '192.168.1.1',
        metadata: { source: 'mobile' },
      });

      auditStorage.logEntry(log);

      const storedData = (mockMMKV.set as jest.Mock).mock.calls[0][1];
      const parsedLog = JSON.parse(storedData);

      expect(parsedLog.beforeValue).toEqual({ name: 'Old Name' });
      expect(parsedLog.afterValue).toEqual({ name: 'New Name' });
      expect(parsedLog.ipAddress).toBe('192.168.1.1');
      expect(parsedLog.metadata).toEqual({ source: 'mobile' });
    });
  });

  describe('getLogsByDateRange', () => {
    it('should return logs within date range', () => {
      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      const log1 = createMockAuditLog({ logId: 'log-1', timestamp: yesterday.toISOString() });
      const log2 = createMockAuditLog({ logId: 'log-2', timestamp: now.toISOString() });
      const log3 = createMockAuditLog({ logId: 'log-3', timestamp: tomorrow.toISOString() });

      mockMMKV.getAllKeys.mockReturnValue(['audit:log-1', 'audit:log-2', 'audit:log-3']);
      mockMMKV.getString
        .mockReturnValueOnce(JSON.stringify(log1))
        .mockReturnValueOnce(JSON.stringify(log2))
        .mockReturnValueOnce(JSON.stringify(log3));

      const startDate = new Date(yesterday.getTime() - 1000);
      const endDate = new Date(now.getTime() + 1000);

      const result = auditStorage.getLogsByDateRange(startDate, endDate);

      expect(result).toHaveLength(2);
      expect(result.map(l => l.logId)).toContain('log-1');
      expect(result.map(l => l.logId)).toContain('log-2');
      expect(result.map(l => l.logId)).not.toContain('log-3');
    });

    it('should return logs sorted by timestamp descending', () => {
      const log1 = createMockAuditLog({ 
        logId: 'log-1', 
        timestamp: '2024-01-01T10:00:00Z' 
      });
      const log2 = createMockAuditLog({ 
        logId: 'log-2', 
        timestamp: '2024-01-01T12:00:00Z' 
      });

      mockMMKV.getAllKeys.mockReturnValue(['audit:log-1', 'audit:log-2']);
      mockMMKV.getString
        .mockReturnValueOnce(JSON.stringify(log1))
        .mockReturnValueOnce(JSON.stringify(log2));

      const result = auditStorage.getLogsByDateRange(
        new Date('2024-01-01T00:00:00Z'),
        new Date('2024-01-02T00:00:00Z')
      );

      expect(result[0].logId).toBe('log-2');
      expect(result[1].logId).toBe('log-1');
    });
  });

  describe('getAllLogs', () => {
    it('should return all audit logs', () => {
      const log1 = createMockAuditLog({ logId: 'log-1' });
      const log2 = createMockAuditLog({ logId: 'log-2' });

      mockMMKV.getAllKeys.mockReturnValue(['audit:log-1', 'audit:log-2']);
      mockMMKV.getString
        .mockReturnValueOnce(JSON.stringify(log1))
        .mockReturnValueOnce(JSON.stringify(log2));

      const result = auditStorage.getAllLogs();

      expect(result).toHaveLength(2);
      expect(result.map(l => l.logId)).toContain('log-1');
      expect(result.map(l => l.logId)).toContain('log-2');
    });

    it('should handle corrupted log data gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const log1 = createMockAuditLog({ logId: 'log-1' });

      mockMMKV.getAllKeys.mockReturnValue(['audit:log-1', 'audit:log-2']);
      mockMMKV.getString
        .mockReturnValueOnce(JSON.stringify(log1))
        .mockReturnValueOnce('invalid-json');

      const result = auditStorage.getAllLogs();

      expect(result).toHaveLength(1);
      expect(result[0].logId).toBe('log-1');
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('deleteLog', () => {
    it('should delete log by ID', () => {
      auditStorage.deleteLog('log-123');
      expect(mockMMKV.delete).toHaveBeenCalledWith('audit:log-123');
    });
  });

  describe('getLogCount', () => {
    it('should return count of audit logs', () => {
      mockMMKV.getAllKeys.mockReturnValue([
        'audit:log-1',
        'audit:log-2',
        'audit:log-3',
        'other:key',
      ]);

      const count = auditStorage.getLogCount();
      expect(count).toBe(3);
    });
  });

  describe('getSize', () => {
    it('should return storage size in bytes', () => {
      const size = auditStorage.getSize();
      expect(size).toBe(2048);
    });
  });
});
