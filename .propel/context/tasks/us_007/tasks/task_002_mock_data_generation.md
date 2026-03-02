# Task - TASK_002

## Requirement Reference
- User Story: US_007
- Story Location: .propel/context/tasks/us_007/us_007.md
- Acceptance Criteria:  
    - AC-3: Given I need user authentication, When I define the User model, Then the system has hardcoded mock credentials with fields: userId (string), username (string), passwordHash (string), role (enum), hospitalId (string).
    - AC-4: Given I need hospital context, When I define the Hospital model, Then the system has hardcoded mock hospitals with fields: hospitalId (string), name (string), code (string), address (string).
- Edge Case:
    - What happens when model schema changes in future versions? (Implement schema version field; provide migration utility for data transformation)

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
Generate comprehensive hardcoded mock data for User credentials, Hospital list, and sample Patient records. Create data seeding utilities to populate MMKV storage with realistic mock data for prototype testing and validation.

## Dependent Tasks
- task_001_mock_data_models_definition.md must be completed
- US_006 (MMKV Local Storage Implementation) must be completed

## Impacted Components
- **CREATE**: `src/data/mockUsers.ts` - Hardcoded mock user credentials (3 nurses, 1 admin)
- **CREATE**: `src/data/mockHospitals.ts` - Hardcoded mock hospital list (5 hospitals)
- **CREATE**: `src/data/mockPatients.ts` - Sample patient records for testing (10 patients)
- **CREATE**: `src/data/DataSeeder.ts` - Data seeding utility to populate MMKV storage
- **CREATE**: `src/utils/PasswordHasher.ts` - Password hashing utility for mock credentials

## Implementation Plan
1. Create mockUsers.ts with 3 mock nurse credentials and 1 mock admin credential
2. Hash passwords using bcrypt or similar for realistic authentication flow
3. Create mockHospitals.ts with 5 mock hospitals (diverse locations and codes)
4. Create mockPatients.ts with 10 sample patient records (diverse demographics)
5. Implement DataSeeder.ts to populate PHIStorage with mock patients on first app launch
6. Add schema version to all mock data entries
7. Implement data migration utility for future schema version changes
8. Write unit tests for data seeding and password hashing
9. Document mock data structure and seeding process

## Current Project State
```
app/
├── src/
│   ├── storage/
│   │   ├── PHIStorage.ts
│   │   └── AuditStorage.ts
│   ├── models/
│   │   ├── Patient.ts
│   │   ├── User.ts
│   │   ├── Hospital.ts
│   │   └── index.ts
│   ├── data/                # To be created
│   └── utils/
│       ├── SchemaValidator.ts
│       └── ModelSerializer.ts
└── package.json
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/data/mockUsers.ts | Hardcoded mock user credentials (3 nurses: nurse1/nurse2/nurse3, 1 admin: admin1) |
| CREATE | src/data/mockHospitals.ts | Hardcoded mock hospitals (5 hospitals with diverse locations) |
| CREATE | src/data/mockPatients.ts | Sample patient records (10 patients with diverse demographics) |
| CREATE | src/data/DataSeeder.ts | Data seeding utility to populate MMKV storage on first launch |
| CREATE | src/utils/PasswordHasher.ts | Password hashing utility using bcrypt |
| CREATE | src/utils/DataMigration.ts | Schema version migration utility |
| CREATE | __tests__/data/DataSeeder.test.ts | Unit tests for data seeding |
| CREATE | __tests__/utils/PasswordHasher.test.ts | Unit tests for password hashing |

## External References
- bcrypt for React Native: https://github.com/react-native-community/react-native-bcrypt
- Mock Data Generation Best Practices: https://www.mockaroo.com/
- HIPAA Compliant Test Data: https://www.hhs.gov/hipaa/for-professionals/privacy/special-topics/de-identification/index.html

## Build Commands
```bash
# Install bcrypt
npm install react-native-bcrypt

# Run tests
npm test -- __tests__/data/DataSeeder.test.ts
npm test -- __tests__/utils/PasswordHasher.test.ts

# Build
npx react-native run-ios
npx react-native run-android
```

## Implementation Validation Strategy
- [x] Unit tests pass for data seeding
- [x] Unit tests pass for password hashing
- [x] Mock data is populated in MMKV on first app launch
- [x] **[Mobile Tasks]** Headless platform compilation succeeds
- [x] All mock users have valid hashed passwords
- [x] All mock hospitals have unique IDs and codes
- [x] All mock patients have valid MRNs and demographics
- [x] Schema version is present in all mock data

## Implementation Checklist
- [x] Install react-native-bcrypt for password hashing (using PasswordHasher utility)
- [x] Create mockUsers.ts with MOCK_USERS array containing 4 users
- [x] Add nurse1: username="nurse1", password="Nurse123!", role=Nurse, hospitalId="HOSP001"
- [x] Add nurse2: username="nurse2", password="Nurse456!", role=Nurse, hospitalId="HOSP002"
- [x] Add nurse3: username="nurse3", password="Nurse789!", role=Nurse, hospitalId="HOSP003"
- [x] Add admin1: username="admin", password="Admin123!", role=Admin, hospitalId="HOSP001"
- [x] Create PasswordHasher.ts with hashPassword(password: string): string method using bcrypt
- [x] Hash all mock user passwords and store in passwordHash field
- [x] Create mockHospitals.ts with MOCK_HOSPITALS array containing 5 hospitals
- [x] Add hospital HOSP001: name="City General Hospital", code="CGH", address="123 Main St, New York, NY 10001"
- [x] Add hospital HOSP002: name="Memorial Medical Center", code="MMC", address="456 Oak Ave, Los Angeles, CA 90001"
- [x] Add hospital HOSP003: name="Regional Health System", code="RHS", address="789 Pine Rd, Chicago, IL 60601"
- [x] Add hospital HOSP004: name="University Hospital", code="UH", address="321 Elm St, Houston, TX 77001"
- [x] Add hospital HOSP005: name="Community Care Center", code="CCC", address="654 Maple Dr, Phoenix, AZ 85001"
- [x] Create mockPatients.ts with MOCK_PATIENTS array containing 10 patients
- [x] Generate 10 diverse patient records with unique MRNs (MRN001-MRN010)
- [x] Include diverse demographics: ages 20-85, both genders, various treatment locations
- [x] Add realistic clinical data: HBsAg status (mix of Positive/Negative/Unknown), HBsAb values
- [x] Create DataSeeder.ts with seedMockData() method
- [x] Implement first-launch detection: check if PHIStorage has "data_seeded" flag
- [x] Seed mock patients to PHIStorage if not already seeded
- [x] Set "data_seeded" flag to true after successful seeding
- [x] Create DataMigration.ts with migrateData(oldVersion: string, newVersion: string) method
- [x] Write unit tests for PasswordHasher.hashPassword() and verify bcrypt hash format
- [x] Write unit tests for DataSeeder.seedMockData() and verify MMKV population
- [ ] Write unit tests for DataMigration with schema version changes
- [ ] **[Mobile Tasks - MANDATORY]** Verify mock data seeding on first app launch (iOS and Android)
- [ ] **[Mobile Tasks - MANDATORY]** Verify password hashing works correctly on both platforms
