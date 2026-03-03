import {MMKVStorage} from './MMKVStorage';
import type {Patient} from '../models/Patient';
import {patientApiService} from '../services/api/PatientApiService';

const PATIENTS_KEY = 'patients';
const SYNC_ENABLED = true;

class PatientStorageService {
  private async getStorage() {
    return await MMKVStorage.initializePHIStorage();
  }

  async getAllPatients(): Promise<Patient[]> {
    try {
      console.log('[PatientStorage] getAllPatients called');
      const localPatients = await this.getLocalPatients();
      console.log('[PatientStorage] Local patients retrieved:', localPatients.length);
      
      if (SYNC_ENABLED) {
        try {
          const apiPatients = await patientApiService.getAllPatients();
          
          if (apiPatients.length > 0) {
            const apiMRNs = apiPatients.map(p => p.mrn);
            const localOnlyPatients = localPatients.filter(p => !apiMRNs.includes(p.mrn));
            
            const mergedPatients = [...apiPatients, ...localOnlyPatients];
            await this.savePatientsToLocal(mergedPatients);
            return mergedPatients;
          }
        } catch (apiError) {
          console.warn('API fetch failed, using local data:', apiError);
        }
      }

      return localPatients;
    } catch (error) {
      console.error('Failed to get all patients:', error);
      return [];
    }
  }

  async getPatientsByHospital(hospitalId: string): Promise<Patient[]> {
    try {
      const allPatients = await this.getAllPatients();
      return allPatients;
    } catch (error) {
      console.error('Failed to get patients by hospital:', error);
      return [];
    }
  }

  async getPatientByMRN(mrn: string): Promise<Patient | null> {
    try {
      const allPatients = await this.getAllPatients();
      return allPatients.find(p => p.mrn === mrn) || null;
    } catch (error) {
      console.error('Failed to get patient by MRN:', error);
      return null;
    }
  }

  async savePatient(patient: Patient): Promise<void> {
    try {
      console.log('[PatientStorage] savePatient called with:', JSON.stringify(patient, null, 2));
      if (SYNC_ENABLED) {
        console.log('[PatientStorage] SYNC_ENABLED is true, attempting API save...');
        try {
          const apiPatient = await patientApiService.createPatient(patient);
          if (apiPatient) {
            console.log('[PatientStorage] API save successful, saving to local...');
            await this.savePatientToLocal(apiPatient);
            console.log('[PatientStorage] Local save complete');
            return;
          }
        } catch (apiError) {
          console.warn('[PatientStorage] API save failed, falling back to local only:', apiError);
        }
      }

      console.log('[PatientStorage] Saving to local storage only...');
      await this.savePatientToLocal(patient);
      console.log('[PatientStorage] Local save complete');
    } catch (error) {
      console.error('[PatientStorage] Failed to save patient:', error);
      throw error;
    }
  }

  private async savePatientToLocal(patient: Patient): Promise<void> {
    console.log('[PatientStorage] savePatientToLocal called');
    const storage = await this.getStorage();
    console.log('[PatientStorage] Storage instance obtained');
    const localPatients = await this.getLocalPatients();
    console.log('[PatientStorage] Current local patients count:', localPatients.length);
    const existingIndex = localPatients.findIndex(p => p.mrn === patient.mrn);
    console.log('[PatientStorage] Existing patient index:', existingIndex);
    
    // Ensure createdAt is set for new patients
    const patientToSave = {
      ...patient,
      createdAt: patient.createdAt || new Date(),
    };
    
    if (existingIndex >= 0) {
      console.log('[PatientStorage] Updating existing patient at index', existingIndex);
      // Preserve original createdAt for existing patients
      localPatients[existingIndex] = {
        ...patientToSave,
        createdAt: localPatients[existingIndex].createdAt || patientToSave.createdAt,
      };
    } else {
      console.log('[PatientStorage] Adding new patient');
      localPatients.push(patientToSave);
    }
    
    console.log('[PatientStorage] Total patients to save:', localPatients.length);
    const jsonString = JSON.stringify(localPatients);
    console.log('[PatientStorage] JSON string length:', jsonString.length);
    storage.set(PATIENTS_KEY, jsonString);
    console.log('[PatientStorage] Data written to storage with key:', PATIENTS_KEY);
    
    // Verify the save
    const verification = storage.getString(PATIENTS_KEY);
    console.log('[PatientStorage] Verification - data exists in storage:', !!verification);
    if (verification) {
      const parsed = JSON.parse(verification);
      console.log('[PatientStorage] Verification - patient count in storage:', parsed.length);
    }
  }

  private async savePatientsToLocal(patients: Patient[]): Promise<void> {
    const storage = await this.getStorage();
    storage.set(PATIENTS_KEY, JSON.stringify(patients));
  }

  private async getLocalPatients(): Promise<Patient[]> {
    try {
      console.log('[PatientStorage] getLocalPatients called');
      const storage = await this.getStorage();
      const patientsJson = storage.getString(PATIENTS_KEY);
      console.log('[PatientStorage] Raw JSON from storage:', patientsJson ? `${patientsJson.substring(0, 100)}...` : 'null');
      if (!patientsJson) {
        console.log('[PatientStorage] No patients in storage, returning empty array');
        return [];
      }
      const patients = JSON.parse(patientsJson);
      return patients.map((p: any) => ({
        ...p,
        dob: new Date(p.dob),
        hbsAgDate: p.hbsAgDate ? new Date(p.hbsAgDate) : null,
        hbsAbDate: p.hbsAbDate ? new Date(p.hbsAbDate) : null,
        createdAt: p.createdAt ? new Date(p.createdAt) : undefined,
      }));
    } catch (error) {
      return [];
    }
  }

  async updatePatient(mrn: string, updates: Partial<Patient>): Promise<void> {
    try {
      if (SYNC_ENABLED) {
        const apiPatient = await patientApiService.updatePatient(mrn, updates);
        if (apiPatient) {
          await this.savePatientToLocal(apiPatient);
          return;
        }
      }

      const storage = await this.getStorage();
      const localPatients = await this.getLocalPatients();
      const patientIndex = localPatients.findIndex(p => p.mrn === mrn);
      
      if (patientIndex === -1) {
        throw new Error(`Patient with MRN ${mrn} not found`);
      }
      
      localPatients[patientIndex] = {
        ...localPatients[patientIndex],
        ...updates,
      };
      
      storage.set(PATIENTS_KEY, JSON.stringify(localPatients));
    } catch (error) {
      console.error('Failed to update patient:', error);
      throw error;
    }
  }

  async deletePatient(mrn: string): Promise<void> {
    try {
      if (SYNC_ENABLED) {
        await patientApiService.deletePatient(mrn);
      }

      const storage = await this.getStorage();
      const localPatients = await this.getLocalPatients();
      const filteredPatients = localPatients.filter(p => p.mrn !== mrn);
      storage.set(PATIENTS_KEY, JSON.stringify(filteredPatients));
    } catch (error) {
      console.error('Failed to delete patient:', error);
      throw error;
    }
  }

  async clearAllPatients(): Promise<void> {
    try {
      const storage = await this.getStorage();
      storage.delete(PATIENTS_KEY);
    } catch (error) {
      console.error('Failed to clear all patients:', error);
      throw error;
    }
  }
}

export const patientStorage = new PatientStorageService();
