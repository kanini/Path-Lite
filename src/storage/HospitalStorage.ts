import {MMKV} from 'react-native-mmkv';

const HOSPITAL_ID_KEY = 'hospital_id';

class HospitalStorageService {
  private storage: MMKV;

  constructor() {
    this.storage = new MMKV({
      id: 'hospital_storage',
      encryptionKey: undefined,
    });
  }

  saveHospitalId(hospitalId: string): void {
    try {
      this.storage.set(HOSPITAL_ID_KEY, hospitalId);
    } catch (error) {
      console.error('Failed to save hospital ID:', error);
      throw error;
    }
  }

  getHospitalId(): string | undefined {
    try {
      const hospitalId = this.storage.getString(HOSPITAL_ID_KEY);
      return hospitalId;
    } catch (error) {
      console.error('Failed to get hospital ID:', error);
      return undefined;
    }
  }

  clearHospitalId(): void {
    try {
      this.storage.delete(HOSPITAL_ID_KEY);
    } catch (error) {
      console.error('Failed to clear hospital ID:', error);
      throw error;
    }
  }
}

export const hospitalStorage = new HospitalStorageService();
