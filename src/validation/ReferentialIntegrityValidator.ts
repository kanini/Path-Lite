import { PHIStorage } from '../storage/PHIStorage';
import { TreatmentSession } from '../types/PHIData';
import { PATIENT_NOT_FOUND } from './ValidationMessages';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export class ReferentialIntegrityValidator {
  private storage: PHIStorage;

  constructor(storage: PHIStorage) {
    this.storage = storage;
  }

  validatePatientExists(mrn: string): boolean {
    const key = `patient:${mrn}`;
    return this.storage.contains(key);
  }

  validateSessionIntegrity(session: TreatmentSession): ValidationResult {
    if (!this.validatePatientExists(session.patientMRN)) {
      return {
        valid: false,
        error: PATIENT_NOT_FOUND(session.patientMRN),
      };
    }
    return { valid: true };
  }
}
