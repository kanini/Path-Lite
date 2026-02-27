export class SchemaValidator {
  static validateJSON(jsonString: string): boolean {
    if (!jsonString || typeof jsonString !== 'string') {
      return false;
    }

    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      console.error('Invalid JSON string:', error);
      return false;
    }
  }

  static checkSchemaVersion(data: any, expectedVersion: string): boolean {
    if (!data || typeof data !== 'object') {
      console.error('Invalid data object for schema version check');
      return false;
    }

    if (!data.schemaVersion) {
      console.error('Missing schemaVersion field in data');
      return false;
    }

    if (data.schemaVersion !== expectedVersion) {
      console.warn(
        `Schema version mismatch: expected ${expectedVersion}, got ${data.schemaVersion}`
      );
      return false;
    }

    return true;
  }

  static isValidSchemaVersion(version: string): boolean {
    const versionPattern = /^\d+\.\d+\.\d+$/;
    return versionPattern.test(version);
  }
}
