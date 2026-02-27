# Task - TASK_001

## Requirement Reference
- User Story: US_008
- Story Location: .propel/context/tasks/us_008/us_008.md
- Acceptance Criteria:  
    - AC-1: Given MRN data is entered, When I validate the MRN field, Then the system checks that MRN is numeric only using regex pattern /^\d+$/ and rejects non-numeric values with error message.
    - AC-2: Given DOB data is entered, When I validate the DOB field, Then the system checks that DOB is a valid date in MM/DD/YYYY format, is not in the future, and patient age is within reasonable range (0-120 years).
    - AC-3: Given email data is entered, When I validate the email field, Then the system checks RFC-compliant email format using regex pattern and rejects invalid formats with specific error message.
- Edge Case:
    - How does the system handle date validation for leap years? (Use Date.parse() with leap year support; validate February 29 only for leap years)

## Design References (Frontend Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **UI Impact** | No |
| **Figma URL** | N/A |
| **Wireframe Status** | N/A |
| **Wireframe Type** | N/A |
| **Wireframe Path/URL** | N/A |
| **Screen Spec** | N/A |
| **UXR Requirements** | N/A |
| **Design Tokens** | N/A |

## Applicable Technology Stack
| Layer | Technology | Version |
|-------|------------|---------|
| Mobile | React Native | 0.73+ |
| Library | Yup | 1.3+ |

**Note**: All code, and libraries, MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | No |
| **AIR Requirements** | N/A |
| **AI Pattern** | N/A |
| **Prompt Template Path** | N/A |
| **Guardrails Config** | N/A |
| **Model Provider** | N/A |

## Mobile References (Mobile Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **Mobile Impact** | Yes |
| **Platform Target** | Both |
| **Min OS Version** | iOS 14.0 / Android API 26 (8.0) |
| **Mobile Framework** | React Native |

## Task Overview
Implement comprehensive field-level validation for MRN (numeric only), DOB (valid date, not future, age 0-120 years), and email (RFC-compliant format) using Yup validation library. Create reusable validation schemas and error message templates to ensure data integrity for mock patient data.

## Dependent Tasks
- US_006 (MMKV Local Storage Implementation) must be completed
- US_007 (Mock Data Models Definition) must be completed

## Impacted Components
- **CREATE**: `src/validation/FieldValidators.ts` - Field-level validation functions
- **CREATE**: `src/validation/ValidationSchemas.ts` - Yup validation schemas
- **CREATE**: `src/validation/ValidationMessages.ts` - Error message templates
- **CREATE**: `src/validation/DateValidator.ts` - Date validation with leap year support
- **CREATE**: `src/utils/RegexPatterns.ts` - Regex patterns for validation

## Implementation Plan
1. Install Yup validation library version 1.3+
2. Create RegexPatterns.ts with MRN_PATTERN (/^\d+$/), EMAIL_PATTERN (RFC-compliant), DATE_PATTERN (/^\d{2}\/\d{2}\/\d{4}$/)
3. Implement DateValidator.ts with leap year validation logic
4. Create ValidationMessages.ts with error message templates for each field type
5. Implement FieldValidators.ts with individual validator functions: validateMRN(), validateDOB(), validateEmail()
6. Create Yup validation schemas in ValidationSchemas.ts for Patient model
7. Add age range validation (0-120 years) for DOB field
8. Implement future date check for DOB field
9. Write unit tests for all validation functions with edge cases (leap years, boundary ages, invalid formats)
10. Document validation rules and error messages

## Current Project State
```
app/
├── src/
│   ├── storage/
│   ├── models/
│   │   └── Patient.ts
│   ├── validation/          # To be created
│   └── utils/
└── package.json
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | package.json | Add yup@^1.3.0 dependency |
| CREATE | src/utils/RegexPatterns.ts | Regex patterns for MRN, email, date validation |
| CREATE | src/validation/DateValidator.ts | Date validation with leap year support |
| CREATE | src/validation/ValidationMessages.ts | Error message templates |
| CREATE | src/validation/FieldValidators.ts | Field-level validation functions |
| CREATE | src/validation/ValidationSchemas.ts | Yup validation schemas for Patient model |
| CREATE | __tests__/validation/FieldValidators.test.ts | Unit tests for field validation |
| CREATE | __tests__/validation/DateValidator.test.ts | Unit tests for date validation including leap years |

## External References
- Yup Documentation: https://github.com/jquense/yup
- RFC 5322 Email Validation: https://datatracker.ietf.org/doc/html/rfc5322
- JavaScript Date Validation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
- Leap Year Calculation: https://en.wikipedia.org/wiki/Leap_year

## Build Commands
```bash
# Install dependencies
npm install yup@^1.3.0

