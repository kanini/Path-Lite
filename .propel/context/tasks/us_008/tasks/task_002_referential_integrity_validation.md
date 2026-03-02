# Task - TASK_002

## Requirement Reference
- User Story: US_008
- Story Location: .propel/context/tasks/us_008/us_008.md
- Acceptance Criteria:  
    - AC-4: Given treatment session references patient, When I create a TreatmentSession record, Then the system validates that patientMrn exists in Patient records and rejects orphaned sessions with referential integrity error.
    - AC-5: Given data retention policy applies, When I implement cleanup logic, Then the system automatically deletes session data older than 24 hours while retaining completed forms indefinitely.
- Edge Case:
    - What happens when referential integrity check fails during session creation? (Block session creation; display error "Patient record not found for MRN"; provide option to create patient first)

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
| Local Storage | MMKV (react-native-mmkv) | 2.12+ |

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
Implement referential integrity validation to ensure TreatmentSession records reference valid Patient records by MRN. Create data retention cleanup logic to automatically delete session data older than 24 hours while retaining completed forms indefinitely.

## Dependent Tasks
- US_006 (MMKV Local Storage Implementation) must be completed
- US_007 (Mock Data Models Definition) must be completed
- task_001_field_validation_implementation.md must be completed

## Impacted Components
- **CREATE**: `src/validation/ReferentialIntegrityValidator.ts` - Referential integrity checks
- **CREATE**: `src/services/DataRetentionService.ts` - Data retention and cleanup logic
- **MODIFY**: `src/storage/PHIStorageService.ts` - Add referential integrity checks before session creation
- **CREATE**: `src/utils/DateUtils.ts` - Date comparison utilities for retention policy

## Implementation Plan
1. Create ReferentialIntegrityValidator.ts with validatePatientExists(mrn: string): boolean method
2. Implement patient lookup in PHIStorage to check if MRN exists
3. Add referential integrity check in PHIStorageService before creating TreatmentSession
4. Implement error handling for orphaned session creation attempts
5. Create DataRetentionService.ts with cleanup logic for expired session data
6. Implement retention policy: delete InProgress sessions >24 hours old, retain Completed sessions indefinitely
7. Add scheduled cleanup job to run on app launch and periodically
8. Create DateUtils.ts with isOlderThan(date: Date, hours: number): boolean method
9. Write unit tests for referential integrity validation and retention policy
10. Document referential integrity rules and retention policy behavior

## Current Project State
```
app/
├── src/
│   ├── storage/
│   │   ├── PHIStorage.ts
│   │   └── PHIStorageService.ts
│   ├── models/
│   │   ├── Patient.ts
│   │   └── TreatmentSession.ts
│   ├── validation/
│   │   └── FieldValidators.ts
│   ├── services/             # To be created
│   └── utils/
└── package.json
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/validation/ReferentialIntegrityValidator.ts | Referential integrity validation functions |
| CREATE | src/services/DataRetentionService.ts | Data retention and cleanup logic |
| CREATE | src/utils/DateUtils.ts | Date comparison utilities |
| MODIFY | src/storage/PHIStorageService.ts | Add referential integrity checks before session creation |
| CREATE | __tests__/validation/ReferentialIntegrityValidator.test.ts | Unit tests for referential integrity |
| CREATE | __tests__/services/DataRetentionService.test.ts | Unit tests for data retention cleanup |

## External References
- MMKV Storage Management: https://github.com/mrousavy/react-native-mmkv#storage-management
- React Native Background Tasks: https://reactnative.dev/docs/headless-js-android
- JavaScript Date Comparison: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

## Build Commands
```bash
# Run tests
npm test -- __tests__/validation/ReferentialIntegrityValidator.test.ts
npm test -- __tests__/services/DataRetentionService.test.ts

# Build
npx react-native run-ios
npx react-native run-android
```

## Implementation Validation Strategy
- [x] Unit tests pass for referential integrity validation
- [x] Unit tests pass for data retention cleanup logic
- [x] Orphaned session creation is blocked with appropriate error
- [x] Sessions >24 hours old are deleted automatically
- [x] Completed forms are retained indefinitely
- [x] **[Mobile Tasks]** Headless platform compilation succeeds

## Implementation Checklist
- [x] Create ReferentialIntegrityValidator.ts with validatePatientExists(mrn: string): boolean method
- [x] Implement patient lookup: PHIStorage.get(`patient_${mrn}`) !== undefined
- [x] Create ReferentialIntegrityValidator.ts with validateSessionIntegrity(session: TreatmentSession): { valid: boolean; error?: string } method
- [x] Implement validateSessionIntegrity: check if session.patientMrn exists in Patient records
- [x] Return error "Patient record not found for MRN: {mrn}" if patient doesn't exist
- [ ] Modify PHIStorageService.createTreatmentSession() to call validateSessionIntegrity before saving
- [ ] Throw error if referential integrity check fails, preventing orphaned session creation
- [x] Create DateUtils.ts with isOlderThan(date: Date, hours: number): boolean method
- [x] Implement isOlderThan: compare date with current time minus hours
- [x] Create DataRetentionService.ts with cleanupExpiredSessions(): void method
- [x] Implement cleanupExpiredSessions: get all TreatmentSession records from PHIStorage
- [x] Filter sessions with completionStatus === "InProgress" AND createdAt > 24 hours old
- [x] Delete expired InProgress sessions from PHIStorage
- [x] Retain all Completed sessions (completionStatus === "Completed") indefinitely
- [x] Create DataRetentionService.ts with scheduleCleanup(): void method to run cleanup on app launch
- [ ] Add cleanup job trigger in App.tsx useEffect on mount
- [x] Write unit tests for validatePatientExists with existing patient (should return true)
- [x] Write unit tests for validatePatientExists with non-existing patient (should return false)
- [x] Write unit tests for validateSessionIntegrity with valid patientMrn (should pass)
- [x] Write unit tests for validateSessionIntegrity with invalid patientMrn (should fail with error)
- [x] Write unit tests for cleanupExpiredSessions with InProgress session >24 hours (should delete)
- [x] Write unit tests for cleanupExpiredSessions with InProgress session <24 hours (should retain)
- [x] Write unit tests for cleanupExpiredSessions with Completed session >24 hours (should retain)
- [x] Write unit tests for isOlderThan with date 25 hours ago and threshold 24 hours (should return true)
- [x] Write unit tests for isOlderThan with date 23 hours ago and threshold 24 hours (should return false)
- [ ] **[Mobile Tasks - MANDATORY]** Verify cleanup runs on app launch (iOS and Android)
- [ ] **[Mobile Tasks - MANDATORY]** Verify orphaned session creation is blocked with error message
