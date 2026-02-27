import { PHIStorage } from './PHIStorage';
import { Patient, TreatmentSession } from '../types/PHIData';
import { ReferentialIntegrityValidator } from '../validation/ReferentialIntegrityValidator';

export class PHIStorageService {
  private storage: PHIStorage;
  private integrityValidator: ReferentialIntegrityValidator | null = null;

  constructor() {
    this.storage = new PHIStorage();
  }

  async initialize(): Promise<void> {
    await this.storage.initialize();
    this.integrityValidator = new ReferentialIntegrityValidator(this.storage);
  }

  savePatient(patient: Patient): void {
    const key = `patient:${patient.mrn}`;
    this.storage.set(key, patient);
  }

  getPatient(mrn: string): Patient | undefined {
    const key = `patient:${mrn}`;
    return this.storage.get(key);
  }

  deletePatient(mrn: string): void {
    const key = `patient:${mrn}`;
    this.storage.delete(key);
  }

  getAllPatients(): Patient[] {
    const keys = this.storage.getAllKeys();
    const patientKeys = keys.filter(key => key.startsWith('patient:'));
    return patientKeys.map(key => this.storage.get(key)).filter(Boolean);
  }

  saveTreatmentSession(session: TreatmentSession): void {
    if (!this.integrityValidator) {
      throw new Error('PHIStorageService not initialized. Call initialize() first.');
    }

    const validationResult = this.integrityValidator.validateSessionIntegrity(session);
    if (!validationResult.valid) {
      throw new Error(validationResult.error);
    }

    const key = `session:${session.sessionId}`;
    this.storage.set(key, session);
  }

  getTreatmentSession(sessionId: string): TreatmentSession | undefined {
    const key = `session:${sessionId}`;
    return this.storage.get(key);
  }

  deleteTreatmentSession(sessionId: string): void {
    const key = `session:${sessionId}`;
    this.storage.delete(key);
  }

  getAllTreatmentSessions(): TreatmentSession[] {
    const keys = this.storage.getAllKeys();
    const sessionKeys = keys.filter(key => key.startsWith('session:'));
    return sessionKeys.map(key => this.storage.get(key)).filter(Boolean);
  }

  getIncompleteSessions(): TreatmentSession[] {
    return this.getAllTreatmentSessions().filter(session => session.status === 'incomplete');
  }

  getStorageSize(): number {
    return this.storage.getSize();
  }

  getPerformanceMetrics(): Map<string, number> {
    return this.storage.getPerformanceMetrics();
  }
}
