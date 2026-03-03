import { MMKV } from 'react-native-mmkv';
import * as Keychain from 'react-native-keychain';
import { KeychainManager } from './KeychainManager';
import { StorageErrorCode } from './types';
import type { User } from '../types/auth';

const KEYCHAIN_SERVICE_AUTH = 'com.pathlite.auth';
const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

export class AuthStorage {
  private static instance: MMKV | null = null;

  static async initialize(): Promise<MMKV> {
    if (this.instance) {
      return this.instance;
    }

    try {
      const encryptionKey = await KeychainManager.getOrCreateEncryptionKey('phi');
      
      this.instance = new MMKV({
        id: 'auth_storage',
        encryptionKey,
      });

      return this.instance;
    } catch (error) {
      throw {
        code: StorageErrorCode.INITIALIZATION_FAILED,
        message: 'Failed to initialize auth storage',
        originalError: error as Error,
      };
    }
  }

  static async saveToken(token: string): Promise<void> {
    try {
      await Keychain.setGenericPassword('auth_token', token, {
        service: KEYCHAIN_SERVICE_AUTH,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
      });
    } catch (error) {
      throw {
        code: StorageErrorCode.KEYCHAIN_ACCESS_FAILED,
        message: 'Failed to save auth token',
        originalError: error as Error,
      };
    }
  }

  static async getToken(): Promise<string | null> {
    try {
      const credentials = await Keychain.getGenericPassword({ 
        service: KEYCHAIN_SERVICE_AUTH 
      });
      
      if (credentials && credentials.password) {
        return credentials.password;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to retrieve auth token:', error);
      return null;
    }
  }

  static async saveUser(user: User): Promise<void> {
    try {
      const storage = await this.initialize();
      storage.set(AUTH_USER_KEY, JSON.stringify(user));
    } catch (error) {
      throw {
        code: StorageErrorCode.INVALID_DATA,
        message: 'Failed to save user data',
        originalError: error as Error,
      };
    }
  }

  static async getUser(): Promise<User | null> {
    try {
      const storage = await this.initialize();
      const userData = storage.getString(AUTH_USER_KEY);
      
      if (userData) {
        return JSON.parse(userData) as User;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to retrieve user data:', error);
      return null;
    }
  }

  static async clearAuth(): Promise<void> {
    try {
      await Keychain.resetGenericPassword({ service: KEYCHAIN_SERVICE_AUTH });
      
      if (this.instance) {
        this.instance.delete(AUTH_USER_KEY);
      }
    } catch (error) {
      console.error('Failed to clear auth data:', error);
    }
  }

  static async hasStoredAuth(): Promise<boolean> {
    try {
      const token = await this.getToken();
      const user = await this.getUser();
      return !!(token && user);
    } catch (error) {
      return false;
    }
  }
}
