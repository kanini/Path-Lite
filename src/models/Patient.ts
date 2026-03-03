import { Gender, TreatmentLocation, HBsAgStatus, SourceType } from './enums';

export interface Patient {
  schemaVersion: string;
  mrn: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  dob: Date;
  gender: Gender;
  admissionNumber: string | null;
  treatmentLocation: TreatmentLocation;
  roomNumber: string;
  hbsAgStatus: HBsAgStatus;
  hbsAgDate: Date | null;
  hbsAgSource: SourceType | null;
  hbsAbValue: number | null;
  hbsAbDate: Date | null;
  hbsAbSource: SourceType | null;
  createdAt?: Date;
}
