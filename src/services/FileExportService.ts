import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

export class FileExportService {
  static async saveToDocuments(filename: string, content: string): Promise<string> {
    const documentsPath = Platform.OS === 'ios' 
      ? RNFS.DocumentDirectoryPath 
      : RNFS.ExternalDirectoryPath;
    
    const filePath = `${documentsPath}/${filename}`;
    
    await RNFS.writeFile(filePath, content, 'utf8');
    
    return filePath;
  }

  static async saveChunkedExport(
    baseFilename: string,
    chunks: string[],
  ): Promise<string[]> {
    const filePaths: string[] = [];
    
    for (let i = 0; i < chunks.length; i++) {
      const chunkFilename = baseFilename.replace('.json', `_chunk_${i + 1}.json`);
      const filePath = await this.saveToDocuments(chunkFilename, chunks[i]);
      filePaths.push(filePath);
    }
    
    return filePaths;
  }

  static generateTimestampFilename(prefix: string): string {
    const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
    return `${prefix}_${timestamp}.json`;
  }
}
