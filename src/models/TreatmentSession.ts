import { CompletionStatus } from './enums';

export interface TreatmentSession {
  schemaVersion: string;
  sessionId: string;
  patientMrn: string;
  formData: Record<string, any>;
  completionStatus: CompletionStatus;
  lastFieldIndex: number;
  createdAt: Date;
  updatedAt: Date;
}
