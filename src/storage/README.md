# MMKV Storage Implementation

This directory contains the encrypted local storage implementation for PATH Lite using MMKV with AES-256 encryption.

## Overview

The storage system provides two separate encrypted MMKV instances:
- **PHI Storage**: For mock patient health information (demographics, treatment sessions)
- **Audit Storage**: For compliance audit logs with 6-year retention policy

## Architecture

### Encryption Key Management
- **KeychainManager**: Manages AES-256 encryption keys using iOS Keychain and Android Keystore
- Keys are generated once and stored securely in device keychain
- Separate encryption keys for PHI and audit storage instances

### Storage Components

#### MMKVStorage
Factory service for initializing encrypted MMKV instances.
- `initializePHIStorage()`: Creates encrypted PHI storage instance
- `initializeAuditStorage()`: Creates encrypted audit storage instance
- `resetPHIStorage()`: Clears PHI data and resets encryption key
- `resetAuditStorage()`: Clears audit data and resets encryption key

#### PHIStorage
Low-level storage wrapper with synchronous CRUD operations.
- `set(key, value)`: Store any data type (string, number, boolean, object)
- `get(key)`: Retrieve data with automatic type detection
- `delete(key)`: Remove key from storage
- `getAllKeys()`: List all stored keys
- Performance monitoring: All operations complete within 500ms

#### PHIStorageService
High-level service for type-safe PHI data operations.
- `savePatient(patient)`: Store patient demographics
- `getPatient(mrn)`: Retrieve patient by MRN
- `saveTreatmentSession(session)`: Store treatment session
- `getTreatmentSession(sessionId)`: Retrieve session
- `getIncompleteSessions()`: Find sessions needing completion

#### AuditStorage
Storage wrapper for audit log operations.
- `logEntry(auditLog)`: Store audit log entry
- `getLogsByDateRange(start, end)`: Query logs by date
- `getAllLogs()`: Retrieve all audit logs
- `deleteLog(logId)`: Remove specific log

#### AuditStorageService
High-level service for audit logging.
- `logUserAction(userId, action)`: Log login/logout
- `logDataModification(userId, actionType, ...)`: Log CRUD operations
- `logValidationFailure(userId, field, ...)`: Log validation errors
- `logAIInteraction(userId, question, ...)`: Log AI conversations

#### RetentionPolicyManager
Manages 6-year (2190 days) retention policy for audit logs.
- `isExpired(log)`: Check if log exceeds retention period
- `getDaysUntilExpiration(log)`: Calculate remaining retention time
- `filterExpiredLogs(logs)`: Get logs ready for deletion
- `getRetentionSummary(logs)`: Statistics on retention status

#### StorageCleanupService
Automated cleanup for expired data.
- `cleanupExpiredSessions(phiStorage)`: Delete incomplete sessions >24 hours old
- `cleanupExpiredAuditLogs(auditStorage)`: Delete logs >6 years old
- `performFullCleanup(phi, audit)`: Run both cleanup operations
- `cleanupIfQuotaExceeded(phi, audit)`: Automatic cleanup when quota exceeded

#### StorageMonitor
Storage size monitoring and quota management.
- `getMetrics(storage)`: Get size, key count, average key size
- `isQuotaExceeded(storage)`: Check if storage exceeds 50MB limit
- `isNearQuota(storage)`: Check if storage exceeds 80% threshold
- `getUsagePercentage(storage)`: Calculate storage usage percentage

## Data Loss Scenarios

### Encryption Key Loss
If encryption keys are lost from device keychain (e.g., device reset, keychain corruption):
- **All encrypted data becomes permanently unrecoverable**
- User must clear app data and start fresh
- Prevention: Keys are automatically backed up with device backup (iOS iCloud, Android Auto Backup)

### Storage Quota Exceeded
If storage exceeds 50MB limit:
- Automatic cleanup is triggered for expired sessions and logs
- If cleanup insufficient, new writes will fail
- Prevention: Regular cleanup and monitoring

## Backup Configuration

### iOS (iCloud Backup)
- MMKV storage directories included in iCloud backup
- Encryption maintained during backup/restore
- Keychain keys backed up separately by iOS
- Configuration: `ios/PathLite/Info.plist`

### Android (Auto Backup)
- MMKV storage directories included in Auto Backup
- Encryption maintained during backup/restore
- Keystore keys backed up by Android Backup Service
- Configuration: `android/app/src/main/res/xml/backup_rules.xml`

## Performance Requirements

All storage operations must complete within 500ms:
- ✅ `set()`: Synchronous write
- ✅ `get()`: Synchronous read with type detection
- ✅ `delete()`: Synchronous deletion
- ✅ `getAllKeys()`: Key enumeration

Performance is monitored automatically and warnings logged if threshold exceeded.

## Usage Example

```typescript
import { PHIStorageService } from './storage/PHIStorageService';
import { AuditStorageService } from './storage/AuditStorageService';

// Initialize services
const phiService = new PHIStorageService();
const auditService = new AuditStorageService();

await phiService.initialize();
await auditService.initialize();

// Save patient data
const patient: Patient = {
  mrn: 'MRN-12345',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1980-01-15',
  gender: 'Male',
  treatmentLocation: 'ICU-CCU',
  roomNumber: '301',
};

phiService.savePatient(patient);

// Log the action
auditService.logDataModification(
  'user-123',
  'CREATE',
  'PATIENT',
  patient.mrn,
  undefined,
  patient
);

// Retrieve patient
const retrievedPatient = phiService.getPatient('MRN-12345');

// Cleanup expired data
import { StorageCleanupService } from './storage/StorageCleanupService';

const result = await StorageCleanupService.performFullCleanup(
  phiService.storage,
  auditService.storage
);

console.log(`Cleaned up ${result.sessionsDeleted} sessions and ${result.logsDeleted} logs`);
```

## Testing

Comprehensive unit tests cover:
- MMKV initialization with encryption
- Keychain key generation and storage
- CRUD operations with performance validation
- Retention policy enforcement
- Cleanup mechanisms
- Storage quota management

Run tests:
```bash
npm test -- __tests__/storage/
```

## Security Considerations

1. **Encryption**: All data encrypted with AES-256
2. **Key Storage**: Encryption keys stored in secure device keychain
3. **Separate Instances**: PHI and audit data use independent encryption keys
4. **Backup Security**: Encryption maintained during device backups
5. **Data Isolation**: Each storage instance isolated by unique ID

## Dependencies

- `react-native-mmkv@^2.12.2`: Fast, encrypted key-value storage
- `react-native-keychain@^8.1.2`: Secure keychain access for encryption keys
