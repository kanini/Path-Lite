import * as Keychain from 'react-native-keychain';
import { StorageErrorCode } from './types';

const KEYCHAIN_SERVICE_PHI = 'com.pathlite.phi.encryption';
const KEYCHAIN_SERVICE_AUDIT = 'com.pathlite.audit.encryption';

export class KeychainManager {
  private static generateRandomKey(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let key = '';
    for (let i = 0; i < length; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  }

  static async getOrCreateEncryptionKey(service: 'phi' | 'audit'): Promise<string> {
    try {
      const serviceName = service === 'phi' ? KEYCHAIN_SERVICE_PHI : KEYCHAIN_SERVICE_AUDIT;
      
      const credentials = await Keychain.getGenericPassword({ service: serviceName });
      
      if (credentials && credentials.password) {
        return credentials.password;
      }
      
      const newKey = this.generateRandomKey(32);
      await Keychain.setGenericPassword('encryption_key', newKey, {
        service: serviceName,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
      });
      
      return newKey;
    } catch (error) {
      throw {
        code: StorageErrorCode.KEYCHAIN_ACCESS_FAILED,
        message: `Failed to access keychain for ${service} storage`,
        originalError: error as Error,
      };
    }
  }

  static async resetEncryptionKey(service: 'phi' | 'audit'): Promise<void> {
    try {
      const serviceName = service === 'phi' ? KEYCHAIN_SERVICE_PHI : KEYCHAIN_SERVICE_AUDIT;
      await Keychain.resetGenericPassword({ service: serviceName });
    } catch (error) {
      throw {
        code: StorageErrorCode.KEYCHAIN_ACCESS_FAILED,
        message: `Failed to reset keychain for ${service} storage`,
        originalError: error as Error,
      };
    }
  }

  static async hasEncryptionKey(service: 'phi' | 'audit'): Promise<boolean> {
    try {
      const serviceName = service === 'phi' ? KEYCHAIN_SERVICE_PHI : KEYCHAIN_SERVICE_AUDIT;
      const credentials = await Keychain.getGenericPassword({ service: serviceName });
      return !!credentials;
    } catch (error) {
      return false;
    }
  }
}
