import { MRN_PATTERN, EMAIL_PATTERN } from '../utils/RegexPatterns';
import { DateValidator } from './DateValidator';
import {
  MRN_INVALID,
  DOB_INVALID_FORMAT,
  DOB_FUTURE,
  DOB_AGE_RANGE,
  EMAIL_INVALID,
} from './ValidationMessages';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export class FieldValidators {
  static validateMRN(mrn: string): ValidationResult {
    if (!MRN_PATTERN.test(mrn)) {
      return { valid: false, error: MRN_INVALID };
    }
    return { valid: true };
  }

  static validateDOB(dob: string): ValidationResult {
    if (!DateValidator.isValidDate(dob)) {
      return { valid: false, error: DOB_INVALID_FORMAT };
    }

    if (!DateValidator.isNotFutureDate(dob)) {
      return { valid: false, error: DOB_FUTURE };
    }

    if (!DateValidator.isAgeInRange(dob, 0, 120)) {
      return { valid: false, error: DOB_AGE_RANGE };
    }

    return { valid: true };
  }

  static validateEmail(email: string): ValidationResult {
    if (!EMAIL_PATTERN.test(email)) {
      return { valid: false, error: EMAIL_INVALID };
    }
    return { valid: true };
  }
}
