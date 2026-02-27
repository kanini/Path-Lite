import { PHIStorage } from '../storage/PHIStorage';
import { TreatmentSession } from '../types/PHIData';
import { DateUtils } from '../utils/DateUtils';

export class DataRetentionService {
  private storage: PHIStorage;
  private readonly RETENTION_HOURS = 24;

  constructor(storage: PHIStorage) {
    this.storage = storage;
  }

  cleanupExpiredSessions(): void {
    const allKeys = this.storage.getAllKeys();
    const sessionKeys = allKeys.filter(key => key.startsWith('session:'));

    let deletedCount = 0;

    sessionKeys.forEach(key => {
      const session = this.storage.get(key) as TreatmentSession;
      
      if (!session) {
        return;
      }

      if (session.status === 'incomplete') {
        const createdAt = new Date(session.createdAt);
        
        if (DateUtils.isOlderThan(createdAt, this.RETENTION_HOURS)) {
          this.storage.delete(key);
          deletedCount++;
        }
      }
    });

    if (deletedCount > 0) {
      console.log(`DataRetentionService: Deleted ${deletedCount} expired InProgress sessions`);
    }
  }

  scheduleCleanup(): void {
    this.cleanupExpiredSessions();
  }
}
