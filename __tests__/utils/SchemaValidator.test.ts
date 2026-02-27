import { SchemaValidator } from '../../src/utils/SchemaValidator';

describe('SchemaValidator', () => {
  describe('validateJSON', () => {
    it('should return true for valid JSON string', () => {
      const validJson = '{"name": "test", "value": 123}';
      expect(SchemaValidator.validateJSON(validJson)).toBe(true);
    });

    it('should return false for invalid JSON string', () => {
      const invalidJson = '{ invalid json }';
      expect(SchemaValidator.validateJSON(invalidJson)).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(SchemaValidator.validateJSON('')).toBe(false);
    });

    it('should return false for non-string input', () => {
      expect(SchemaValidator.validateJSON(null as any)).toBe(false);
      expect(SchemaValidator.validateJSON(undefined as any)).toBe(false);
    });
  });

  describe('checkSchemaVersion', () => {
    it('should return true for matching schema version', () => {
      const data = { schemaVersion: '1.0.0', name: 'test' };
      expect(SchemaValidator.checkSchemaVersion(data, '1.0.0')).toBe(true);
    });

    it('should return false for mismatched schema version', () => {
      const data = { schemaVersion: '1.0.0', name: 'test' };
      expect(SchemaValidator.checkSchemaVersion(data, '2.0.0')).toBe(false);
    });

    it('should return false for missing schema version', () => {
      const data = { name: 'test' };
      expect(SchemaValidator.checkSchemaVersion(data, '1.0.0')).toBe(false);
    });

    it('should return false for invalid data object', () => {
      expect(SchemaValidator.checkSchemaVersion(null, '1.0.0')).toBe(false);
      expect(SchemaValidator.checkSchemaVersion(undefined, '1.0.0')).toBe(false);
    });
  });

  describe('isValidSchemaVersion', () => {
    it('should return true for valid semantic version', () => {
      expect(SchemaValidator.isValidSchemaVersion('1.0.0')).toBe(true);
      expect(SchemaValidator.isValidSchemaVersion('2.5.3')).toBe(true);
      expect(SchemaValidator.isValidSchemaVersion('10.20.30')).toBe(true);
    });

    it('should return false for invalid version format', () => {
      expect(SchemaValidator.isValidSchemaVersion('1.0')).toBe(false);
      expect(SchemaValidator.isValidSchemaVersion('v1.0.0')).toBe(false);
      expect(SchemaValidator.isValidSchemaVersion('1.0.0-beta')).toBe(false);
      expect(SchemaValidator.isValidSchemaVersion('invalid')).toBe(false);
    });
  });
});
