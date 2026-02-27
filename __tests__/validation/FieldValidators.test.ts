import { FieldValidators } from '../../src/validation/FieldValidators';
import {
  MRN_INVALID,
  DOB_INVALID_FORMAT,
  DOB_FUTURE,
  DOB_AGE_RANGE,
  EMAIL_INVALID,
} from '../../src/validation/ValidationMessages';

describe('FieldValidators', () => {
  describe('validateMRN', () => {
    it('should pass for valid numeric MRN', () => {
      const result = FieldValidators.validateMRN('123456');
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should pass for single digit MRN', () => {
      const result = FieldValidators.validateMRN('1');
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should fail for MRN with letters', () => {
      const result = FieldValidators.validateMRN('123ABC');
      expect(result.valid).toBe(false);
      expect(result.error).toBe(MRN_INVALID);
    });

    it('should fail for MRN with special characters', () => {
      const result = FieldValidators.validateMRN('123-456');
      expect(result.valid).toBe(false);
      expect(result.error).toBe(MRN_INVALID);
    });

    it('should fail for MRN with spaces', () => {
      const result = FieldValidators.validateMRN('123 456');
      expect(result.valid).toBe(false);
      expect(result.error).toBe(MRN_INVALID);
    });

    it('should fail for empty MRN', () => {
      const result = FieldValidators.validateMRN('');
      expect(result.valid).toBe(false);
      expect(result.error).toBe(MRN_INVALID);
    });
  });

  describe('validateDOB', () => {
    it('should pass for valid date 01/15/1980', () => {
      const result = FieldValidators.validateDOB('01/15/1980');
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should pass for leap year date 02/29/2020', () => {
      const result = FieldValidators.validateDOB('02/29/2020');
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should fail for invalid leap year date 02/29/2021', () => {
      const result = FieldValidators.validateDOB('02/29/2021');
      expect(result.valid).toBe(false);
      expect(result.error).toBe(DOB_INVALID_FORMAT);
    });

    it('should fail for future date', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const dateString = `${String(futureDate.getMonth() + 1).padStart(2, '0')}/${String(futureDate.getDate()).padStart(2, '0')}/${futureDate.getFullYear()}`;
      const result = FieldValidators.validateDOB(dateString);
      expect(result.valid).toBe(false);
      expect(result.error).toBe(DOB_FUTURE);
    });

    it('should fail for age > 120 years', () => {
      const date121YearsAgo = new Date();
      date121YearsAgo.setFullYear(date121YearsAgo.getFullYear() - 121);
      const dateString = `${String(date121YearsAgo.getMonth() + 1).padStart(2, '0')}/${String(date121YearsAgo.getDate()).padStart(2, '0')}/${date121YearsAgo.getFullYear()}`;
      const result = FieldValidators.validateDOB(dateString);
      expect(result.valid).toBe(false);
      expect(result.error).toBe(DOB_AGE_RANGE);
    });

    it('should fail for invalid format YYYY-MM-DD', () => {
      const result = FieldValidators.validateDOB('1980-01-15');
      expect(result.valid).toBe(false);
      expect(result.error).toBe(DOB_INVALID_FORMAT);
    });

    it('should fail for invalid month', () => {
      const result = FieldValidators.validateDOB('13/01/1980');
      expect(result.valid).toBe(false);
      expect(result.error).toBe(DOB_INVALID_FORMAT);
    });

    it('should fail for invalid day', () => {
      const result = FieldValidators.validateDOB('01/32/1980');
      expect(result.valid).toBe(false);
      expect(result.error).toBe(DOB_INVALID_FORMAT);
    });
  });

  describe('validateEmail', () => {
    it('should pass for valid email test@example.com', () => {
      const result = FieldValidators.validateEmail('test@example.com');
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should pass for email with subdomain', () => {
      const result = FieldValidators.validateEmail('user@mail.example.com');
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should pass for email with plus sign', () => {
      const result = FieldValidators.validateEmail('user+tag@example.com');
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should pass for email with dots', () => {
      const result = FieldValidators.validateEmail('first.last@example.com');
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should fail for invalid email without @', () => {
      const result = FieldValidators.validateEmail('invalid.email');
      expect(result.valid).toBe(false);
      expect(result.error).toBe(EMAIL_INVALID);
    });

    it('should fail for invalid email without domain', () => {
      const result = FieldValidators.validateEmail('test@');
      expect(result.valid).toBe(false);
      expect(result.error).toBe(EMAIL_INVALID);
    });

    it('should fail for invalid email without local part', () => {
      const result = FieldValidators.validateEmail('@example.com');
      expect(result.valid).toBe(false);
      expect(result.error).toBe(EMAIL_INVALID);
    });

    it('should fail for invalid email with spaces', () => {
      const result = FieldValidators.validateEmail('test user@example.com');
      expect(result.valid).toBe(false);
      expect(result.error).toBe(EMAIL_INVALID);
    });

    it('should fail for invalid email without TLD', () => {
      const result = FieldValidators.validateEmail('test@example');
      expect(result.valid).toBe(false);
      expect(result.error).toBe(EMAIL_INVALID);
    });
  });
});
