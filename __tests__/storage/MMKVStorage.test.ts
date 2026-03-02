import { MMKVStorage } from '../../src/storage/MMKVStorage';
import { KeychainManager } from '../../src/storage/KeychainManager';
import { MMKV } from 'react-native-mmkv';

jest.mock('react-native-mmkv');
jest.mock('../../src/storage/KeychainManager');

describe('MMKVStorage', () => {
  let mockClearAll: jest.Mock;
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset singleton instances
    (MMKVStorage as any).phiInstance = null;
    (MMKVStorage as any).auditInstance = null;
    
    // Setup MMKV mock
    mockClearAll = jest.fn();
    (MMKV as jest.Mock).mockImplementation(() => ({
      clearAll: mockClearAll,
      set: jest.fn(),
      getString: jest.fn(),
      delete: jest.fn(),
      getAllKeys: jest.fn(() => []),
    }));
  });

  describe('initializePHIStorage', () => {
    it('should initialize PHI storage with encryption key from keychain', async () => {
      const mockEncryptionKey = 'test-encryption-key-phi';
      (KeychainManager.getOrCreateEncryptionKey as jest.Mock).mockResolvedValue(mockEncryptionKey);

      const storage = await MMKVStorage.initializePHIStorage();

      expect(KeychainManager.getOrCreateEncryptionKey).toHaveBeenCalledWith('phi');
      expect(MMKV).toHaveBeenCalledWith({
        id: 'phi_storage',
        encryptionKey: mockEncryptionKey,
      });
      expect(storage).toBeDefined();
    });

    it('should return existing instance if already initialized', async () => {
      const mockEncryptionKey = 'test-encryption-key-phi';
      (KeychainManager.getOrCreateEncryptionKey as jest.Mock).mockResolvedValue(mockEncryptionKey);

      const storage1 = await MMKVStorage.initializePHIStorage();
      const storage2 = await MMKVStorage.initializePHIStorage();

      expect(storage1).toBe(storage2);
      expect(KeychainManager.getOrCreateEncryptionKey).toHaveBeenCalledTimes(1);
    });

    it('should throw error if keychain access fails', async () => {
      const error = {
        code: 'KEYCHAIN_ACCESS_FAILED',
        message: 'Failed to access keychain',
      };
      (KeychainManager.getOrCreateEncryptionKey as jest.Mock).mockRejectedValue(error);

      await expect(MMKVStorage.initializePHIStorage()).rejects.toMatchObject({
        code: 'INITIALIZATION_FAILED',
        message: 'Failed to initialize PHI storage',
      });
    });
  });

  describe('initializeAuditStorage', () => {
    it('should initialize audit storage with separate encryption key', async () => {
      const mockEncryptionKey = 'test-encryption-key-audit';
      (KeychainManager.getOrCreateEncryptionKey as jest.Mock).mockResolvedValue(mockEncryptionKey);

      const storage = await MMKVStorage.initializeAuditStorage();

      expect(KeychainManager.getOrCreateEncryptionKey).toHaveBeenCalledWith('audit');
      expect(MMKV).toHaveBeenCalledWith({
        id: 'audit_storage',
        encryptionKey: mockEncryptionKey,
      });
      expect(storage).toBeDefined();
    });

    it('should return existing instance if already initialized', async () => {
      const mockEncryptionKey = 'test-encryption-key-audit';
      (KeychainManager.getOrCreateEncryptionKey as jest.Mock).mockResolvedValue(mockEncryptionKey);

      const storage1 = await MMKVStorage.initializeAuditStorage();
      const storage2 = await MMKVStorage.initializeAuditStorage();

      expect(storage1).toBe(storage2);
      expect(KeychainManager.getOrCreateEncryptionKey).toHaveBeenCalledTimes(1);
    });
  });

  describe('resetPHIStorage', () => {
    it('should clear all data and reset encryption key', async () => {
      const mockEncryptionKey = 'test-encryption-key-phi';
      (KeychainManager.getOrCreateEncryptionKey as jest.Mock).mockResolvedValue(mockEncryptionKey);

      await MMKVStorage.initializePHIStorage();
      await MMKVStorage.resetPHIStorage();

      expect(mockClearAll).toHaveBeenCalled();
      expect(KeychainManager.resetEncryptionKey).toHaveBeenCalledWith('phi');
    });
  });

  describe('resetAuditStorage', () => {
    it('should clear all data and reset encryption key', async () => {
      const mockEncryptionKey = 'test-encryption-key-audit';
      (KeychainManager.getOrCreateEncryptionKey as jest.Mock).mockResolvedValue(mockEncryptionKey);

      await MMKVStorage.initializeAuditStorage();
      await MMKVStorage.resetAuditStorage();

      expect(mockClearAll).toHaveBeenCalled();
      expect(KeychainManager.resetEncryptionKey).toHaveBeenCalledWith('audit');
    });
  });
});
