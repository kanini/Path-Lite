# Task - TASK_002

## Requirement Reference
- User Story: US_006
- Story Location: .propel/context/tasks/us_006/us_006.md
- Acceptance Criteria:  
    - AC-2: Given PHI data needs encryption, When I configure the PHI MMKV instance, Then the system creates an encrypted MMKV instance with AES-256 encryption key generated and stored securely in device keychain.
    - AC-5: Given device backup is needed, When I configure backup settings, Then the system enables iOS iCloud backup and Android Auto Backup for MMKV storage directories with encryption maintained.
- Edge Case:
    - What happens when MMKV encryption key is lost? (Implement key recovery mechanism using device keychain; document data loss scenario for key loss)

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
| Security | MMKV Encryption (AES-256) | Built-in |

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
Configure the PHI MMKV storage instance with AES-256 encryption for mock patient data (demographics, admission, clinical intake). Implement synchronous storage API methods (set, get, delete, getAllKeys) with <500ms performance requirement. Enable iOS iCloud backup and Android Auto Backup for MMKV storage directories while maintaining encryption at rest.

## Dependent Tasks
- task_001_mmkv_library_integration.md must be completed

## Impacted Components
- **MODIFY**: `src/storage/PHIStorage.ts` - Add synchronous CRUD methods for PHI data
- **NEW**: `src/storage/PHIStorageService.ts` - High-level service for PHI data operations
- **NEW**: `src/types/PHIData.ts` - TypeScript interfaces for PHI data structures
- **MODIFY**: `ios/PathLite/Info.plist` - Enable iCloud backup for MMKV directory
- **MODIFY**: `android/app/src/main/AndroidManifest.xml` - Enable Auto Backup for MMKV directory

## Implementation Plan
1. Extend PHIStorage.ts with synchronous CRUD methods: set(key, value), get(key), delete(key), getAllKeys()
2. Implement type-safe wrappers for PHI data structures (Patient, TreatmentSession)
3. Add performance monitoring to ensure <500ms operation latency
4. Configure iOS Info.plist to include MMKV storage directory in iCloud backup
5. Configure Android AndroidManifest.xml to include MMKV storage directory in Auto Backup
6. Verify encryption is maintained during backup/restore operations
7. Implement storage size monitoring to track MMKV usage
8. Add error handling for storage quota exceeded scenarios
9. Write unit tests for all CRUD operations with performance assertions
10. Document backup/restore behavior and encryption persistence

## Current Project State
```
app/
├── src/
│   ├── storage/
│   │   ├── MMKVStorage.ts       # Created in task_001
│   │   ├── KeychainManager.ts   # Created in task_001
│   │   ├── PHIStorage.ts        # Created in task_001 (basic)
│   │   └── AuditStorage.ts      # Created in task_001
│   ├── types/                   # To be created
│   └── App.tsx
├── ios/
│   ├── PathLite/
│   │   └── Info.plist
│   └── Podfile
├── android/
│   ├── app/
│   │   └── src/main/AndroidManifest.xml
│   └── build.gradle
└── package.json
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | src/storage/PHIStorage.ts | Add synchronous CRUD methods (set, get, delete, getAllKeys) |
| CREATE | src/storage/PHIStorageService.ts | High-level service with type-safe PHI data operations |
| CREATE | src/types/PHIData.ts | TypeScript interfaces for Patient, TreatmentSession, etc. |
| CREATE | src/storage/StorageMonitor.ts | Storage size monitoring and quota management |
| MODIFY | ios/PathLite/Info.plist | Add NSAllowsArbitraryLoadsInWebContent and iCloud backup configuration |
| MODIFY | android/app/src/main/AndroidManifest.xml | Add android:allowBackup="true" and backup rules |
| CREATE | android/app/src/main/res/xml/backup_rules.xml | Specify MMKV directories for Auto Backup |
| CREATE | __tests__/storage/PHIStorage.test.ts | Unit tests for PHI storage CRUD operations |

## External References
- MMKV Synchronous API: https://github.com/mrousavy/react-native-mmkv#usage
- iOS iCloud Backup: https://developer.apple.com/documentation/foundation/optimizing_your_app_s_data_for_icloud_backup
- Android Auto Backup: https://developer.android.com/guide/topics/data/autobackup
- React Native Performance Monitoring: https://reactnative.dev/docs/performance

## Build Commands
```bash
# Run tests
npm test -- __tests__/storage/PHIStorage.test.ts

# Build iOS with backup enabled
npx react-native run-ios

# Build Android with backup enabled
npx react-native run-android

# Test backup on iOS simulator
xcrun simctl spawn booted defaults read com.pathlite.app

# Test backup on Android emulator
adb shell bmgr backupnow com.pathlite
```

## Implementation Validation Strategy
- [x] Unit tests pass for all CRUD operations (set, get, delete, getAllKeys)
- [x] Performance tests verify <500ms latency for all operations
- [x] Integration tests verify encryption is maintained during backup/restore
- [x] **[Mobile Tasks]** Headless platform compilation succeeds
- [x] **[Mobile Tasks]** Native dependency linking verified
- [x] **[Mobile Tasks]** iOS Info.plist includes iCloud backup configuration
- [x] **[Mobile Tasks]** Android AndroidManifest.xml includes Auto Backup configuration
- [x] Storage size monitoring works correctly
- [x] Quota exceeded scenarios are handled gracefully

## Implementation Checklist
- [x] Implement PHIStorage.set(key: string, value: any): void method with JSON serialization
- [x] Implement PHIStorage.get(key: string): any | undefined method with JSON deserialization
- [x] Implement PHIStorage.delete(key: string): void method
- [x] Implement PHIStorage.getAllKeys(): string[] method
- [x] Add performance monitoring wrapper to measure operation latency
- [x] Create PHIData.ts with Patient, TreatmentSession, User, Hospital interfaces
- [x] Create PHIStorageService.ts with type-safe methods: savePatient(), getPatient(), etc.
- [x] Configure iOS Info.plist: Add UIFileSharingEnabled=NO, LSSupportsOpeningDocumentsInPlace=NO
- [x] Configure iOS Info.plist: Ensure MMKV directory is NOT excluded from backup
- [x] Configure Android AndroidManifest.xml: Set android:allowBackup="true"
- [x] Create backup_rules.xml to include MMKV storage directory path
- [x] Implement StorageMonitor.ts to track MMKV storage size
- [x] Add quota exceeded error handling with cleanup mechanism for expired session data
- [x] Write unit tests for set() with various data types (string, number, object, array)
- [x] Write unit tests for get() with missing keys (should return undefined)
- [x] Write unit tests for delete() and verify key removal
- [x] Write unit tests for getAllKeys() and verify key listing
- [x] Write performance tests asserting <500ms for all operations
- [ ] **[Mobile Tasks - MANDATORY]** Verify iOS build with iCloud backup enabled
- [ ] **[Mobile Tasks - MANDATORY]** Verify Android build with Auto Backup enabled
- [ ] **[Mobile Tasks - MANDATORY]** Test backup/restore on iOS simulator and verify encryption
- [ ] **[Mobile Tasks - MANDATORY]** Test backup/restore on Android emulator and verify encryption