# Run tests
npm test -- __tests__/validation/

# Type check
npx tsc --noEmit

# Build
npx react-native run-ios
npx react-native run-android
```

## Implementation Validation Strategy
- [x] Unit tests pass for MRN validation (numeric only)
- [x] Unit tests pass for DOB validation (valid date, not future, age 0-120)
- [x] Unit tests pass for email validation (RFC-compliant format)
- [x] Unit tests pass for leap year validation (February 29)
- [x] **[Mobile Tasks]** Headless platform compilation succeeds
- [x] All validation functions return appropriate error messages
- [x] Performance meets <500ms requirement for validation

## Implementation Checklist
- [ ] Install yup@^1.3.0 dependency
- [ ] Create RegexPatterns.ts with MRN_PATTERN = /^\d+$/
- [ ] Create RegexPatterns.ts with EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ (RFC-compliant)
- [ ] Create RegexPatterns.ts with DATE_PATTERN = /^\d{2}\/\d{2}\/\d{4}$/
- [ ] Create DateValidator.ts with isValidDate(dateString: string): boolean method
- [ ] Implement leap year check: year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
- [ ] Implement February 29 validation: only valid for leap years
- [ ] Create DateValidator.ts with isNotFutureDate(dateString: string): boolean method
- [ ] Create DateValidator.ts with isAgeInRange(dateString: string, minAge: number, maxAge: number): boolean method
- [ ] Create ValidationMessages.ts with MRN_INVALID = "MRN must contain only numeric characters"
- [ ] Create ValidationMessages.ts with DOB_INVALID_FORMAT = "Date of Birth must be in MM/DD/YYYY format"
- [ ] Create ValidationMessages.ts with DOB_FUTURE = "Date of Birth cannot be in the future"
- [ ] Create ValidationMessages.ts with DOB_AGE_RANGE = "Patient age must be between 0 and 120 years"
- [ ] Create ValidationMessages.ts with EMAIL_INVALID = "Email must be in valid format (example@domain.com)"
- [ ] Create FieldValidators.ts with validateMRN(mrn: string): { valid: boolean; error?: string } method
- [ ] Implement validateMRN: check MRN_PATTERN.test(mrn), return error if invalid
- [ ] Create FieldValidators.ts with validateDOB(dob: string): { valid: boolean; error?: string } method
- [ ] Implement validateDOB: check DATE_PATTERN, isValidDate, isNotFutureDate, isAgeInRange(0, 120)
- [ ] Create FieldValidators.ts with validateEmail(email: string): { valid: boolean; error?: string } method
- [ ] Implement validateEmail: check EMAIL_PATTERN.test(email), return error if invalid
- [ ] Create ValidationSchemas.ts with PatientValidationSchema using Yup.object()
- [ ] Add Yup schema for mrn: Yup.string().required().matches(MRN_PATTERN, MRN_INVALID)
- [ ] Add Yup schema for dob: Yup.string().required().test('valid-date', DOB_INVALID_FORMAT, isValidDate)
- [ ] Add Yup schema for email: Yup.string().email(EMAIL_INVALID).matches(EMAIL_PATTERN)
- [ ] Write unit tests for validateMRN with valid numeric values (should pass)
- [ ] Write unit tests for validateMRN with non-numeric values (should fail with error message)
- [ ] Write unit tests for validateDOB with valid date "01/15/1980" (should pass)
- [ ] Write unit tests for validateDOB with future date (should fail with DOB_FUTURE error)
- [ ] Write unit tests for validateDOB with age > 120 years (should fail with DOB_AGE_RANGE error)
- [ ] Write unit tests for validateDOB with leap year date "02/29/2020" (should pass)
- [ ] Write unit tests for validateDOB with invalid leap year date "02/29/2021" (should fail)
- [ ] Write unit tests for validateEmail with valid email "test@example.com" (should pass)
- [ ] Write unit tests for validateEmail with invalid email "invalid.email" (should fail)
- [ ] **[Mobile Tasks - MANDATORY]** Verify validation performance <500ms on both iOS and Android
- [ ] **[Mobile Tasks - MANDATORY]** Run TypeScript type checking for validation schemas
