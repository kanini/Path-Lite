import {MMKVStorage} from './MMKVStorage';
import type {Patient} from '../models/Patient';

const PATIENTS_KEY = 'patients';

class PatientStorageService {
  private async getStorage() {
    return await MMKVStorage.initializePHIStorage();
  }

  async getAllPatients(): Promise<Patient[]> {
    try {
      const storage = await this.getStorage();
      const patientsJson = storage.getString(PATIENTS_KEY);
      if (!patientsJson) {
        return [];
      }
      const patients = JSON.parse(patientsJson);
      return patients.map((p: any) => ({
        ...p,
        dob: new Date(p.dob),
        hbsAgDate: p.hbsAgDate ? new Date(p.hbsAgDate) : null,
        hbsAbDate: p.hbsAbDate ? new Date(p.hbsAbDate) : null,
      }));
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
      const storage = await this.getStorage();
      const allPatients = await this.getAllPatients();
      const existingIndex = allPatients.findIndex(p => p.mrn === patient.mrn);
      
      if (existingIndex >= 0) {
        allPatients[existingIndex] = patient;
      } else {
        allPatients.push(patient);
      }
      
      storage.set(PATIENTS_KEY, JSON.stringify(allPatients));
    } catch (error) {
      console.error('Failed to save patient:', error);
      throw error;
    }
  }

  async updatePatient(mrn: string, updates: Partial<Patient>): Promise<void> {
    try {
      const storage = await this.getStorage();
      const allPatients = await this.getAllPatients();
      const patientIndex = allPatients.findIndex(p => p.mrn === mrn);
      
      if (patientIndex === -1) {
        throw new Error(`Patient with MRN ${mrn} not found`);
      }
      
      allPatients[patientIndex] = {
        ...allPatients[patientIndex],
        ...updates,
      };
      
      storage.set(PATIENTS_KEY, JSON.stringify(allPatients));
    } catch (error) {
      console.error('Failed to update patient:', error);
      throw error;
    }
  }

  async deletePatient(mrn: string): Promise<void> {
    try {
      const storage = await this.getStorage();
      const allPatients = await this.getAllPatients();
      const filteredPatients = allPatients.filter(p => p.mrn !== mrn);
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
