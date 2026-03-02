import {patientService} from '../patientService';
import type {Patient} from '../../models/Patient';
import type {TreatmentSession} from '../../models/TreatmentSession';
import {Gender, TreatmentLocation, HBsAgStatus, CompletionStatus} from '../../models/enums';

describe('patientService', () => {
  const mockPatient: Patient = {
    schemaVersion: '1.0.0',
    mrn: 'MRN001',
    firstName: 'John',
    middleName: 'A',
    lastName: 'Doe',
    dob: new Date('1970-01-01'),
    gender: Gender.Male,
    admissionNumber: 'ADM001',
    treatmentLocation: TreatmentLocation.OR,
    roomNumber: '101',
    hbsAgStatus: HBsAgStatus.Negative,
    hbsAgDate: new Date(),
    hbsAgSource: null,
    hbsAbValue: null,
    hbsAbDate: null,
    hbsAbSource: null,
  };

  const mockSession: TreatmentSession = {
    schemaVersion: '1.0.0',
    sessionId: 'SESSION001',
    patientMrn: 'MRN001',
    formData: {},
    completionStatus: CompletionStatus.InProgress,
    lastFieldIndex: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe('determinePatientStatus', () => {
    it('returns Not Started when no sessions exist', () => {
      const status = patientService.determinePatientStatus(mockPatient, []);
      expect(status).toBe('Not Started');
    });

    it('returns Tx In Progress for in-progress session', () => {
      const status = patientService.determinePatientStatus(mockPatient, [mockSession]);
      expect(status).toBe('Tx In Progress');
    });

    it('returns Submitted for completed session', () => {
      const completedSession = {...mockSession, completionStatus: CompletionStatus.Completed};
      const status = patientService.determinePatientStatus(mockPatient, [completedSession]);
      expect(status).toBe('Submitted');
    });

    it('returns Submitted (Amended) for multiple completed sessions', () => {
      const session1 = {...mockSession, sessionId: 'S1', completionStatus: CompletionStatus.Completed};
      const session2 = {...mockSession, sessionId: 'S2', completionStatus: CompletionStatus.Completed};
      const status = patientService.determinePatientStatus(mockPatient, [session1, session2]);
      expect(status).toBe('Submitted (Amended)');
    });
  });

  describe('enrichPatientsWithStatus', () => {
    it('enriches patients with status and lastUpdated', () => {
      const enriched = patientService.enrichPatientsWithStatus([mockPatient], [mockSession]);
      expect(enriched).toHaveLength(1);
      expect(enriched[0].status).toBe('Tx In Progress');
      expect(enriched[0].lastUpdated).toBeDefined();
    });
  });

  describe('sortByLastUpdated', () => {
    it('sorts patients by last updated date descending', () => {
      const patient1 = {...mockPatient, mrn: 'MRN001'};
      const patient2 = {...mockPatient, mrn: 'MRN002'};
      const oldDate = new Date('2024-01-01');
      const newDate = new Date('2024-03-01');
      
      const enriched = [
        {...patient1, status: 'Not Started' as const, lastUpdated: oldDate},
        {...patient2, status: 'Not Started' as const, lastUpdated: newDate},
      ];
      
      const sorted = patientService.sortByLastUpdated(enriched);
      expect(sorted[0].mrn).toBe('MRN002');
      expect(sorted[1].mrn).toBe('MRN001');
    });
  });

  describe('groupByCompletionStatus', () => {
    it('groups patients into active and completed', () => {
      const patients = [
        {...mockPatient, mrn: 'MRN001', status: 'Not Started' as const, lastUpdated: new Date()},
        {...mockPatient, mrn: 'MRN002', status: 'Submitted' as const, lastUpdated: new Date()},
        {...mockPatient, mrn: 'MRN003', status: 'Tx In Progress' as const, lastUpdated: new Date()},
      ];
      
      const grouped = patientService.groupByCompletionStatus(patients);
      expect(grouped.active).toHaveLength(2);
      expect(grouped.completed).toHaveLength(1);
    });
  });
});
