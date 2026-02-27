import { StorageCleanupService } from '../../src/storage/StorageCleanupService';
import { PHIStorage } from '../../src/storage/PHIStorage';
import { AuditStorage } from '../../src/storage/AuditStorage';
import { MMKVStorage } from '../../src/storage/MMKVStorage';
import { TreatmentSession } from '../../src/types/PHIData';
import { AuditLog } from '../../src/types/AuditLog';

jest.mock('../../src/storage/PHIStorage');
jest.mock('../../src/storage/AuditStorage');
jest.mock('../../src/storage/MMKVStorage');

describe('StorageCleanupService', () => {
  let mockPHIStorage: jest.Mocked<PHIStorage>;
  let mockAuditStorage: jest.Mocked<AuditStorage>;

  beforeEach(() => {
    mockPHIStorage = {
      getAllKeys: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),
    } as any;

    mockAuditStorage = {
      getAllLogs: jest.fn(),
      deleteLog: jest.fn(),
    } as any;

    (MMKVStorage.getPHIInstance as jest.Mock).mockReturnValue({ size: 5000 });
    (MMKVStorage.getAuditInstance as jest.Mock).mockReturnValue({ size: 3000 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('cleanupExpiredSessions', () => {
    it('should delete incomplete sessions older than 24 hours', async () => {
      const now = new Date();
      const expiredSession: TreatmentSession = {
        sessionId: 'session-1',
        patientMRN: 'MRN-123',
        treatmentType: 'Hemodialysis',
        demographics: {} as any,
        clinicalIntake: {} as any,
        status: 'incomplete',
        createdAt: new Date(now.getTime() - 25 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 25 * 60 * 60 * 1000).toISOString(),
      };

      const activeSession: TreatmentSession = {
        ...expiredSession,
        sessionId: 'session-2',
        updatedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
      };

      mockPHIStorage.getAllKeys.mockReturnValue(['session:session-1', 'session:session-2']);
      mockPHIStorage.get
        .mockReturnValueOnce(expiredSession)
        .mockReturnValueOnce(activeSession);

      const result = await StorageCleanupService.cleanupExpiredSessions(mockPHIStorage);

      expect(mockPHIStorage.delete).toHaveBeenCalledWith('session:session-1');
      expect(mockPHIStorage.delete).not.toHaveBeenCalledWith('session:session-2');
      expect(result.sessionsDeleted).toBe(1);
    });

    it('should not delete completed sessions', async () => {
      const completedSession: TreatmentSession = {
        sessionId: 'session-1',
        patientMRN: 'MRN-123',
        treatmentType: 'Hemodialysis',
        demographics: {} as any,
        clinicalIntake: {} as any,
        status: 'completed',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      };

      mockPHIStorage.getAllKeys.mockReturnValue(['session:session-1']);
      mockPHIStorage.get.mockReturnValue(completedSession);

      const result = await StorageCleanupService.cleanupExpiredSessions(mockPHIStorage);

      expect(mockPHIStorage.delete).not.toHaveBeenCalled();
      expect(result.sessionsDeleted).toBe(0);
    });
  });

  describe('cleanupExpiredAuditLogs', () => {
    it('should delete logs older than 6 years', async () => {
      const expiredLog: AuditLog = {
        logId: 'log-1',
        timestamp: new Date().toISOString(),
        userId: 'user-123',
        actionType: 'CREATE',
        entityType: 'PATIENT',
        entityId: 'patient-456',
        createdAt: new Date(Date.now() - 2200 * 24 * 60 * 60 * 1000).toISOString(),
      };

      const activeLog: AuditLog = {
        ...expiredLog,
        logId: 'log-2',
        createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
      };

      mockAuditStorage.getAllLogs.mockReturnValue([expiredLog, activeLog]);

      const result = await StorageCleanupService.cleanupExpiredAuditLogs(mockAuditStorage);

      expect(mockAuditStorage.deleteLog).toHaveBeenCalledWith('log-1');
      expect(mockAuditStorage.deleteLog).not.toHaveBeenCalledWith('log-2');
      expect(result.logsDeleted).toBe(1);
    });
  });

  describe('performFullCleanup', () => {
    it('should cleanup both sessions and audit logs', async () => {
      const expiredSession: TreatmentSession = {
        sessionId: 'session-1',
        patientMRN: 'MRN-123',
        treatmentType: 'Hemodialysis',
        demographics: {} as any,
        clinicalIntake: {} as any,
        status: 'incomplete',
        createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
      };

      const expiredLog: AuditLog = {
        logId: 'log-1',
        timestamp: new Date().toISOString(),
        userId: 'user-123',
        actionType: 'CREATE',
        entityType: 'PATIENT',
        entityId: 'patient-456',
        createdAt: new Date(Date.now() - 2200 * 24 * 60 * 60 * 1000).toISOString(),
      };

      mockPHIStorage.getAllKeys.mockReturnValue(['session:session-1']);
      mockPHIStorage.get.mockReturnValue(expiredSession);
      mockAuditStorage.getAllLogs.mockReturnValue([expiredLog]);

      const result = await StorageCleanupService.performFullCleanup(
        mockPHIStorage,
        mockAuditStorage
      );

      expect(result.sessionsDeleted).toBe(1);
      expect(result.logsDeleted).toBe(1);
      expect(result.bytesFreed).toBeGreaterThanOrEqual(0);
      expect(result.timestamp).toBeDefined();
    });
  });

  describe('cleanupIfQuotaExceeded', () => {
    it('should perform cleanup if quota is exceeded', async () => {
      const mockPHIInstance = { size: 60 * 1024 * 1024 };
      (MMKVStorage.getPHIInstance as jest.Mock).mockReturnValue(mockPHIInstance);

      mockPHIStorage.getAllKeys.mockReturnValue([]);
      mockAuditStorage.getAllLogs.mockReturnValue([]);

      const result = await StorageCleanupService.cleanupIfQuotaExceeded(
        mockPHIStorage,
        mockAuditStorage
      );

      expect(result).not.toBeNull();
    });

    it('should return null if quota is not exceeded', async () => {
      const mockPHIInstance = { size: 1024 * 1024 };
      const mockAuditInstance = { size: 512 * 1024 };
      (MMKVStorage.getPHIInstance as jest.Mock).mockReturnValue(mockPHIInstance);
      (MMKVStorage.getAuditInstance as jest.Mock).mockReturnValue(mockAuditInstance);

      const result = await StorageCleanupService.cleanupIfQuotaExceeded(
        mockPHIStorage,
        mockAuditStorage
      );

      expect(result).toBeNull();
    });
  });
});
