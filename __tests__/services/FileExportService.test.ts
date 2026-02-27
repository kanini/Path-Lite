import { FileExportService } from '../../src/services/FileExportService';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

jest.mock('react-native-fs');
jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
  },
}));

describe('FileExportService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveToDocuments', () => {
    it('should save file to iOS DocumentDirectoryPath', async () => {
      Platform.OS = 'ios';
      (RNFS.DocumentDirectoryPath as any) = '/path/to/documents';
      (RNFS.writeFile as jest.Mock).mockResolvedValue(undefined);

      const filename = 'test_export.json';
      const content = JSON.stringify({ data: 'test' });

      const filePath = await FileExportService.saveToDocuments(filename, content);

      expect(filePath).toBe('/path/to/documents/test_export.json');
      expect(RNFS.writeFile).toHaveBeenCalledWith(
        '/path/to/documents/test_export.json',
        content,
        'utf8'
      );
    });

    it('should save file to Android ExternalDirectoryPath', async () => {
      Platform.OS = 'android';
      (RNFS.ExternalDirectoryPath as any) = '/path/to/external';
      (RNFS.writeFile as jest.Mock).mockResolvedValue(undefined);

      const filename = 'test_export.json';
      const content = JSON.stringify({ data: 'test' });

      const filePath = await FileExportService.saveToDocuments(filename, content);

      expect(filePath).toBe('/path/to/external/test_export.json');
      expect(RNFS.writeFile).toHaveBeenCalledWith(
        '/path/to/external/test_export.json',
        content,
        'utf8'
      );
    });

    it('should throw error if write fails', async () => {
      Platform.OS = 'ios';
      (RNFS.DocumentDirectoryPath as any) = '/path/to/documents';
      (RNFS.writeFile as jest.Mock).mockRejectedValue(new Error('Write failed'));

      const filename = 'test_export.json';
      const content = JSON.stringify({ data: 'test' });

      await expect(
        FileExportService.saveToDocuments(filename, content)
      ).rejects.toThrow('Write failed');
    });
  });

  describe('saveChunkedExport', () => {
    it('should save multiple chunks with correct filenames', async () => {
      Platform.OS = 'ios';
      (RNFS.DocumentDirectoryPath as any) = '/path/to/documents';
      (RNFS.writeFile as jest.Mock).mockResolvedValue(undefined);

      const baseFilename = 'audit_logs_2024-01-01.json';
      const chunks = [
        JSON.stringify({ chunk: 1 }),
        JSON.stringify({ chunk: 2 }),
        JSON.stringify({ chunk: 3 }),
      ];

      const filePaths = await FileExportService.saveChunkedExport(baseFilename, chunks);

      expect(filePaths).toHaveLength(3);
      expect(filePaths[0]).toBe('/path/to/documents/audit_logs_2024-01-01_chunk_1.json');
      expect(filePaths[1]).toBe('/path/to/documents/audit_logs_2024-01-01_chunk_2.json');
      expect(filePaths[2]).toBe('/path/to/documents/audit_logs_2024-01-01_chunk_3.json');
      expect(RNFS.writeFile).toHaveBeenCalledTimes(3);
    });

    it('should handle empty chunks array', async () => {
      const baseFilename = 'audit_logs_2024-01-01.json';
      const chunks: string[] = [];

      const filePaths = await FileExportService.saveChunkedExport(baseFilename, chunks);

      expect(filePaths).toHaveLength(0);
      expect(RNFS.writeFile).not.toHaveBeenCalled();
    });
  });

  describe('generateTimestampFilename', () => {
    it('should generate filename with timestamp', () => {
      const prefix = 'audit_logs';
      const filename = FileExportService.generateTimestampFilename(prefix);

      expect(filename).toMatch(/^audit_logs_\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z\.json$/);
    });

    it('should generate different filenames for different prefixes', () => {
      const filename1 = FileExportService.generateTimestampFilename('patients');
      const filename2 = FileExportService.generateTimestampFilename('sessions');

      expect(filename1).toContain('patients_');
      expect(filename2).toContain('sessions_');
    });
  });
});
