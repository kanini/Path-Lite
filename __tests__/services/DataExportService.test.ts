import { DataExportService } from '../../src/services/DataExportService';
import { PHIStorage } from '../../src/storage/PHIStorage';
import { AuditStorage } from '../../src/storage/AuditStorage';
import { Patient } from '../../src/models/Patient';
import { TreatmentSession } from '../../src/models/TreatmentSession';
import { AuditLog } from '../../src/types/AuditLog';
import { Gender, TreatmentLocation, HBsAgStatus, SourceType, CompletionStatus } from '../../src/models/enums';

jest.mock('../../src/storage/PHIStorage');
jest.mock('../../src/storage/AuditStorage');

describe('DataExportService', () => {
  let dataExportService: DataExportService;
  let mockPHIStorage: jest.Mocked<PHIStorage>;
  let mockAuditStorage: jest.Mocked<AuditStorage>;

  beforeEach(() => {
    mockPHIStorage = new PHIStorage() as jest.Mocked<PHIStorage>;
    mockAuditStorage = new AuditStorage() as jest.Mocked<AuditStorage>;
    dataExportService = new DataExportService(mockPHIStorage, mockAuditStorage);
  });

  describe('exportPatients', () => {
    it('should export 5 patient records with valid JSON structure', () => {
      const mockPatients: Patient[] = [
        {
          schemaVersion: '1.0',
          mrn: 'MRN001',
          firstName: 'John',
          middleName: 'A',
          lastName: 'Doe',
          dob: new Date('1980-01-01'),
          gender: Gender.Male,
          admissionNumber: 'ADM001',
          treatmentLocation: TreatmentLocation.OR,
          roomNumber: '101',
          hbsAgStatus: HBsAgStatus.Positive,
          hbsAgDate: new Date('2024-01-01'),
          hbsAgSource: SourceType.Hospital,
          hbsAbValue: 100,
          hbsAbDate: new Date('2024-01-01'),
          hbsAbSource: SourceType.Hospital,
        },
        {
          schemaVersion: '1.0',
          mrn: 'MRN002',
          firstName: 'Jane',
          middleName: 'B',
          lastName: 'Smith',
          dob: new Date('1985-05-15'),
          gender: Gender.Female,
          admissionNumber: 'ADM002',
          treatmentLocation: TreatmentLocation.Bedside,
          roomNumber: '102',
          hbsAgStatus: HBsAgStatus.Negative,
          hbsAgDate: new Date('2024-01-02'),
          hbsAgSource: SourceType.Hospital,
          hbsAbValue: 50,
          hbsAbDate: new Date('2024-01-02'),
          hbsAbSource: SourceType.Hospital,
        },
        {
          schemaVersion: '1.0',
          mrn: 'MRN003',
          firstName: 'Bob',
          middleName: 'C',
          lastName: 'Johnson',
          dob: new Date('1990-03-20'),
          gender: Gender.Male,
          admissionNumber: 'ADM003',
          treatmentLocation: TreatmentLocation.OR,
          roomNumber: '103',
          hbsAgStatus: HBsAgStatus.Positive,
          hbsAgDate: new Date('2024-01-03'),
          hbsAgSource: SourceType.Hospital,
          hbsAbValue: 75,
          hbsAbDate: new Date('2024-01-03'),
          hbsAbSource: SourceType.Hospital,
        },
        {
          schemaVersion: '1.0',
          mrn: 'MRN004',
          firstName: 'Alice',
          middleName: 'D',
          lastName: 'Williams',
          dob: new Date('1975-07-10'),
          gender: Gender.Female,
          admissionNumber: 'ADM004',
          treatmentLocation: TreatmentLocation.Bedside,
          roomNumber: '104',
          hbsAgStatus: HBsAgStatus.Negative,
          hbsAgDate: new Date('2024-01-04'),
          hbsAgSource: SourceType.Hospital,
          hbsAbValue: 60,
          hbsAbDate: new Date('2024-01-04'),
          hbsAbSource: SourceType.Hospital,
        },
        {
          schemaVersion: '1.0',
          mrn: 'MRN005',
          firstName: 'Charlie',
          middleName: 'E',
          lastName: 'Brown',
          dob: new Date('1995-11-25'),
          gender: Gender.Male,
          admissionNumber: 'ADM005',
          treatmentLocation: TreatmentLocation.OR,
          roomNumber: '105',
          hbsAgStatus: HBsAgStatus.Positive,
          hbsAgDate: new Date('2024-01-05'),
          hbsAgSource: SourceType.Hospital,
          hbsAbValue: 90,
          hbsAbDate: new Date('2024-01-05'),
          hbsAbSource: SourceType.Hospital,
        },
      ];

      mockPHIStorage.getAllKeys.mockReturnValue([
        'patient_MRN001',
        'patient_MRN002',
        'patient_MRN003',
        'patient_MRN004',
        'patient_MRN005',
      ]);

      mockPHIStorage.get.mockImplementation((key: string) => {
        const index = parseInt(key.split('_')[1].replace('MRN00', '')) - 1;
        return mockPatients[index];
      });

      const result = dataExportService.exportPatients();
      const parsed = JSON.parse(result);

      expect(parsed.metadata).toBeDefined();
      expect(parsed.metadata.schemaVersion).toBe('1.0');
      expect(parsed.metadata.recordCount).toBe(5);
      expect(parsed.metadata.exportType).toBe('patients');
      expect(parsed.metadata.exportTimestamp).toBeDefined();
      expect(parsed.data).toHaveLength(5);
      expect(parsed.data[0].mrn).toBe('MRN001');
    });

    it('should export empty array with warning when storage is empty', () => {
      mockPHIStorage.getAllKeys.mockReturnValue([]);

      const result = dataExportService.exportPatients();
      const parsed = JSON.parse(result);

      expect(parsed.metadata.recordCount).toBe(0);
      expect(parsed.data).toHaveLength(0);
      expect(parsed.warning).toBe('No data available to export');
    });

    it('should validate JSON structure before returning', () => {
      mockPHIStorage.getAllKeys.mockReturnValue(['patient_MRN001']);
      mockPHIStorage.get.mockReturnValue({
        schemaVersion: '1.0',
        mrn: 'MRN001',
        firstName: 'John',
        middleName: 'A',
        lastName: 'Doe',
        dob: new Date('1980-01-01'),
        gender: Gender.Male,
        admissionNumber: 'ADM001',
        treatmentLocation: TreatmentLocation.OR,
        roomNumber: '101',
        hbsAgStatus: HBsAgStatus.Positive,
        hbsAgDate: new Date('2024-01-01'),
        hbsAgSource: SourceType.Hospital,
        hbsAbValue: 100,
        hbsAbDate: new Date('2024-01-01'),
        hbsAbSource: SourceType.Hospital,
      });

      const result = dataExportService.exportPatients();
      
      expect(() => JSON.parse(result)).not.toThrow();
      const parsed = JSON.parse(result);
      expect(parsed.metadata).toBeDefined();
      expect(parsed.data).toBeDefined();
    });
  });

  describe('exportTreatmentSessions', () => {
    it('should export treatment sessions with nested patient data', () => {
      const mockSession: TreatmentSession = {
        schemaVersion: '1.0',
        sessionId: 'SESSION001',
        patientMrn: 'MRN001',
        formData: { field1: 'value1' },
        completionStatus: CompletionStatus.Completed,
        lastFieldIndex: 10,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      };

      const mockPatient: Patient = {
        schemaVersion: '1.0',
        mrn: 'MRN001',
        firstName: 'John',
        middleName: 'A',
        lastName: 'Doe',
        dob: new Date('1980-01-01'),
        gender: Gender.Male,
        admissionNumber: 'ADM001',
        treatmentLocation: TreatmentLocation.OR,
        roomNumber: '101',
        hbsAgStatus: HBsAgStatus.Positive,
        hbsAgDate: new Date('2024-01-01'),
        hbsAgSource: SourceType.Hospital,
        hbsAbValue: 100,
        hbsAbDate: new Date('2024-01-01'),
        hbsAbSource: SourceType.Hospital,
      };

      mockPHIStorage.getAllKeys.mockReturnValue(['session_SESSION001']);
      mockPHIStorage.get.mockImplementation((key: string) => {
        if (key.startsWith('session_')) return mockSession;
        if (key.startsWith('patient_')) return mockPatient;
        return null;
      });

      const result = dataExportService.exportTreatmentSessions();
      const parsed = JSON.parse(result);

      expect(parsed.metadata.recordCount).toBe(1);
      expect(parsed.metadata.exportType).toBe('sessions');
      expect(parsed.data).toHaveLength(1);
      expect(parsed.data[0].session).toBeDefined();
      expect(parsed.data[0].patient).toBeDefined();
      expect(parsed.data[0].session.sessionId).toBe('SESSION001');
      expect(parsed.data[0].patient.mrn).toBe('MRN001');
    });

    it('should handle sessions with missing patient data', () => {
      const mockSession: TreatmentSession = {
        schemaVersion: '1.0',
        sessionId: 'SESSION001',
        patientMrn: 'MRN999',
        formData: { field1: 'value1' },
        completionStatus: CompletionStatus.Completed,
        lastFieldIndex: 10,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      };

      mockPHIStorage.getAllKeys.mockReturnValue(['session_SESSION001']);
      mockPHIStorage.get.mockImplementation((key: string) => {
        if (key.startsWith('session_')) return mockSession;
        return null;
      });

      const result = dataExportService.exportTreatmentSessions();
      const parsed = JSON.parse(result);

      expect(parsed.data[0].session).toBeDefined();
      expect(parsed.data[0].patient).toBeNull();
    });
  });

  describe('exportAuditLogs', () => {
    it('should export 100 audit log records', () => {
      const mockLogs: AuditLog[] = Array.from({ length: 100 }, (_, i) => ({
        logId: `LOG${String(i + 1).padStart(3, '0')}`,
        timestamp: new Date().toISOString(),
        userId: 'USER001',
        actionType: 'CREATE' as const,
        entityType: 'PATIENT' as const,
        entityId: `ENTITY${i + 1}`,
        beforeValue: null,
        afterValue: { field: 'value' },
        ipAddress: '192.168.1.1',
        createdAt: new Date().toISOString(),
      }));

      mockAuditStorage.getAllLogs.mockReturnValue(mockLogs);

      const result = dataExportService.exportAuditLogs();
      const parsed = JSON.parse(result);

      expect(parsed.metadata.recordCount).toBe(100);
      expect(parsed.metadata.exportType).toBe('audit_logs');
      expect(parsed.data).toHaveLength(100);
      expect(parsed.data[0].logId).toBe('LOG001');
    });

    it('should export empty array with warning when no audit logs exist', () => {
      mockAuditStorage.getAllLogs.mockReturnValue([]);

      const result = dataExportService.exportAuditLogs();
      const parsed = JSON.parse(result);

      expect(parsed.metadata.recordCount).toBe(0);
      expect(parsed.data).toHaveLength(0);
      expect(parsed.warning).toBe('No data available to export');
    });
  });
});
