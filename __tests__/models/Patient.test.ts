import { Patient, Gender, TreatmentLocation, HBsAgStatus, SourceType } from '../../src/models';

describe('Patient Model', () => {
  it('should create a valid patient object', () => {
    const patient: Patient = {
      schemaVersion: '1.0.0',
      mrn: 'MRN001',
      firstName: 'John',
      middleName: 'A',
      lastName: 'Smith',
      dob: new Date('1965-03-15'),
      gender: Gender.Male,
      admissionNumber: 'ADM001',
      treatmentLocation: TreatmentLocation.OR,
      roomNumber: '101',
      hbsAgStatus: HBsAgStatus.Negative,
      hbsAgDate: new Date('2024-01-10'),
      hbsAgSource: SourceType.Hospital,
      hbsAbValue: 150,
      hbsAbDate: new Date('2024-01-10'),
      hbsAbSource: SourceType.Hospital,
    };

    expect(patient.mrn).toBe('MRN001');
    expect(patient.firstName).toBe('John');
    expect(patient.gender).toBe(Gender.Male);
    expect(patient.treatmentLocation).toBe(TreatmentLocation.OR);
    expect(patient.hbsAgStatus).toBe(HBsAgStatus.Negative);
  });

  it('should allow null values for optional HBsAb fields', () => {
    const patient: Patient = {
      schemaVersion: '1.0.0',
      mrn: 'MRN002',
      firstName: 'Mary',
      middleName: 'B',
      lastName: 'Johnson',
      dob: new Date('1972-07-22'),
      gender: Gender.Female,
      admissionNumber: 'ADM002',
      treatmentLocation: TreatmentLocation.Bedside,
      roomNumber: '205',
      hbsAgStatus: HBsAgStatus.Positive,
      hbsAgDate: new Date('2024-02-05'),
      hbsAgSource: SourceType.DavitaPatientPortal,
      hbsAbValue: null,
      hbsAbDate: null,
      hbsAbSource: null,
    };

    expect(patient.hbsAbValue).toBeNull();
    expect(patient.hbsAbDate).toBeNull();
    expect(patient.hbsAbSource).toBeNull();
  });

  it('should validate schema version field exists', () => {
    const patient: Patient = {
      schemaVersion: '1.0.0',
      mrn: 'MRN003',
      firstName: 'Test',
      middleName: 'T',
      lastName: 'Patient',
      dob: new Date('1980-01-01'),
      gender: Gender.Male,
      admissionNumber: 'ADM003',
      treatmentLocation: TreatmentLocation.ICU_CCU,
      roomNumber: 'ICU-1',
      hbsAgStatus: HBsAgStatus.Unknown,
      hbsAgDate: null,
      hbsAgSource: null,
      hbsAbValue: null,
      hbsAbDate: null,
      hbsAbSource: null,
    };

    expect(patient.schemaVersion).toBeDefined();
    expect(patient.schemaVersion).toBe('1.0.0');
  });
});
