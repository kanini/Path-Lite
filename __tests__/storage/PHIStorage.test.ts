import { PHIStorage } from '../../src/storage/PHIStorage';
import { MMKVStorage } from '../../src/storage/MMKVStorage';
import { MMKV } from 'react-native-mmkv';

jest.mock('../../src/storage/MMKVStorage');
jest.mock('react-native-mmkv');

describe('PHIStorage', () => {
  let phiStorage: PHIStorage;
  let mockMMKV: jest.Mocked<MMKV>;

  beforeEach(async () => {
    mockMMKV = {
      set: jest.fn(),
      getString: jest.fn(),
      getNumber: jest.fn(),
      getBoolean: jest.fn(),
      delete: jest.fn(),
      getAllKeys: jest.fn(),
      contains: jest.fn(),
      clearAll: jest.fn(),
      size: 1024,
    } as any;

    (MMKVStorage.initializePHIStorage as jest.Mock).mockResolvedValue(mockMMKV);

    phiStorage = new PHIStorage();
    await phiStorage.initialize();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('set', () => {
    it('should store string values', () => {
      phiStorage.set('test-key', 'test-value');
      expect(mockMMKV.set).toHaveBeenCalledWith('test-key', 'test-value');
    });

    it('should store number values', () => {
      phiStorage.set('age', 25);
      expect(mockMMKV.set).toHaveBeenCalledWith('age', 25);
    });

    it('should store boolean values', () => {
      phiStorage.set('isActive', true);
      expect(mockMMKV.set).toHaveBeenCalledWith('isActive', true);
    });

    it('should serialize and store object values', () => {
      const obj = { name: 'John', age: 30 };
      phiStorage.set('user', obj);
      expect(mockMMKV.set).toHaveBeenCalledWith('user', JSON.stringify(obj));
    });

    it('should complete within 500ms', () => {
      const startTime = Date.now();
      phiStorage.set('test-key', 'test-value');
      const duration = Date.now() - startTime;
      expect(duration).toBeLessThan(500);
    });

    it('should throw error for unsupported data types', () => {
      expect(() => phiStorage.set('test', undefined as any)).toThrow();
    });
  });

  describe('get', () => {
    it('should retrieve string values', () => {
      mockMMKV.getString.mockReturnValue('test-value');
      const result = phiStorage.get('test-key');
      expect(result).toBe('test-value');
    });

    it('should retrieve number values', () => {
      mockMMKV.getString.mockReturnValue(undefined);
      mockMMKV.getNumber.mockReturnValue(25);
      const result = phiStorage.get('age');
      expect(result).toBe(25);
    });

    it('should retrieve boolean values', () => {
      mockMMKV.getString.mockReturnValue(undefined);
      mockMMKV.getNumber.mockReturnValue(undefined);
      mockMMKV.getBoolean.mockReturnValue(true);
      const result = phiStorage.get('isActive');
      expect(result).toBe(true);
    });

    it('should deserialize object values', () => {
      const obj = { name: 'John', age: 30 };
      mockMMKV.getString.mockReturnValue(JSON.stringify(obj));
      const result = phiStorage.get('user');
      expect(result).toEqual(obj);
    });

    it('should return undefined for missing keys', () => {
      mockMMKV.getString.mockReturnValue(undefined);
      mockMMKV.getNumber.mockReturnValue(undefined);
      mockMMKV.getBoolean.mockReturnValue(undefined);
      const result = phiStorage.get('missing-key');
      expect(result).toBeUndefined();
    });

    it('should complete within 500ms', () => {
      mockMMKV.getString.mockReturnValue('test-value');
      const startTime = Date.now();
      phiStorage.get('test-key');
      const duration = Date.now() - startTime;
      expect(duration).toBeLessThan(500);
    });
  });

  describe('delete', () => {
    it('should delete key from storage', () => {
      phiStorage.delete('test-key');
      expect(mockMMKV.delete).toHaveBeenCalledWith('test-key');
    });

    it('should complete within 500ms', () => {
      const startTime = Date.now();
      phiStorage.delete('test-key');
      const duration = Date.now() - startTime;
      expect(duration).toBeLessThan(500);
    });
  });

  describe('getAllKeys', () => {
    it('should return all keys from storage', () => {
      const keys = ['key1', 'key2', 'key3'];
      mockMMKV.getAllKeys.mockReturnValue(keys);
      const result = phiStorage.getAllKeys();
      expect(result).toEqual(keys);
    });

    it('should complete within 500ms', () => {
      mockMMKV.getAllKeys.mockReturnValue(['key1', 'key2']);
      const startTime = Date.now();
      phiStorage.getAllKeys();
      const duration = Date.now() - startTime;
      expect(duration).toBeLessThan(500);
    });
  });

  describe('contains', () => {
    it('should return true if key exists', () => {
      mockMMKV.contains.mockReturnValue(true);
      const result = phiStorage.contains('test-key');
      expect(result).toBe(true);
    });

    it('should return false if key does not exist', () => {
      mockMMKV.contains.mockReturnValue(false);
      const result = phiStorage.contains('missing-key');
      expect(result).toBe(false);
    });
  });

  describe('getSize', () => {
    it('should return storage size in bytes', () => {
      const result = phiStorage.getSize();
      expect(result).toBe(1024);
    });
  });

  describe('performance monitoring', () => {
    it('should track operation performance', () => {
      phiStorage.set('test-key', 'test-value');
      phiStorage.get('test-key');
      phiStorage.delete('test-key');

      const metrics = phiStorage.getPerformanceMetrics();
      expect(metrics.size).toBeGreaterThan(0);
    });

    it('should warn if operation exceeds 500ms threshold', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      jest.spyOn(Date, 'now')
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(600);
      
      phiStorage.set('test-key', 'test-value');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('exceeds 500ms threshold')
      );
      
      consoleSpy.mockRestore();
    });
  });
});
