import {getAllPatients} from '../data/mockPatientDashboard';
import {patientStorage} from '../storage/PatientStorage';
import type {Patient} from '../models/Patient';

export interface SearchCriteria {
  firstName?: string;
  lastName?: string;
  mrn?: string;
  dob?: Date;
  admissionNumber?: string;
}

export interface SearchProgress {
  percentage: number;
  message: string;
}

export type ProgressCallback = (progress: SearchProgress) => void;

export class PatientSearchService {
  static async searchWithProgress(
    criteria: SearchCriteria,
    onProgress?: ProgressCallback,
  ): Promise<Patient[]> {
    const progressSteps = [
      {percentage: 0, message: 'Initializing search...', delay: 0},
      {percentage: 25, message: 'Querying patient records...', delay: 100},
      {percentage: 50, message: 'Filtering results...', delay: 200},
      {percentage: 75, message: 'Validating matches...', delay: 300},
      {percentage: 100, message: 'Search complete', delay: 400},
    ];

    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      onProgress?.({
        percentage: step.percentage,
        message: step.message,
      });
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    // Get patients from storage and merge with mock data
    const storedPatients = await patientStorage.getAllPatients();
    const mockPatients = getAllPatients();
    
    // Merge, avoiding duplicates by MRN (prefer stored patients)
    const storedMRNs = storedPatients.map(p => p.mrn);
    const mockPatientsToKeep = mockPatients.filter(p => !storedMRNs.includes(p.mrn));
    const allPatients = [...storedPatients, ...mockPatientsToKeep];
    
    const results = allPatients.filter(patient => {
      if (criteria.mrn && !patient.mrn.toLowerCase().includes(criteria.mrn.toLowerCase())) return false;
      if (criteria.firstName && !patient.firstName.toLowerCase().includes(criteria.firstName.toLowerCase())) return false;
      if (criteria.lastName && !patient.lastName.toLowerCase().includes(criteria.lastName.toLowerCase())) return false;
      if (criteria.admissionNumber && !patient.admissionNumber.toLowerCase().includes(criteria.admissionNumber.toLowerCase())) return false;
      if (criteria.dob) {
        const searchDate = new Date(criteria.dob);
        const patientDate = new Date(patient.dob);
        searchDate.setHours(0, 0, 0, 0);
        patientDate.setHours(0, 0, 0, 0);
        if (searchDate.getTime() !== patientDate.getTime()) return false;
      }
      return true;
    });

    const uniquePatients = results.reduce((acc, current) => {
      const exists = acc.find(p => p.mrn === current.mrn);
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, [] as Patient[]);

    return uniquePatients;
  }
}
