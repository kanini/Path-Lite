import RNFS from 'react-native-fs';

export class StorageSizeChecker {
  static async checkAvailableSpace(requiredBytes: number): Promise<boolean> {
    try {
      const fsInfo = await RNFS.getFSInfo();
      const availableSpace = fsInfo.freeSpace;
      
      return availableSpace > requiredBytes;
    } catch (error) {
      console.error('Failed to check available storage space:', error);
      return false;
    }
  }

  static shouldChunkExport(recordCount: number, estimatedSizeBytes: number): boolean {
    const MAX_RECORDS = 1000;
    const MAX_SIZE_BYTES = 10 * 1024 * 1024;
    
    return recordCount > MAX_RECORDS || estimatedSizeBytes > MAX_SIZE_BYTES;
  }

  static estimateJSONSize(data: any): number {
    const jsonString = JSON.stringify(data);
    return new Blob([jsonString]).size;
  }

  static chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    
    return chunks;
  }
}
