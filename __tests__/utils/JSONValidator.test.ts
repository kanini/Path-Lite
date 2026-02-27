import { JSONValidator } from '../../src/utils/JSONValidator';

describe('JSONValidator', () => {
  describe('validateExportStructure', () => {
    it('should return true for valid export structure', () => {
      const validExport = JSON.stringify({
        metadata: {
          schemaVersion: '1.0',
          exportTimestamp: new Date().toISOString(),
          recordCount: 5,
          exportType: 'patients',
        },
        data: [
          { id: 1, name: 'Test 1' },
          { id: 2, name: 'Test 2' },
        ],
      });

      expect(JSONValidator.validateExportStructure(validExport)).toBe(true);
    });

    it('should return false for invalid JSON', () => {
      const invalidJSON = 'not valid json {';
      
      expect(JSONValidator.validateExportStructure(invalidJSON)).toBe(false);
    });

    it('should return false when metadata is missing', () => {
      const missingMetadata = JSON.stringify({
        data: [{ id: 1 }],
      });

      expect(JSONValidator.validateExportStructure(missingMetadata)).toBe(false);
    });

    it('should return false when data is missing', () => {
      const missingData = JSON.stringify({
        metadata: {
          schemaVersion: '1.0',
          exportTimestamp: new Date().toISOString(),
          recordCount: 0,
          exportType: 'patients',
        },
      });

      expect(JSONValidator.validateExportStructure(missingData)).toBe(false);
    });

    it('should return false when data is not an array', () => {
      const dataNotArray = JSON.stringify({
        metadata: {
          schemaVersion: '1.0',
          exportTimestamp: new Date().toISOString(),
          recordCount: 1,
          exportType: 'patients',
        },
        data: { id: 1 },
      });

      expect(JSONValidator.validateExportStructure(dataNotArray)).toBe(false);
    });

    it('should return false when metadata fields have wrong types', () => {
      const wrongTypes = JSON.stringify({
        metadata: {
          schemaVersion: 1.0,
          exportTimestamp: new Date().toISOString(),
          recordCount: '5',
          exportType: 'patients',
        },
        data: [],
      });

      expect(JSONValidator.validateExportStructure(wrongTypes)).toBe(false);
    });
  });

  describe('validateJSON', () => {
    it('should return true for valid JSON string', () => {
      const validJSON = JSON.stringify({ key: 'value' });
      
      expect(JSONValidator.validateJSON(validJSON)).toBe(true);
    });

    it('should return false for invalid JSON string', () => {
      const invalidJSON = '{ key: value }';
      
      expect(JSONValidator.validateJSON(invalidJSON)).toBe(false);
    });

    it('should return true for empty object', () => {
      const emptyObject = JSON.stringify({});
      
      expect(JSONValidator.validateJSON(emptyObject)).toBe(true);
    });

    it('should return true for empty array', () => {
      const emptyArray = JSON.stringify([]);
      
      expect(JSONValidator.validateJSON(emptyArray)).toBe(true);
    });
  });
});
