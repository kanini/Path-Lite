# Task - TASK_001

## Requirement Reference
- User Story: US_007
- Story Location: .propel/context/tasks/us_007/us_007.md
- Acceptance Criteria:  
    - AC-1: Given I need patient data structure, When I define the Patient model, Then the system has a TypeScript interface with fields: mrn (string), firstName (string), middleName (string), lastName (string), dob (Date), gender (enum), admissionNumber (string), treatmentLocation (enum), roomNumber (string).
    - AC-2: Given I need session tracking, When I define the TreatmentSession model, Then the system has fields: sessionId (string), patientMrn (string), formData (object), completionStatus (enum), lastFieldIndex (number), createdAt (Date), updatedAt (Date).
    - AC-3: Given I need user authentication, When I define the User model, Then the system has hardcoded mock credentials with fields: userId (string), username (string), passwordHash (string), role (enum), hospitalId (string).
    - AC-4: Given I need hospital context, When I define the Hospital model, Then the system has hardcoded mock hospitals with fields: hospitalId (string), name (string), code (string), address (string).
    - AC-5: Given I need audit tracking, When I define the AuditLog model, Then the system has fields: logId (string), timestamp (Date), userId (string), actionType (enum), entityType (string), entityId (string), beforeValue (object), afterValue (object), ipAddress (string).
- Edge Case:
    - What happens when model schema changes in future versions? (Implement schema version field; provide migration utility for data transformation)
    - How does the system handle invalid JSON during deserialization? (Add JSON validation before parsing; log errors and return null with error flag)

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
Define comprehensive TypeScript interfaces for all mock data models: Patient, TreatmentSession, User, Hospital, AuditLog, and FormSchema. Implement schema versioning for future migration support and JSON validation utilities to handle deserialization errors gracefully.

## Dependent Tasks
- US_006 (MMKV Local Storage Implementation) must be completed

## Impacted Components
- **CREATE**: `src/models/Patient.ts` - Patient model interface and enums
- **CREATE**: `src/models/TreatmentSession.ts` - TreatmentSession model interface and enums
- **CREATE**: `src/models/User.ts` - User model interface with mock credentials
- **CREATE**: `src/models/Hospital.ts` - Hospital model interface with mock data
- **CREATE**: `src/models/AuditLog.ts` - AuditLog model interface and enums
- **CREATE**: `src/models/FormSchema.ts` - FormSchema model interface
- **CREATE**: `src/models/enums.ts` - Shared enums (Gender, TreatmentLocation, CompletionStatus, ActionType, UserRole)
- **CREATE**: `src/models/index.ts` - Barrel export for all models
- **CREATE**: `src/utils/SchemaValidator.ts` - JSON validation and schema versioning utilities
- **CREATE**: `src/utils/ModelSerializer.ts` - JSON serialization/deserialization with error handling

## Implementation Plan
1. Define Gender enum (Male, Female) and TreatmentLocation enum (OR, Bedside, ICU_CCU, ER, Multi_Tx_Room)
2. Create Patient.ts interface with all required fields and schema version
3. Define CompletionStatus enum (InProgress, Completed, Abandoned) for TreatmentSession
4. Create TreatmentSession.ts interface with session state tracking fields
5. Define UserRole enum (Nurse, Admin) and create User.ts interface
6. Create hardcoded mock user credentials (3 mock nurses, 1 mock admin)
7. Create Hospital.ts interface and hardcoded mock hospital list (5 mock hospitals)
8. Define ActionType enum (Create, Update, Delete, View, Login, Logout) for AuditLog
9. Create AuditLog.ts interface with comprehensive audit fields
10. Create FormSchema.ts interface for Hemodialysis form structure
11. Implement SchemaValidator.ts with JSON validation and schema version checking
12. Implement ModelSerializer.ts with safe JSON serialization/deserialization
13. Add error handling for invalid JSON with logging and null return
14. Write unit tests for all model interfaces and validation utilities

