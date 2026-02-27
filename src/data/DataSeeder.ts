import { PHIStorage } from '../storage/PHIStorage';
import { MOCK_PATIENTS } from './mockPatients';
import { ModelSerializer } from '../utils/ModelSerializer';

export class DataSeeder {
  private phiStorage: PHIStorage;

  constructor(phiStorage: PHIStorage) {
    this.phiStorage = phiStorage;
  }

  async seedMockData(): Promise<void> {
    try {
      const isSeeded = this.phiStorage.get('data_seeded');
      
      if (isSeeded === true) {
        console.log('Mock data already seeded, skipping...');
        return;
      }

      console.log('Seeding mock patient data...');
      
      for (const patient of MOCK_PATIENTS) {
        const key = `patient:${patient.mrn}`;
        const serializedPatient = ModelSerializer.serialize(patient);
        this.phiStorage.set(key, serializedPatient);
      }

      this.phiStorage.set('data_seeded', true);
      this.phiStorage.set('data_seeded_timestamp', new Date().toISOString());
      
      console.log(`Successfully seeded ${MOCK_PATIENTS.length} mock patients`);
    } catch (error) {
      console.error('Failed to seed mock data:', error);
      throw error;
    }
  }

  async resetMockData(): Promise<void> {
    try {
      console.log('Resetting mock data...');
      
      const keys = this.phiStorage.getAllKeys();
      const patientKeys = keys.filter(key => key.startsWith('patient:'));
      
      for (const key of patientKeys) {
        this.phiStorage.delete(key);
      }

      this.phiStorage.delete('data_seeded');
      this.phiStorage.delete('data_seeded_timestamp');
      
      console.log('Mock data reset complete');
    } catch (error) {
      console.error('Failed to reset mock data:', error);
      throw error;
    }
  }

  async reseedMockData(): Promise<void> {
    await this.resetMockData();
    await this.seedMockData();
  }

  isDataSeeded(): boolean {
    return this.phiStorage.get('data_seeded') === true;
  }

  getSeededTimestamp(): string | null {
    const timestamp = this.phiStorage.get('data_seeded_timestamp');
    return timestamp || null;
  }
}
