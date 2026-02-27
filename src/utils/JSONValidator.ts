export class JSONValidator {
  static validateExportStructure(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      
      if (!parsed.metadata || !parsed.data) {
        return false;
      }
      
      const { metadata } = parsed;
      
      if (
        typeof metadata.schemaVersion !== 'string' ||
        typeof metadata.exportTimestamp !== 'string' ||
        typeof metadata.recordCount !== 'number' ||
        typeof metadata.exportType !== 'string'
      ) {
        return false;
      }
      
      if (!Array.isArray(parsed.data)) {
        return false;
      }
      
      return true;
    } catch (error) {
      return false;
    }
  }

  static validateJSON(jsonString: string): boolean {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }
}