## Current Project State
```
app/
├── src/
│   ├── storage/
│   │   ├── MMKVStorage.ts
│   │   ├── PHIStorage.ts
│   │   └── AuditStorage.ts
│   ├── types/
│   │   ├── PHIData.ts
│   │   └── AuditLog.ts
│   ├── models/              # To be created
│   └── utils/               # To be created
└── package.json
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/models/enums.ts | Shared enums: Gender, TreatmentLocation, CompletionStatus, ActionType, UserRole, HBsAgStatus, SourceType |
| CREATE | src/models/Patient.ts | Patient interface with demographics and clinical fields |
| CREATE | src/models/TreatmentSession.ts | TreatmentSession interface with session state tracking |
| CREATE | src/models/User.ts | User interface with mock credentials (3 nurses, 1 admin) |
| CREATE | src/models/Hospital.ts | Hospital interface with mock hospital list (5 hospitals) |
| CREATE | src/models/AuditLog.ts | AuditLog interface with comprehensive audit fields |
| CREATE | src/models/FormSchema.ts | FormSchema interface for form structure definition |
| CREATE | src/models/index.ts | Barrel export for all models and enums |
| CREATE | src/utils/SchemaValidator.ts | JSON validation and schema version checking |
| CREATE | src/utils/ModelSerializer.ts | Safe JSON serialization/deserialization with error handling |
| CREATE | __tests__/models/Patient.test.ts | Unit tests for Patient model validation |
| CREATE | __tests__/utils/ModelSerializer.test.ts | Unit tests for JSON serialization/deserialization |

## External References
- TypeScript Interfaces: https://www.typescriptlang.org/docs/handbook/interfaces.html
- TypeScript Enums: https://www.typescriptlang.org/docs/handbook/enums.html
- JSON Schema Validation: https://json-schema.org/
- React Native TypeScript: https://reactnative.dev/docs/typescript

## Build Commands
```bash
# Run tests
npm test -- __tests__/models/
npm test -- __tests__/utils/ModelSerializer.test.ts

# Type check
npx tsc --noEmit

# Build
npx react-native run-ios
npx react-native run-android
```

## Implementation Validation Strategy
- [x] Unit tests pass for all model interfaces
- [x] Unit tests pass for JSON validation and schema versioning
- [x] Unit tests pass for serialization/deserialization with error handling
- [x] TypeScript compilation succeeds with no errors
- [x] **[Mobile Tasks]** Headless platform compilation succeeds
- [x] Mock data structures are valid and complete
- [x] Schema version field is present in all models
- [x] Invalid JSON deserialization returns null with error log

## Implementation Checklist
- [ ] Create enums.ts with Gender enum (Male = "Male", Female = "Female")
- [ ] Create enums.ts with TreatmentLocation enum (OR, Bedside, ICU_CCU, ER, Multi_Tx_Room)
- [ ] Create enums.ts with CompletionStatus enum (InProgress, Completed, Abandoned)
- [ ] Create enums.ts with ActionType enum (Create, Update, Delete, View, Login, Logout)
- [ ] Create enums.ts with UserRole enum (Nurse, Admin)
- [ ] Create enums.ts with HBsAgStatus enum (Positive, Negative, Unknown)
- [ ] Create enums.ts with SourceType enum (Hospital, DavitaPatientPortal, NonDavitaSource)
- [ ] Create Patient.ts interface with fields: schemaVersion, mrn, firstName, middleName, lastName, dob, gender, admissionNumber, treatmentLocation, roomNumber, hbsAgStatus, hbsAgDate, hbsAgSource, hbsAbValue, hbsAbDate, hbsAbSource
- [ ] Create TreatmentSession.ts interface with fields: schemaVersion, sessionId, patientMrn, formData, completionStatus, lastFieldIndex, createdAt, updatedAt
- [ ] Create User.ts interface with fields: schemaVersion, userId, username, passwordHash, role, hospitalId
- [ ] Create mock user credentials array: MOCK_USERS with 3 nurses and 1 admin (hardcoded)
- [ ] Create Hospital.ts interface with fields: schemaVersion, hospitalId, name, code, address
- [ ] Create mock hospital list: MOCK_HOSPITALS with 5 hospitals (hardcoded)
- [ ] Create AuditLog.ts interface with fields: schemaVersion, logId, timestamp, userId, actionType, entityType, entityId, beforeValue, afterValue, ipAddress
- [ ] Create FormSchema.ts interface with fields: schemaVersion, schemaId, formName, fields (array of field definitions)
- [ ] Create SchemaValidator.ts with validateJSON(jsonString: string): boolean method
- [ ] Create SchemaValidator.ts with checkSchemaVersion(data: any, expectedVersion: string): boolean method
- [ ] Create ModelSerializer.ts with serialize<T>(data: T): string method with try-catch
- [ ] Create ModelSerializer.ts with deserialize<T>(jsonString: string): T | null method with error logging
- [ ] Add error handling in deserialize(): catch JSON.parse errors, log error, return null
- [ ] Write unit tests for Patient interface validation
- [ ] Write unit tests for TreatmentSession interface validation
- [ ] Write unit tests for ModelSerializer.deserialize() with invalid JSON (should return null)
- [ ] Write unit tests for SchemaValidator.checkSchemaVersion() with version mismatch
- [ ] **[Mobile Tasks - MANDATORY]** Run TypeScript type checking (npx tsc --noEmit)
- [ ] **[Mobile Tasks - MANDATORY]** Verify all models export correctly from index.ts
