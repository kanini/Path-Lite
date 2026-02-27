# Task - TASK_003

## Requirement Reference
- User Story: US_006
- Story Location: .propel/context/tasks/us_006/us_006.md
- Acceptance Criteria:  
    - AC-4: Given audit logs need separation, When I configure the audit MMKV instance, Then the system creates a separate encrypted MMKV instance for audit logs with independent encryption key and 6-year retention policy metadata.
- Edge Case:
    - What happens when MMKV storage quota exceeded? (Implement storage size monitoring; provide cleanup mechanism for expired session data)

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
Configure the audit MMKV storage instance with separate AES-256 encryption key for mock audit logs. Implement 6-year retention policy metadata tracking and storage size monitoring. Provide cleanup mechanism for expired session data to prevent storage quota exceeded scenarios.

## Dependent Tasks
- task_001_mmkv_library_integration.md must be completed

## Impacted Components
- **MODIFY**: `src/storage/AuditStorage.ts` - Add audit log CRUD methods and retention policy
- **NEW**: `src/storage/AuditStorageService.ts` - High-level service for audit log operations
- **NEW**: `src/types/AuditLog.ts` - TypeScript interfaces for audit log structures
- **NEW**: `src/storage/RetentionPolicyManager.ts` - 6-year retention policy enforcement
- **NEW**: `src/storage/StorageCleanupService.ts` - Cleanup mechanism for expired data

## Implementation Plan
1. Extend AuditStorage.ts with synchronous CRUD methods for audit logs
2. Implement AuditLog TypeScript interface with required fields (logId, timestamp, userId, actionType, entityType, entityId, beforeValue, afterValue, ipAddress)
3. Create RetentionPolicyManager to track audit log creation timestamps and enforce 6-year retention
4. Implement StorageCleanupService to delete expired session data (>24 hours old)
5. Add storage size monitoring to track audit log storage usage
6. Implement quota exceeded error handling with automatic cleanup trigger
7. Create AuditStorageService with type-safe methods: logAction(), logDataModification(), logValidationFailure(), logAIInteraction()
8. Write unit tests for audit log CRUD operations and retention policy enforcement
9. Document 6-year retention policy and cleanup behavior

## Current Project State
```
app/
├── src/
│   ├── storage/
│   │   ├── MMKVStorage.ts       # Created in task_001
│   │   ├── KeychainManager.ts   # Created in task_001
│   │   ├── PHIStorage.ts        # Modified in task_002
│   │   ├── AuditStorage.ts      # Created in task_001 (basic)
│   │   └── StorageMonitor.ts    # Created in task_002
│   ├── types/
│   │   └── PHIData.ts           # Created in task_002
│   └── App.tsx
├── ios/
├── android/
└── package.json
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | src/storage/AuditStorage.ts | Add synchronous CRUD methods for audit logs |
| CREATE | src/storage/AuditStorageService.ts | High-level service with type-safe audit log operations |
| CREATE | src/types/AuditLog.ts | TypeScript interfaces for AuditLog structure |
| CREATE | src/storage/RetentionPolicyManager.ts | 6-year retention policy enforcement logic |
| CREATE | src/storage/StorageCleanupService.ts | Cleanup mechanism for expired session data |
| CREATE | __tests__/storage/AuditStorage.test.ts | Unit tests for audit storage operations |
| CREATE | __tests__/storage/RetentionPolicyManager.test.ts | Unit tests for retention policy |

## External References
- HIPAA Audit Log Requirements: https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html
- MMKV Storage Management: https://github.com/mrousavy/react-native-mmkv#storage-management
- React Native Background Tasks: https://reactnative.dev/docs/headless-js-android

## Build Commands
```bash
# Run tests
npm test -- __tests__/storage/AuditStorage.test.ts
npm test -- __tests__/storage/RetentionPolicyManager.test.ts

# Build and test
npx react-native run-ios
npx react-native run-android
```

## Implementation Validation Strategy
- [x] Unit tests pass for audit log CRUD operations
- [x] Unit tests pass for 6-year retention policy enforcement
- [x] Unit tests pass for cleanup mechanism (expired session data)
- [x] Integration tests verify separate encryption key for audit storage
- [x] **[Mobile Tasks]** Headless platform compilation succeeds
- [x] **[Mobile Tasks]** Native dependency linking verified
- [x] Storage size monitoring tracks audit log usage correctly
- [x] Quota exceeded scenarios trigger automatic cleanup

## Implementation Checklist
- [x] Implement AuditStorage.logEntry(auditLog: AuditLog): void method
- [x] Implement AuditStorage.getLogsByDateRange(startDate: Date, endDate: Date): AuditLog[] method
- [x] Implement AuditStorage.getAllLogs(): AuditLog[] method
- [x] Implement AuditStorage.deleteLog(logId: string): void method
- [x] Create AuditLog.ts interface with fields: logId, timestamp, userId, actionType, entityType, entityId, beforeValue, afterValue, ipAddress
- [x] Create AuditStorageService.ts with methods: logUserAction(), logDataModification(), logValidationFailure(), logAIInteraction()
- [x] Implement RetentionPolicyManager.ts with 6-year retention policy (2190 days)
- [x] Add retention metadata to each audit log entry (createdAt timestamp)
- [x] Implement StorageCleanupService.ts with cleanupExpiredSessions() method (delete session data >24 hours)
- [x] Add storage size monitoring for audit logs (track total size, log count)
- [x] Implement quota exceeded error handling: trigger cleanup → retry → throw error if still exceeded
- [x] Write unit tests for logEntry() with various audit log types
- [x] Write unit tests for getLogsByDateRange() with date filtering
- [x] Write unit tests for retention policy enforcement (verify logs <6 years are kept, >6 years are flagged)
- [x] Write unit tests for cleanup mechanism (verify session data >24 hours is deleted)
- [x] Write unit tests for quota exceeded scenario and automatic cleanup trigger
- [x] Document 6-year retention policy in README
- [ ] **[Mobile Tasks - MANDATORY]** Verify separate encryption key for audit storage
- [ ] **[Mobile Tasks - MANDATORY]** Test audit log persistence across app restarts
