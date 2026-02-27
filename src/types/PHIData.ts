export interface Patient {
  mrn: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female';
  admissionNumber?: string;
  treatmentLocation: 'OR' | 'Bedside' | 'ICU-CCU' | 'ER' | 'Multi-Tx Room';
  roomNumber: string;
}

export interface ClinicalIntake {
  hbsAg: 'Positive' | 'Negative' | 'Unknown';
  hbsAgDateDrawn?: string;
  hbsAgSource?: 'Hospital' | 'Davita Patient Portal' | 'Non-Davita Source';
  hbsAbImmuneValue: string;
  hbsAbDateDrawn?: string;
  hbsAbSource?: 'Hospital' | 'Davita Patient Portal' | 'Non-Davita Source';
}

export interface TreatmentSession {
  sessionId: string;
  patientMRN: string;
  treatmentType: 'Hemodialysis';
  demographics: Patient;
  clinicalIntake: ClinicalIntake;
  status: 'incomplete' | 'completed';
  lastFieldIndex?: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  userId: string;
  username: string;
  hospitalId: string;
  role: 'nurse';
}

export interface Hospital {
  hospitalId: string;
  name: string;
  code: string;
}
