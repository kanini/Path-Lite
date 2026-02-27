import { DataSeeder } from '../../src/data/DataSeeder';
import { PHIStorage } from '../../src/storage/PHIStorage';
import { MOCK_PATIENTS } from '../../src/data/mockPatients';

jest.mock('../../src/storage/PHIStorage');

describe('DataSeeder', () => {
  let dataSeeder: DataSeeder;
  let mockPHIStorage: jest.Mocked<PHIStorage>;

  beforeEach(() => {
    mockPHIStorage = new PHIStorage() as jest.Mocked<PHIStorage>;
    mockPHIStorage.get = jest.fn();
    mockPHIStorage.set = jest.fn();
    mockPHIStorage.delete = jest.fn();
    mockPHIStorage.getAllKeys = jest.fn();
    
    dataSeeder = new DataSeeder(mockPHIStorage);
  });

  describe('seedMockData', () => {
    it('should seed mock patients when not already seeded', async () => {
      mockPHIStorage.get.mockReturnValue(undefined);

      await dataSeeder.seedMockData();

      expect(mockPHIStorage.set).toHaveBeenCalledWith('data_seeded', true);
      expect(mockPHIStorage.set).toHaveBeenCalledWith('data_seeded_timestamp', expect.any(String));
      expect(mockPHIStorage.set).toHaveBeenCalledTimes(MOCK_PATIENTS.length + 2);
    });

    it('should skip seeding if already seeded', async () => {
      mockPHIStorage.get.mockReturnValue(true);

      await dataSeeder.seedMockData();

      expect(mockPHIStorage.set).not.toHaveBeenCalled();
    });

    it('should seed all mock patients with correct keys', async () => {
      mockPHIStorage.get.mockReturnValue(undefined);

      await dataSeeder.seedMockData();

      MOCK_PATIENTS.forEach(patient => {
        const key = `patient:${patient.mrn}`;
        expect(mockPHIStorage.set).toHaveBeenCalledWith(key, expect.any(String));
      });
    });
  });

  describe('resetMockData', () => {
    it('should delete all patient data and seeding flags', async () => {
      const mockKeys = ['patient:MRN001', 'patient:MRN002', 'other:key'];
      mockPHIStorage.getAllKeys.mockReturnValue(mockKeys);

      await dataSeeder.resetMockData();

      expect(mockPHIStorage.delete).toHaveBeenCalledWith('patient:MRN001');
      expect(mockPHIStorage.delete).toHaveBeenCalledWith('patient:MRN002');
      expect(mockPHIStorage.delete).toHaveBeenCalledWith('data_seeded');
      expect(mockPHIStorage.delete).toHaveBeenCalledWith('data_seeded_timestamp');
      expect(mockPHIStorage.delete).not.toHaveBeenCalledWith('other:key');
    });
  });

  describe('isDataSeeded', () => {
    it('should return true when data is seeded', () => {
      mockPHIStorage.get.mockReturnValue(true);

      expect(dataSeeder.isDataSeeded()).toBe(true);
    });

    it('should return false when data is not seeded', () => {
      mockPHIStorage.get.mockReturnValue(undefined);

      expect(dataSeeder.isDataSeeded()).toBe(false);
    });
  });

  describe('getSeededTimestamp', () => {
    it('should return timestamp when available', () => {
      const timestamp = '2024-02-27T10:00:00.000Z';
      mockPHIStorage.get.mockReturnValue(timestamp);

      expect(dataSeeder.getSeededTimestamp()).toBe(timestamp);
    });

    it('should return null when timestamp not available', () => {
      mockPHIStorage.get.mockReturnValue(undefined);

      expect(dataSeeder.getSeededTimestamp()).toBeNull();
    });
  });
});
