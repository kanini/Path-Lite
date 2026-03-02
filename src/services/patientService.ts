import type {Patient} from '../models/Patient';
import type {TreatmentSession} from '../models/TreatmentSession';
import {CompletionStatus} from '../models/enums';
import type {PatientStatus} from '../components/patient/StatusBadge';

export interface PatientWithStatus extends Patient {
  status: PatientStatus;
  lastUpdated: Date;
  treatmentSession?: TreatmentSession;
}

export interface GroupedPatients {
  active: PatientWithStatus[];
  completed: PatientWithStatus[];
}

class PatientService {
  determinePatientStatus(
    patient: Patient,
    sessions: TreatmentSession[],
  ): PatientStatus {
    const patientSessions = sessions.filter(
      s => s.patientMrn === patient.mrn,
    );

    if (patientSessions.length === 0) {
      return 'Not Started';
    }

    const latestSession = patientSessions.sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
    )[0];

    switch (latestSession.completionStatus) {
      case CompletionStatus.InProgress:
        return 'Tx In Progress';
      case CompletionStatus.Completed:
        const isAmended = patientSessions.filter(
          s => s.completionStatus === CompletionStatus.Completed,
        ).length > 1;
        return isAmended ? 'Submitted (Amended)' : 'Submitted';
      case CompletionStatus.Abandoned:
        return 'Not Started';
      default:
        return 'Not Started';
    }
  }

  getLastUpdatedDate(
    patient: Patient,
    sessions: TreatmentSession[],
  ): Date {
    const patientSessions = sessions.filter(
      s => s.patientMrn === patient.mrn,
    );

    if (patientSessions.length === 0) {
      return patient.dob;
    }

    const latestSession = patientSessions.sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
    )[0];

    return latestSession.updatedAt;
  }

  enrichPatientsWithStatus(
    patients: Patient[],
    sessions: TreatmentSession[],
  ): PatientWithStatus[] {
    return patients.map(patient => {
      const status = this.determinePatientStatus(patient, sessions);
      const lastUpdated = this.getLastUpdatedDate(patient, sessions);
      const patientSessions = sessions.filter(
        s => s.patientMrn === patient.mrn,
      );
      const treatmentSession = patientSessions.sort(
        (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
      )[0];

      return {
        ...patient,
        status,
        lastUpdated,
        treatmentSession,
      };
    });
  }

  sortByLastUpdated(patients: PatientWithStatus[]): PatientWithStatus[] {
    return [...patients].sort(
      (a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime(),
    );
  }

  filterMyPatients(
    patients: PatientWithStatus[],
    currentUserId: string,
  ): PatientWithStatus[] {
    return patients.filter(patient => {
      if (!patient.treatmentSession) {
        return false;
      }
      return true;
    });
  }

  groupByCompletionStatus(
    patients: PatientWithStatus[],
  ): GroupedPatients {
    const active = patients.filter(
      p =>
        p.status === 'Not Started' ||
        p.status === 'Tx In Progress' ||
        p.status === 'Received',
    );

    const completed = patients.filter(
      p => p.status === 'Submitted' || p.status === 'Submitted (Amended)',
    );

    return {
      active: this.sortByLastUpdated(active),
      completed: this.sortByLastUpdated(completed),
    };
  }
}

export const patientService = new PatientService();
