# Task - TASK_002

## Requirement Reference
- User Story: US_009
- Story Location: .propel/context/tasks/us_009/us_009.md
- Acceptance Criteria:  
    - AC-3: Given I need to export audit logs, When I trigger the audit export, Then the system exports all AuditLog records from the separate MMKV instance to a JSON file with timestamp-based filename.
    - AC-5: Given export needs to be accessible, When I complete the export, Then the system saves the JSON file to device documents directory and provides shareable file path for external transfer.
- Edge Case:
    - How does the system handle large export files exceeding device storage? (Implement size check before export; provide chunked export option for large datasets)

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
| Library | react-native-fs | 2.20+ |

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
Implement audit log export utility to export AuditLog records from separate MMKV instance to JSON files with timestamp-based filenames. Save exported files to device documents directory and provide shareable file paths. Implement storage size checks and chunked export for large datasets.

## Dependent Tasks
- US_006 (MMKV Local Storage Implementation) must be completed
- US_007 (Mock Data Models Definition) must be completed
- task_001_patient_data_export_utility.md must be completed

## Impacted Components
- **MODIFY**: `src/services/DataExportService.ts` - Add audit log export method
- **CREATE**: `src/services/FileExportService.ts` - File system operations for export
- **CREATE**: `src/utils/StorageSizeChecker.ts` - Storage size validation utilities

## Implementation Plan
1. Install react-native-fs library for file system operations
2. Extend DataExportService.ts with exportAuditLogs(): string method
3. Retrieve all AuditLog records from AuditStorage
4. Create timestamp-based filename: `audit_logs_${timestamp}.json`
5. Implement FileExportService.ts to save JSON to device documents directory
6. Get device documents directory path (iOS: DocumentDirectoryPath, Android: ExternalDirectoryPath)
7. Implement storage size check before export using StorageSizeChecker
8. Implement chunked export for large datasets (>10MB or >1000 records)
9. Return shareable file path after successful export
10. Write unit tests for audit log export and file operations
11. Document export file location and sharing mechanism

## Current Project State
```
app/
├── src/
│   ├── storage/
│   │   └── AuditStorage.ts
│   ├── services/
│   │   └── DataExportService.ts
│   ├── models/
│   │   └── AuditLog.ts
│   └── utils/
└── package.json
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | package.json | Add react-native-fs@^2.20.0 dependency |
| MODIFY | src/services/DataExportService.ts | Add exportAuditLogs() method |
| CREATE | src/services/FileExportService.ts | File system operations for saving exports |
| CREATE | src/utils/StorageSizeChecker.ts | Storage size validation and chunked export logic |
| CREATE | __tests__/services/FileExportService.test.ts | Unit tests for file export operations |

## External References
- react-native-fs Documentation: https://github.com/itinance/react-native-fs
- iOS File System: https://developer.apple.com/documentation/foundation/filemanager
- Android External Storage: https://developer.android.com/training/data-storage

## Build Commands
```bash
# Install dependencies
npm install react-native-fs@^2.20.0

# iOS setup
cd ios && pod install && cd ..

# Run tests
npm test -- __tests__/services/FileExportService.test.ts

# Build
npx react-native run-ios
npx react-native run-android
```

## Implementation Validation Strategy
- [x] Unit tests pass for audit log export
- [x] Unit tests pass for file save to documents directory
- [x] Unit tests pass for storage size check
- [x] Unit tests pass for chunked export with large datasets
- [x] **[Mobile Tasks]** Headless platform compilation succeeds
- [x] **[Mobile Tasks]** Native dependency linking verified (react-native-fs)
- [x] Export file is saved to documents directory with timestamp-based filename
- [x] Shareable file path is returned after export

## Implementation Checklist
- [x] Install react-native-fs@^2.20.0 dependency
- [x] Run pod install for iOS
- [x] Modify DataExportService.ts to add exportAuditLogs(): Promise<string> method
- [x] Implement exportAuditLogs: get all AuditLog records from AuditStorage
- [x] Create export metadata for audit logs
- [x] Generate timestamp-based filename: `audit_logs_${new Date().toISOString().replace(/:/g, '-')}.json`
- [x] Construct JSON export structure with metadata and audit logs array
- [x] Create FileExportService.ts with saveToDocuments(filename: string, content: string): Promise<string> method
- [x] Import RNFS from react-native-fs
- [x] Get documents directory path: RNFS.DocumentDirectoryPath (iOS) or RNFS.ExternalDirectoryPath (Android)
- [x] Construct full file path: `${documentsPath}/${filename}`
- [x] Write JSON content to file using RNFS.writeFile(filePath, content, 'utf8')
- [x] Return shareable file path after successful write
- [x] Create StorageSizeChecker.ts with checkAvailableSpace(requiredBytes: number): Promise<boolean> method
- [x] Implement checkAvailableSpace: use RNFS.getFSInfo() to get available storage
- [x] Return true if available space > requiredBytes, false otherwise
- [x] Create StorageSizeChecker.ts with shouldChunkExport(recordCount: number, estimatedSizeBytes: number): boolean method
- [x] Implement shouldChunkExport: return true if recordCount > 1000 OR estimatedSizeBytes > 10MB
- [x] Implement chunked export logic: split audit logs into chunks of 500 records
- [x] Export each chunk to separate file: `audit_logs_${timestamp}_chunk_${chunkNumber}.json`
- [x] Add storage size check before export: call checkAvailableSpace with estimated export size
- [x] Throw error if insufficient storage: "Insufficient storage space for export. Please free up space and try again."
- [x] Write unit tests for exportAuditLogs with 100 audit log records
- [x] Write unit tests for saveToDocuments and verify file is created at correct path
- [x] Write unit tests for checkAvailableSpace with sufficient storage (should return true)
- [x] Write unit tests for checkAvailableSpace with insufficient storage (should return false)
- [x] Write unit tests for chunked export with 1500 records (should create 3 chunk files)
- [ ] **[Mobile Tasks - MANDATORY]** Verify file export on iOS simulator (check DocumentDirectoryPath)
- [ ] **[Mobile Tasks - MANDATORY]** Verify file export on Android emulator (check ExternalDirectoryPath)
- [ ] **[Mobile Tasks - MANDATORY]** Test file sharing from documents directory (iOS Share Sheet, Android Intent)
