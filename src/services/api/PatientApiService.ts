import {apiClient} from '../../utils/api';
import {PATIENT_ENDPOINTS} from '../../constants/api';
import type {Patient} from '../../models/Patient';

export interface PatientApiResponse {
  id?: string;
  mrn: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  dob: string;
  gender: string;
  admissionNumber?: string | null;
  treatmentLocation: string;
  roomNumber: string;
  hbsAgStatus: string;
  hbsAgDate?: string | null;
  hbsAgSource?: string | null;
  hbsAbValue?: number | null;
  hbsAbDate?: string | null;
  hbsAbSource?: string | null;
  createdAt?: string;
}

export interface PatientListResponse {
  patients: PatientApiResponse[];
  total: number;
}

class PatientApiService {
  async getAllPatients(token?: string): Promise<Patient[]> {
    try {
      const response = await apiClient.get<PatientListResponse>(
        PATIENT_ENDPOINTS.LIST,
        token,
      );

      if (response.error) {
        console.error('API error fetching patients:', response.error);
        return [];
      }

      if (!response.data?.patients) {
        return [];
      }

      return response.data.patients.map(this.mapApiResponseToPatient);
    } catch (error) {
      console.error('Failed to fetch patients from API:', error);
      return [];
    }
  }

  async createPatient(patient: Patient, token?: string): Promise<Patient | null> {
    try {
      const apiData = this.mapPatientToApiRequest(patient);
      const response = await apiClient.post<PatientApiResponse>(
        PATIENT_ENDPOINTS.CREATE,
        apiData,
        token,
      );

      if (response.error) {
        console.error('API error creating patient:', response.error);
        return null;
      }

      if (!response.data) {
        return null;
      }

      return this.mapApiResponseToPatient(response.data);
    } catch (error) {
      console.error('Failed to create patient via API:', error);
      return null;
    }
  }

  async updatePatient(
    mrn: string,
    updates: Partial<Patient>,
    token?: string,
  ): Promise<Patient | null> {
    try {
      const endpoint = PATIENT_ENDPOINTS.UPDATE.replace(':id', mrn);
      const apiData = this.mapPatientToApiRequest(updates as Patient);
      const response = await apiClient.put<PatientApiResponse>(
        endpoint,
        apiData,
        token,
      );

      if (response.error) {
        console.error('API error updating patient:', response.error);
        return null;
      }

      if (!response.data) {
        return null;
      }

      return this.mapApiResponseToPatient(response.data);
    } catch (error) {
      console.error('Failed to update patient via API:', error);
      return null;
    }
  }

  async deletePatient(mrn: string, token?: string): Promise<boolean> {
    try {
      const endpoint = PATIENT_ENDPOINTS.DELETE.replace(':id', mrn);
      const response = await apiClient.delete(endpoint, token);

      if (response.error) {
        console.error('API error deleting patient:', response.error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to delete patient via API:', error);
      return false;
    }
  }

  private mapApiResponseToPatient(apiPatient: PatientApiResponse): Patient {
    return {
      schemaVersion: '1.0.0',
      mrn: apiPatient.mrn,
      firstName: apiPatient.firstName,
      middleName: apiPatient.middleName ?? null,
      lastName: apiPatient.lastName,
      dob: new Date(apiPatient.dob),
      gender: apiPatient.gender as any,
      admissionNumber: apiPatient.admissionNumber ?? null,
      treatmentLocation: apiPatient.treatmentLocation as any,
      roomNumber: apiPatient.roomNumber,
      hbsAgStatus: apiPatient.hbsAgStatus as any,
      hbsAgDate: apiPatient.hbsAgDate ? new Date(apiPatient.hbsAgDate) : null,
      hbsAgSource: (apiPatient.hbsAgSource as any) || null,
      hbsAbValue: apiPatient.hbsAbValue || null,
      hbsAbDate: apiPatient.hbsAbDate ? new Date(apiPatient.hbsAbDate) : null,
      hbsAbSource: (apiPatient.hbsAbSource as any) || null,
      createdAt: apiPatient.createdAt ? new Date(apiPatient.createdAt) : undefined,
    };
  }

  private formatDateOnly(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private mapPatientToApiRequest(patient: Patient): PatientApiResponse {
    return {
      mrn: patient.mrn,
      firstName: patient.firstName,
      middleName: patient.middleName ?? undefined,
      lastName: patient.lastName,
      dob: this.formatDateOnly(patient.dob),
      gender: patient.gender,
      admissionNumber: patient.admissionNumber ?? undefined,
      treatmentLocation: patient.treatmentLocation,
      roomNumber: patient.roomNumber,
      hbsAgStatus: patient.hbsAgStatus,
      hbsAgDate: patient.hbsAgDate ? this.formatDateOnly(patient.hbsAgDate) : null,
      hbsAgSource: patient.hbsAgSource || null,
      hbsAbValue: patient.hbsAbValue || null,
      hbsAbDate: patient.hbsAbDate ? this.formatDateOnly(patient.hbsAbDate) : null,
      hbsAbSource: patient.hbsAbSource || null,
      createdAt: patient.createdAt ? patient.createdAt.toISOString() : undefined,
    };
  }
}

export const patientApiService = new PatientApiService();
