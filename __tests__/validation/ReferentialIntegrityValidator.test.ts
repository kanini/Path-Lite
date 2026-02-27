import { ReferentialIntegrityValidator } from '../../src/validation/ReferentialIntegrityValidator';
import { PHIStorage } from '../../src/storage/PHIStorage';
import { TreatmentSession, Patient } from '../../src/types/PHIData';
import { PATIENT_NOT_FOUND } from '../../src/validation/ValidationMessages';

describe('ReferentialIntegrityValidator', () => {
  let storage: PHIStorage;
  let validator: ReferentialIntegrityValidator;

  beforeEach(async () => {
    storage = new PHIStorage();
    await storage.initialize();
    validator = new ReferentialIntegrityValidator(storage);
  });

  afterEach(() => {
    storage.clearAll();
  });

  describe('validatePatientExists', () => {
    it('should return true when patient exists', () => {
      const patient: Patient = {
        mrn: '123456',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '01/15/1980',
        gender: 'Male',
        treatmentLocation: 'OR',
        roomNumber: '101',
      };
      storage.set('patient:123456', patient);

      const result = validator.validatePatientExists('123456');
      expect(result).toBe(true);
    });

    it('should return false when patient does not exist', () => {
      const result = validator.validatePatientExists('999999');
      expect(result).toBe(false);
    });
  });

  describe('validateSessionIntegrity', () => {
    const mockPatient: Patient = {
      mrn: '123456',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '01/15/1980',
      gender: 'Male',
      treatmentLocation: 'OR',
      roomNumber: '101',
    };

    it('should pass when patient exists for session', () => {
      storage.set('patient:123456', mockPatient);

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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = validator.validateSessionIntegrity(session);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should fail when patient does not exist for session', () => {
      const session: TreatmentSession = {
        sessionId: 'session-001',
        patientMRN: '999999',
        treatmentType: 'Hemodialysis',
        demographics: mockPatient,
        clinicalIntake: {
          hbsAg: 'Negative',
          hbsAbImmuneValue: '10',
        },
        status: 'incomplete',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = validator.validateSessionIntegrity(session);
      expect(result.valid).toBe(false);
      expect(result.error).toBe(PATIENT_NOT_FOUND('999999'));
    });
  });
});
