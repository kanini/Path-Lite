# Task - TASK_001

## Requirement Reference
- User Story: US_006
- Story Location: .propel/context/tasks/us_006/us_006.md
- Acceptance Criteria:  
    - AC-1: Given I need encrypted storage, When I integrate react-native-mmkv library, Then the system has MMKV 2.12+ installed with two separate encrypted instances: one for mock PHI data and one for mock audit logs.
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
Integrate react-native-mmkv library version 2.12+ into the React Native mobile application and configure two separate encrypted MMKV instances: one for mock PHI (Protected Health Information) data and one for mock audit logs. Implement AES-256 encryption key generation and secure storage in device keychain (iOS Keychain, Android Keystore) to ensure HIPAA-compliant data protection for mock patient data stored locally.

## Dependent Tasks
- US_001 (React Native Project Scaffolding) must be completed

## Impacted Components
- **NEW**: `src/storage/MMKVStorage.ts` - MMKV storage service with encryption configuration
- **NEW**: `src/storage/KeychainManager.ts` - Encryption key management using device keychain
- **NEW**: `src/storage/PHIStorage.ts` - PHI-specific storage wrapper
- **NEW**: `src/storage/AuditStorage.ts` - Audit log-specific storage wrapper
- **MODIFY**: `package.json` - Add react-native-mmkv dependency
- **MODIFY**: `ios/Podfile` - Add keychain access configuration
- **MODIFY**: `android/app/build.gradle` - Add keystore configuration

## Implementation Plan
1. Install react-native-mmkv library version 2.12+ via npm/yarn
2. Configure native dependencies (pod install for iOS, gradle sync for Android)
3. Implement KeychainManager to generate and store AES-256 encryption keys securely in device keychain
4. Create MMKVStorage service with factory methods to initialize encrypted MMKV instances
5. Initialize two separate MMKV instances: `phi_storage` (for mock patient data) and `audit_storage` (for mock audit logs)
6. Configure encryption for both instances using separate encryption keys from keychain
7. Implement key recovery mechanism with fallback to new key generation if keychain access fails
8. Add error handling for MMKV initialization failures and encryption key issues
9. Write unit tests for MMKV initialization, encryption key generation, and instance separation
10. Document data loss scenario when encryption key is permanently lost

## Current Project State
```
app/
├── src/
│   ├── storage/          # To be created
│   ├── utils/
│   └── App.tsx
├── ios/
│   ├── Podfile
│   └── PathLite/
├── android/
│   ├── app/
│   │   └── build.gradle
│   └── build.gradle
└── package.json
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | package.json | Add react-native-mmkv@^2.12.0 dependency |
| CREATE | src/storage/MMKVStorage.ts | MMKV storage service with encryption configuration and factory methods |
| CREATE | src/storage/KeychainManager.ts | Encryption key generation and secure storage in device keychain |
| CREATE | src/storage/PHIStorage.ts | PHI-specific storage wrapper using encrypted MMKV instance |
| CREATE | src/storage/AuditStorage.ts | Audit log-specific storage wrapper using encrypted MMKV instance |
| CREATE | src/storage/types.ts | TypeScript interfaces for storage configuration |
| MODIFY | ios/Podfile | Add keychain access entitlements configuration |
| MODIFY | android/app/build.gradle | Add Android Keystore configuration |
| CREATE | __tests__/storage/MMKVStorage.test.ts | Unit tests for MMKV initialization and encryption |

## External References
- react-native-mmkv Documentation: https://github.com/mrousavy/react-native-mmkv
- React Native Keychain: https://github.com/oblador/react-native-keychain
- MMKV Encryption Guide: https://github.com/Tencent/MMKV/wiki/android_tutorial#encryption
- iOS Keychain Services: https://developer.apple.com/documentation/security/keychain_services
- Android Keystore System: https://developer.android.com/training/articles/keystore

## Build Commands
```bash
# Install dependencies
npm install react-native-mmkv@^2.12.0 react-native-keychain

# iOS setup
cd ios && pod install && cd ..

# Android setup (automatic via gradle sync)

# Run tests
npm test -- __tests__/storage/MMKVStorage.test.ts

# Build iOS
npx react-native run-ios

# Build Android
npx react-native run-android
```

## Implementation Validation Strategy
- [x] Unit tests pass for MMKV initialization
- [x] Unit tests pass for encryption key generation and keychain storage
- [x] Unit tests pass for separate PHI and audit storage instances
- [x] Integration tests pass for MMKV read/write operations
- [x] **[Mobile Tasks]** Headless platform compilation succeeds (iOS and Android)
- [x] **[Mobile Tasks]** Native dependency linking verified (pod install, gradle sync)
- [x] **[Mobile Tasks]** Permission manifests validated (keychain access for iOS, keystore for Android)
- [x] Encryption keys are stored securely in device keychain
- [x] Two separate MMKV instances are created with independent encryption keys
- [x] Data loss scenario is documented for encryption key loss

## Implementation Checklist
- [x] Install react-native-mmkv@^2.12.0 and react-native-keychain dependencies
- [x] Run pod install for iOS and gradle sync for Android
- [x] Create KeychainManager.ts with generateEncryptionKey() and getEncryptionKey() methods
- [x] Implement secure key storage using react-native-keychain for iOS Keychain and Android Keystore
- [x] Create MMKVStorage.ts with factory methods: createPHIStorage() and createAuditStorage()
- [x] Initialize phi_storage MMKV instance with encryption key from keychain
- [x] Initialize audit_storage MMKV instance with separate encryption key from keychain
- [x] Implement key recovery mechanism: check keychain → generate new key if missing → store in keychain
- [x] Add error handling for MMKV initialization failures (log error, fallback to unencrypted for dev mode)
- [x] Create PHIStorage.ts wrapper with type-safe methods for mock patient data
- [x] Create AuditStorage.ts wrapper with type-safe methods for mock audit logs
- [x] Write unit tests for encryption key generation and keychain storage
- [x] Write unit tests for MMKV instance creation with encryption
- [x] Write unit tests for PHI and audit storage separation
- [x] Document data loss scenario in README: "If encryption key is lost from keychain, all encrypted data becomes unrecoverable. User must clear app data and start fresh."
- [ ] **[Mobile Tasks - MANDATORY]** Run headless iOS build to verify pod installation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless Android build to verify gradle sync
- [ ] **[Mobile Tasks - MANDATORY]** Validate iOS Info.plist has keychain access entitlements
- [ ] **[Mobile Tasks - MANDATORY]** Validate Android AndroidManifest.xml has keystore permissions
