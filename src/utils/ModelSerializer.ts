export class ModelSerializer {
  static serialize<T>(data: T): string {
    try {
      return JSON.stringify(data);
    } catch (error) {
      console.error('Serialization error:', error);
      throw new Error(`Failed to serialize data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static deserialize<T>(jsonString: string): T | null {
    if (!jsonString || typeof jsonString !== 'string') {
      console.error('Invalid JSON string provided for deserialization');
      return null;
    }

    try {
      const parsed = JSON.parse(jsonString);
      return parsed as T;
    } catch (error) {
      console.error('Deserialization error:', error);
      console.error('Failed JSON string:', jsonString);
      return null;
    }
  }

  static deserializeWithValidation<T>(
    jsonString: string,
    validator?: (data: any) => boolean
  ): T | null {
    const data = this.deserialize<T>(jsonString);
    
    if (data === null) {
      return null;
    }

    if (validator && !validator(data)) {
      console.error('Validation failed for deserialized data');
      return null;
    }

    return data;
  }
}
