import { Gender, TreatmentLocation, HBsAgStatus, SourceType } from './enums';

export interface Patient {
  schemaVersion: string;
  mrn: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: Date;
  gender: Gender;
  admissionNumber: string;
  treatmentLocation: TreatmentLocation;
  roomNumber: string;
  hbsAgStatus: HBsAgStatus;
  hbsAgDate: Date | null;
  hbsAgSource: SourceType | null;
  hbsAbValue: number | null;
  hbsAbDate: Date | null;
  hbsAbSource: SourceType | null;
}
