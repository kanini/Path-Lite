import * as Yup from 'yup';
import { MRN_PATTERN, EMAIL_PATTERN } from '../utils/RegexPatterns';
import { DateValidator } from './DateValidator';
import {
  MRN_INVALID,
  DOB_INVALID_FORMAT,
  DOB_FUTURE,
  DOB_AGE_RANGE,
  EMAIL_INVALID,
} from './ValidationMessages';

export const PatientValidationSchema = Yup.object().shape({
  mrn: Yup.string()
    .required('MRN is required')
    .matches(MRN_PATTERN, MRN_INVALID),

  dob: Yup.string()
    .required('Date of Birth is required')
    .test('valid-date', DOB_INVALID_FORMAT, (value) => {
      if (!value) return false;
      return DateValidator.isValidDate(value);
    })
    .test('not-future', DOB_FUTURE, (value) => {
      if (!value) return false;
      return DateValidator.isNotFutureDate(value);
    })
    .test('age-range', DOB_AGE_RANGE, (value) => {
      if (!value) return false;
      return DateValidator.isAgeInRange(value, 0, 120);
    }),

  email: Yup.string()
    .email(EMAIL_INVALID)
    .matches(EMAIL_PATTERN, EMAIL_INVALID)
    .optional(),
});
