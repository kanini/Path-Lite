import { ModelSerializer } from '../../src/utils/ModelSerializer';
import { Patient, Gender, TreatmentLocation, HBsAgStatus, SourceType } from '../../src/models';

describe('ModelSerializer', () => {
  const mockPatient: Patient = {
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

  describe('serialize', () => {
    it('should serialize object to JSON string', () => {
      const serialized = ModelSerializer.serialize(mockPatient);
      expect(typeof serialized).toBe('string');
      expect(serialized).toContain('MRN001');
      expect(serialized).toContain('John');
    });

    it('should throw error for circular references', () => {
      const circular: any = { name: 'test' };
      circular.self = circular;
      
      expect(() => ModelSerializer.serialize(circular)).toThrow();
    });
  });

  describe('deserialize', () => {
    it('should deserialize valid JSON string to object', () => {
      const serialized = ModelSerializer.serialize(mockPatient);
      const deserialized = ModelSerializer.deserialize<Patient>(serialized);
      
      expect(deserialized).not.toBeNull();
      expect(deserialized?.mrn).toBe('MRN001');
      expect(deserialized?.firstName).toBe('John');
    });

    it('should return null for invalid JSON string', () => {
      const invalidJson = '{ invalid json }';
      const result = ModelSerializer.deserialize(invalidJson);
      
      expect(result).toBeNull();
    });

    it('should return null for empty string', () => {
      const result = ModelSerializer.deserialize('');
      
      expect(result).toBeNull();
    });

    it('should return null for non-string input', () => {
      const result = ModelSerializer.deserialize(null as any);
      
      expect(result).toBeNull();
    });

    it('should log error when deserialization fails', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      ModelSerializer.deserialize('{ invalid }');
      
      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('deserializeWithValidation', () => {
    it('should deserialize and validate successfully', () => {
      const serialized = ModelSerializer.serialize(mockPatient);
      const validator = (data: any) => data.mrn === 'MRN001';
      
      const result = ModelSerializer.deserializeWithValidation<Patient>(serialized, validator);
      
      expect(result).not.toBeNull();
      expect(result?.mrn).toBe('MRN001');
    });

    it('should return null when validation fails', () => {
      const serialized = ModelSerializer.serialize(mockPatient);
      const validator = (data: any) => data.mrn === 'INVALID';
      
      const result = ModelSerializer.deserializeWithValidation<Patient>(serialized, validator);
      
      expect(result).toBeNull();
    });

    it('should work without validator', () => {
      const serialized = ModelSerializer.serialize(mockPatient);
      
      const result = ModelSerializer.deserializeWithValidation<Patient>(serialized);
      
      expect(result).not.toBeNull();
      expect(result?.mrn).toBe('MRN001');
    });
  });
});
