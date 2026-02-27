import { StorageSizeChecker } from '../../src/utils/StorageSizeChecker';
import RNFS from 'react-native-fs';

jest.mock('react-native-fs');

describe('StorageSizeChecker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('checkAvailableSpace', () => {
    it('should return true when sufficient storage is available', async () => {
      (RNFS.getFSInfo as jest.Mock).mockResolvedValue({
        freeSpace: 1000000000,
        totalSpace: 2000000000,
      });

      const requiredBytes = 500000000;
      const result = await StorageSizeChecker.checkAvailableSpace(requiredBytes);

      expect(result).toBe(true);
    });

    it('should return false when insufficient storage is available', async () => {
      (RNFS.getFSInfo as jest.Mock).mockResolvedValue({
        freeSpace: 100000000,
        totalSpace: 2000000000,
      });

      const requiredBytes = 500000000;
      const result = await StorageSizeChecker.checkAvailableSpace(requiredBytes);

      expect(result).toBe(false);
    });

    it('should return false when getFSInfo fails', async () => {
      (RNFS.getFSInfo as jest.Mock).mockRejectedValue(new Error('Failed to get FS info'));

      const requiredBytes = 500000000;
      const result = await StorageSizeChecker.checkAvailableSpace(requiredBytes);

      expect(result).toBe(false);
    });
  });

  describe('shouldChunkExport', () => {
    it('should return true when record count exceeds 1000', () => {
      const result = StorageSizeChecker.shouldChunkExport(1500, 5000000);

      expect(result).toBe(true);
    });

    it('should return true when estimated size exceeds 10MB', () => {
      const result = StorageSizeChecker.shouldChunkExport(500, 11 * 1024 * 1024);

      expect(result).toBe(true);
    });

    it('should return false when both conditions are not met', () => {
      const result = StorageSizeChecker.shouldChunkExport(500, 5 * 1024 * 1024);

      expect(result).toBe(false);
    });

    it('should return true when record count is exactly 1001', () => {
      const result = StorageSizeChecker.shouldChunkExport(1001, 1000000);

      expect(result).toBe(true);
    });

    it('should return false when record count is exactly 1000', () => {
      const result = StorageSizeChecker.shouldChunkExport(1000, 1000000);

      expect(result).toBe(false);
    });
  });

  describe('chunkArray', () => {
    it('should split array into chunks of specified size', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const chunks = StorageSizeChecker.chunkArray(array, 3);

      expect(chunks).toHaveLength(4);
      expect(chunks[0]).toEqual([1, 2, 3]);
      expect(chunks[1]).toEqual([4, 5, 6]);
      expect(chunks[2]).toEqual([7, 8, 9]);
      expect(chunks[3]).toEqual([10]);
    });

    it('should handle empty array', () => {
      const array: number[] = [];
      const chunks = StorageSizeChecker.chunkArray(array, 5);

      expect(chunks).toHaveLength(0);
    });

    it('should return single chunk when array is smaller than chunk size', () => {
      const array = [1, 2, 3];
      const chunks = StorageSizeChecker.chunkArray(array, 10);

      expect(chunks).toHaveLength(1);
      expect(chunks[0]).toEqual([1, 2, 3]);
    });

    it('should handle chunk size of 1', () => {
      const array = [1, 2, 3];
      const chunks = StorageSizeChecker.chunkArray(array, 1);

      expect(chunks).toHaveLength(3);
      expect(chunks[0]).toEqual([1]);
      expect(chunks[1]).toEqual([2]);
      expect(chunks[2]).toEqual([3]);
    });
  });

  describe('estimateJSONSize', () => {
    it('should estimate size of JSON data', () => {
      const data = { key: 'value', number: 123 };
      const size = StorageSizeChecker.estimateJSONSize(data);

      expect(size).toBeGreaterThan(0);
      expect(typeof size).toBe('number');
    });

    it('should return larger size for larger objects', () => {
      const smallData = { key: 'value' };
      const largeData = {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
        nested: {
          data: 'more data',
          array: [1, 2, 3, 4, 5],
        },
      };

      const smallSize = StorageSizeChecker.estimateJSONSize(smallData);
      const largeSize = StorageSizeChecker.estimateJSONSize(largeData);

      expect(largeSize).toBeGreaterThan(smallSize);
    });
  });
});
