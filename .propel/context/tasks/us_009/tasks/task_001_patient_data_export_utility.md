# Task - TASK_001

## Requirement Reference
- User Story: US_009
- Story Location: .propel/context/tasks/us_009/us_009.md
- Acceptance Criteria:  
    - AC-1: Given I need to export patient data, When I trigger the export function, Then the system exports all Patient records from MMKV to a JSON file with proper structure and encryption removed.
    - AC-2: Given I need to export treatment sessions, When I trigger the session export, Then the system exports all TreatmentSession records with associated patient data in a nested JSON structure.
    - AC-4: Given exported data needs validation, When I review the exported JSON, Then the system includes schema version, export timestamp, record count, and validates JSON structure before export.
- Edge Case:
    - What happens when MMKV storage is empty during export? (Generate empty JSON array with metadata; display warning "No data available to export")

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
Implement mock data export utility to export Patient records and TreatmentSession records from MMKV to JSON files. Include export metadata (schema version, timestamp, record count) and validate JSON structure before export. Handle empty storage scenarios gracefully.

## Dependent Tasks
- US_006 (MMKV Local Storage Implementation) must be completed
- US_007 (Mock Data Models Definition) must be completed

## Impacted Components
- **CREATE**: `src/services/DataExportService.ts` - Data export service with patient and session export methods
- **CREATE**: `src/utils/JSONValidator.ts` - JSON structure validation utilities
- **CREATE**: `src/types/ExportMetadata.ts` - Export metadata interface

## Implementation Plan
1. Create ExportMetadata.ts interface with fields: schemaVersion, exportTimestamp, recordCount, exportType
2. Implement DataExportService.ts with exportPatients(): string method
3. Retrieve all Patient records from PHIStorage
4. Remove encryption (data is already decrypted when read from MMKV)
5. Create export metadata with schema version, timestamp, and patient count
6. Construct JSON export structure with metadata and patient array
7. Implement exportTreatmentSessions(): string method with nested patient data
8. Retrieve all TreatmentSession records and associated Patient records
9. Create nested JSON structure with sessions containing patient details
10. Implement JSONValidator.ts to validate export structure before returning
11. Handle empty storage scenario: return empty array with metadata and warning
12. Write unit tests for export functions with various data scenarios
13. Document export format and metadata structure

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
│   ├── services/             # To be created
│   └── utils/
└── package.json
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/types/ExportMetadata.ts | Export metadata interface |
| CREATE | src/services/DataExportService.ts | Data export service with patient and session export methods |
| CREATE | src/utils/JSONValidator.ts | JSON structure validation utilities |
| CREATE | __tests__/services/DataExportService.test.ts | Unit tests for data export |

## External References
- JSON Validation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
- React Native File System: https://github.com/itinance/react-native-fs
- HIPAA De-identification: https://www.hhs.gov/hipaa/for-professionals/privacy/special-topics/de-identification/index.html

## Build Commands
```bash
# Run tests
npm test -- __tests__/services/DataExportService.test.ts

# Build
npx react-native run-ios
npx react-native run-android
```

## Implementation Validation Strategy
- [x] Unit tests pass for patient data export
- [x] Unit tests pass for treatment session export with nested patient data
- [x] Unit tests pass for empty storage scenario
- [x] JSON structure is valid and includes metadata
- [x] **[Mobile Tasks]** Headless platform compilation succeeds
- [x] Export includes schema version, timestamp, and record count

## Implementation Checklist
- [ ] Create ExportMetadata.ts interface with fields: schemaVersion, exportTimestamp, recordCount, exportType
- [ ] Create DataExportService.ts with exportPatients(): string method
- [ ] Implement exportPatients: get all Patient records from PHIStorage using getAllKeys()
- [ ] Filter keys to get only patient records (keys starting with "patient_")
- [ ] Retrieve each patient record and add to patients array
- [ ] Create export metadata: schemaVersion="1.0", exportTimestamp=new Date().toISOString(), recordCount=patients.length, exportType="patients"
- [ ] Construct JSON export structure: { metadata, data: patients }
- [ ] Validate JSON structure using JSONValidator before returning
- [ ] Handle empty storage: if patients.length === 0, return { metadata, data: [], warning: "No data available to export" }
- [ ] Create DataExportService.ts with exportTreatmentSessions(): string method
- [ ] Implement exportTreatmentSessions: get all TreatmentSession records from PHIStorage
- [ ] For each session, retrieve associated Patient record using session.patientMrn
- [ ] Create nested structure: { session: {...sessionData}, patient: {...patientData} }
- [ ] Create export metadata for sessions
- [ ] Construct JSON export structure with nested sessions and patients
- [ ] Create JSONValidator.ts with validateExportStructure(jsonString: string): boolean method
- [ ] Implement validateExportStructure: parse JSON, check metadata fields exist, check data array exists
- [ ] Write unit tests for exportPatients with 5 patient records (should return valid JSON with count=5)
- [ ] Write unit tests for exportPatients with empty storage (should return empty array with warning)
- [ ] Write unit tests for exportTreatmentSessions with nested patient data (should include patient details)
- [ ] Write unit tests for JSONValidator.validateExportStructure with valid export (should return true)
- [ ] Write unit tests for JSONValidator.validateExportStructure with invalid JSON (should return false)
- [ ] **[Mobile Tasks - MANDATORY]** Verify export generates valid JSON on both iOS and Android
- [ ] **[Mobile Tasks - MANDATORY]** Test export with large datasets (100+ records) for performance
