export const MRN_INVALID = "MRN must contain only numeric characters";

export const DOB_INVALID_FORMAT = "Date of Birth must be in MM/DD/YYYY format";

export const DOB_FUTURE = "Date of Birth cannot be in the future";

export const DOB_AGE_RANGE = "Patient age must be between 0 and 120 years";

export const EMAIL_INVALID = "Email must be in valid format (example@domain.com)";

export const PATIENT_NOT_FOUND = (mrn: string) => `Patient record not found for MRN: ${mrn}`;
