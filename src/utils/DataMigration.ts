import { PHIStorage } from '../storage/PHIStorage';
import { AuditStorage } from '../storage/AuditStorage';
import { ModelSerializer } from './ModelSerializer';
import { SchemaValidator } from './SchemaValidator';

export interface MigrationResult {
  success: boolean;
  migratedCount: number;
  failedCount: number;
  errors: string[];
}

export class DataMigration {
  private phiStorage: PHIStorage;
  private auditStorage: AuditStorage;

  constructor(phiStorage: PHIStorage, auditStorage: AuditStorage) {
    this.phiStorage = phiStorage;
    this.auditStorage = auditStorage;
  }

  async migrateData(oldVersion: string, newVersion: string): Promise<MigrationResult> {
    const result: MigrationResult = {
      success: true,
      migratedCount: 0,
      failedCount: 0,
      errors: [],
    };

    try {
      console.log(`Starting data migration from ${oldVersion} to ${newVersion}`);

      const keys = this.phiStorage.getAllKeys();
      
      for (const key of keys) {
        try {
          const data = this.phiStorage.get(key);
          
          if (!data || typeof data !== 'object') {
            continue;
          }

          if (!data.schemaVersion) {
            continue;
          }

          if (data.schemaVersion === oldVersion) {
            const migratedData = this.performMigration(data, oldVersion, newVersion);
            
            if (migratedData) {
              const serialized = ModelSerializer.serialize(migratedData);
              this.phiStorage.set(key, serialized);
              result.migratedCount++;
            } else {
              result.failedCount++;
              result.errors.push(`Failed to migrate key: ${key}`);
            }
          }
        } catch (error) {
          result.failedCount++;
          result.errors.push(`Error migrating key ${key}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      if (result.failedCount > 0) {
        result.success = false;
      }

      console.log(`Migration complete: ${result.migratedCount} migrated, ${result.failedCount} failed`);
      
      return result;
    } catch (error) {
      console.error('Migration failed:', error);
      result.success = false;
      result.errors.push(`Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return result;
    }
  }

  private performMigration(data: any, oldVersion: string, newVersion: string): any | null {
    const migratedData = { ...data };
    migratedData.schemaVersion = newVersion;

    if (oldVersion === '1.0.0' && newVersion === '1.1.0') {
      return migratedData;
    }

    return migratedData;
  }

  async validateSchemaVersions(): Promise<{ valid: boolean; invalidKeys: string[] }> {
    const invalidKeys: string[] = [];
    const keys = this.phiStorage.getAllKeys();

    for (const key of keys) {
      const data = this.phiStorage.get(key);
      
      if (data && typeof data === 'object' && data.schemaVersion) {
        if (!SchemaValidator.isValidSchemaVersion(data.schemaVersion)) {
          invalidKeys.push(key);
        }
      }
    }

    return {
      valid: invalidKeys.length === 0,
      invalidKeys,
    };
  }

  async backupData(): Promise<Record<string, any>> {
    const backup: Record<string, any> = {};
    const keys = this.phiStorage.getAllKeys();

    for (const key of keys) {
      backup[key] = this.phiStorage.get(key);
    }

    return backup;
  }

  async restoreData(backup: Record<string, any>): Promise<void> {
    for (const [key, value] of Object.entries(backup)) {
      this.phiStorage.set(key, value);
    }
  }
}
