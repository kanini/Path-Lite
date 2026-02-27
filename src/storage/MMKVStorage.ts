import { MMKV } from 'react-native-mmkv';
import { KeychainManager } from './KeychainManager';
import { StorageErrorCode } from './types';

export class MMKVStorage {
  private static phiInstance: MMKV | null = null;
  private static auditInstance: MMKV | null = null;

  static async initializePHIStorage(): Promise<MMKV> {
    if (this.phiInstance) {
      return this.phiInstance;
    }

    try {
      const encryptionKey = await KeychainManager.getOrCreateEncryptionKey('phi');
      
      this.phiInstance = new MMKV({
        id: 'phi_storage',
        encryptionKey,
      });

      return this.phiInstance;
    } catch (error) {
      throw {
        code: StorageErrorCode.INITIALIZATION_FAILED,
        message: 'Failed to initialize PHI storage',
        originalError: error as Error,
      };
    }
  }

  static async initializeAuditStorage(): Promise<MMKV> {
    if (this.auditInstance) {
      return this.auditInstance;
    }

    try {
      const encryptionKey = await KeychainManager.getOrCreateEncryptionKey('audit');
      
      this.auditInstance = new MMKV({
        id: 'audit_storage',
        encryptionKey,
      });

      return this.auditInstance;
    } catch (error) {
      throw {
        code: StorageErrorCode.INITIALIZATION_FAILED,
        message: 'Failed to initialize audit storage',
        originalError: error as Error,
      };
    }
  }

  static getPHIInstance(): MMKV | null {
    return this.phiInstance;
  }

  static getAuditInstance(): MMKV | null {
    return this.auditInstance;
  }

  static async resetPHIStorage(): Promise<void> {
    if (this.phiInstance) {
      this.phiInstance.clearAll();
      this.phiInstance = null;
    }
    await KeychainManager.resetEncryptionKey('phi');
  }

  static async resetAuditStorage(): Promise<void> {
    if (this.auditInstance) {
      this.auditInstance.clearAll();
      this.auditInstance = null;
    }
    await KeychainManager.resetEncryptionKey('audit');
  }
}
