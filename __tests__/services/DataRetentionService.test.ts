import { DataRetentionService } from '../../src/services/DataRetentionService';
import { PHIStorage } from '../../src/storage/PHIStorage';
import { TreatmentSession, Patient } from '../../src/types/PHIData';

describe('DataRetentionService', () => {
  let storage: PHIStorage;
  let service: DataRetentionService;

  const mockPatient: Patient = {
    mrn: '123456',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '01/15/1980',
    gender: 'Male',
    treatmentLocation: 'OR',
    roomNumber: '101',
  };

  beforeEach(async () => {
    storage = new PHIStorage();
    await storage.initialize();
    service = new DataRetentionService(storage);
  });

  afterEach(() => {
    storage.clearAll();
  });

  describe('cleanupExpiredSessions', () => {
    it('should delete InProgress session older than 24 hours', () => {
      const oldDate = new Date();
      oldDate.setHours(oldDate.getHours() - 25);

      const session: TreatmentSession = {
        sessionId: 'session-001',
        patientMRN: '123456',
        treatmentType: 'Hemodialysis',
        demographics: mockPatient,
        clinicalIntake: {
          hbsAg: 'Negative',
          hbsAbImmuneValue: '10',
        },
        status: 'incomplete',
        createdAt: oldDate.toISOString(),
        updatedAt: oldDate.toISOString(),
      };

      storage.set('session:session-001', session);
      expect(storage.contains('session:session-001')).toBe(true);

      service.cleanupExpiredSessions();

      expect(storage.contains('session:session-001')).toBe(false);
    });

    it('should retain InProgress session younger than 24 hours', () => {
      const recentDate = new Date();
      recentDate.setHours(recentDate.getHours() - 23);

      const session: TreatmentSession = {
        sessionId: 'session-002',
        patientMRN: '123456',
        treatmentType: 'Hemodialysis',
        demographics: mockPatient,
        clinicalIntake: {
          hbsAg: 'Negative',
          hbsAbImmuneValue: '10',
        },
        status: 'incomplete',
        createdAt: recentDate.toISOString(),
        updatedAt: recentDate.toISOString(),
      };

      storage.set('session:session-002', session);
      expect(storage.contains('session:session-002')).toBe(true);

      service.cleanupExpiredSessions();

      expect(storage.contains('session:session-002')).toBe(true);
    });

    it('should retain Completed session older than 24 hours', () => {
      const oldDate = new Date();
      oldDate.setHours(oldDate.getHours() - 25);

      const session: TreatmentSession = {
        sessionId: 'session-003',
        patientMRN: '123456',
        treatmentType: 'Hemodialysis',
        demographics: mockPatient,
        clinicalIntake: {
          hbsAg: 'Negative',
          hbsAbImmuneValue: '10',
        },
        status: 'completed',
        createdAt: oldDate.toISOString(),
        updatedAt: oldDate.toISOString(),
      };

      storage.set('session:session-003', session);
      expect(storage.contains('session:session-003')).toBe(true);

      service.cleanupExpiredSessions();

      expect(storage.contains('session:session-003')).toBe(true);
    });

    it('should handle multiple sessions correctly', () => {
      const oldDate = new Date();
      oldDate.setHours(oldDate.getHours() - 25);
      const recentDate = new Date();
      recentDate.setHours(recentDate.getHours() - 23);

      const oldIncompleteSession: TreatmentSession = {
        sessionId: 'session-old-incomplete',
        patientMRN: '123456',
        treatmentType: 'Hemodialysis',
        demographics: mockPatient,
        clinicalIntake: { hbsAg: 'Negative', hbsAbImmuneValue: '10' },
        status: 'incomplete',
        createdAt: oldDate.toISOString(),
        updatedAt: oldDate.toISOString(),
      };

      const recentIncompleteSession: TreatmentSession = {
        sessionId: 'session-recent-incomplete',
        patientMRN: '123456',
        treatmentType: 'Hemodialysis',
        demographics: mockPatient,
        clinicalIntake: { hbsAg: 'Negative', hbsAbImmuneValue: '10' },
        status: 'incomplete',
        createdAt: recentDate.toISOString(),
        updatedAt: recentDate.toISOString(),
      };

      const oldCompletedSession: TreatmentSession = {
        sessionId: 'session-old-completed',
        patientMRN: '123456',
        treatmentType: 'Hemodialysis',
        demographics: mockPatient,
        clinicalIntake: { hbsAg: 'Negative', hbsAbImmuneValue: '10' },
        status: 'completed',
        createdAt: oldDate.toISOString(),
        updatedAt: oldDate.toISOString(),
      };

      storage.set('session:session-old-incomplete', oldIncompleteSession);
      storage.set('session:session-recent-incomplete', recentIncompleteSession);
      storage.set('session:session-old-completed', oldCompletedSession);

      service.cleanupExpiredSessions();

      expect(storage.contains('session:session-old-incomplete')).toBe(false);
      expect(storage.contains('session:session-recent-incomplete')).toBe(true);
      expect(storage.contains('session:session-old-completed')).toBe(true);
    });
  });

  describe('scheduleCleanup', () => {
    it('should call cleanupExpiredSessions', () => {
      const oldDate = new Date();
      oldDate.setHours(oldDate.getHours() - 25);

      const session: TreatmentSession = {
        sessionId: 'session-004',
        patientMRN: '123456',
        treatmentType: 'Hemodialysis',
        demographics: mockPatient,
        clinicalIntake: {
          hbsAg: 'Negative',
          hbsAbImmuneValue: '10',
        },
        status: 'incomplete',
        createdAt: oldDate.toISOString(),
        updatedAt: oldDate.toISOString(),
      };

      storage.set('session:session-004', session);
      expect(storage.contains('session:session-004')).toBe(true);

      service.scheduleCleanup();

      expect(storage.contains('session:session-004')).toBe(false);
    });
  });
});
