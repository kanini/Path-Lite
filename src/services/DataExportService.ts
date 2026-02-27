import { PHIStorage } from '../storage/PHIStorage';
import { AuditStorage } from '../storage/AuditStorage';
import { Patient } from '../models/Patient';
import { TreatmentSession } from '../models/TreatmentSession';
import { AuditLog } from '../types/AuditLog';
import { ExportMetadata, ExportResult } from '../types/ExportMetadata';
import { JSONValidator } from '../utils/JSONValidator';
import { FileExportService } from './FileExportService';
import { StorageSizeChecker } from '../utils/StorageSizeChecker';

export class DataExportService {
  private phiStorage: PHIStorage;
  private auditStorage: AuditStorage;

  constructor(phiStorage: PHIStorage, auditStorage: AuditStorage) {
    this.phiStorage = phiStorage;
    this.auditStorage = auditStorage;
  }

  exportPatients(): string {
    const allKeys = this.phiStorage.getAllKeys();
    const patientKeys = allKeys.filter(key => key.startsWith('patient_'));
    
    const patients: Patient[] = [];
    
    for (const key of patientKeys) {
      const patient = this.phiStorage.get(key);
      if (patient) {
        patients.push(patient);
      }
    }
    
    const metadata: ExportMetadata = {
      schemaVersion: '1.0',
      exportTimestamp: new Date().toISOString(),
      recordCount: patients.length,
      exportType: 'patients',
    };
    
    const exportResult: ExportResult<Patient> = {
      metadata,
      data: patients,
    };
    
    if (patients.length === 0) {
      exportResult.warning = 'No data available to export';
    }
    
    const jsonString = JSON.stringify(exportResult, null, 2);
    
    if (!JSONValidator.validateExportStructure(jsonString)) {
      throw new Error('Export validation failed: Invalid JSON structure');
    }
    
    return jsonString;
  }

  exportTreatmentSessions(): string {
    const allKeys = this.phiStorage.getAllKeys();
    const sessionKeys = allKeys.filter(key => key.startsWith('session_'));
    
    interface SessionWithPatient {
      session: TreatmentSession;
      patient: Patient | null;
    }
    
    const sessionsWithPatients: SessionWithPatient[] = [];
    
    for (const key of sessionKeys) {
      const session = this.phiStorage.get(key) as TreatmentSession;
      if (session) {
        const patientKey = `patient_${session.patientMrn}`;
        const patient = this.phiStorage.get(patientKey) as Patient | null;
        
        sessionsWithPatients.push({
          session,
          patient,
        });
      }
    }
    
    const metadata: ExportMetadata = {
      schemaVersion: '1.0',
      exportTimestamp: new Date().toISOString(),
      recordCount: sessionsWithPatients.length,
      exportType: 'sessions',
    };
    
    const exportResult: ExportResult<SessionWithPatient> = {
      metadata,
      data: sessionsWithPatients,
    };
    
    if (sessionsWithPatients.length === 0) {
      exportResult.warning = 'No data available to export';
    }
    
    const jsonString = JSON.stringify(exportResult, null, 2);
    
    if (!JSONValidator.validateExportStructure(jsonString)) {
      throw new Error('Export validation failed: Invalid JSON structure');
    }
    
    return jsonString;
  }

  exportAuditLogs(): string {
    const logs = this.auditStorage.getAllLogs();
    
    const metadata: ExportMetadata = {
      schemaVersion: '1.0',
      exportTimestamp: new Date().toISOString(),
      recordCount: logs.length,
      exportType: 'audit_logs',
    };
    
    const exportResult: ExportResult<AuditLog> = {
      metadata,
      data: logs,
    };
    
    if (logs.length === 0) {
      exportResult.warning = 'No data available to export';
    }
    
    const jsonString = JSON.stringify(exportResult, null, 2);
    
    if (!JSONValidator.validateExportStructure(jsonString)) {
      throw new Error('Export validation failed: Invalid JSON structure');
    }
    
    return jsonString;
  }

  async exportAuditLogsToFile(): Promise<string | string[]> {
    const logs = this.auditStorage.getAllLogs();
    
    const metadata: ExportMetadata = {
      schemaVersion: '1.0',
      exportTimestamp: new Date().toISOString(),
      recordCount: logs.length,
      exportType: 'audit_logs',
    };
    
    const exportResult: ExportResult<AuditLog> = {
      metadata,
      data: logs,
    };
    
    if (logs.length === 0) {
      exportResult.warning = 'No data available to export';
    }
    
    const estimatedSize = StorageSizeChecker.estimateJSONSize(exportResult);
    
    const hasSpace = await StorageSizeChecker.checkAvailableSpace(estimatedSize * 1.5);
    if (!hasSpace) {
      throw new Error('Insufficient storage space for export. Please free up space and try again.');
    }
    
    const filename = FileExportService.generateTimestampFilename('audit_logs');
    
    if (StorageSizeChecker.shouldChunkExport(logs.length, estimatedSize)) {
      const CHUNK_SIZE = 500;
      const logChunks = StorageSizeChecker.chunkArray(logs, CHUNK_SIZE);
      
      const jsonChunks = logChunks.map((chunk, index) => {
        const chunkMetadata: ExportMetadata = {
          ...metadata,
          recordCount: chunk.length,
        };
        
        const chunkResult: ExportResult<AuditLog> = {
          metadata: chunkMetadata,
          data: chunk,
        };
        
        return JSON.stringify(chunkResult, null, 2);
      });
      
      const filePaths = await FileExportService.saveChunkedExport(filename, jsonChunks);
      return filePaths;
    }
    
    const jsonString = JSON.stringify(exportResult, null, 2);
    
    if (!JSONValidator.validateExportStructure(jsonString)) {
      throw new Error('Export validation failed: Invalid JSON structure');
    }
    
    const filePath = await FileExportService.saveToDocuments(filename, jsonString);
    return filePath;
  }
}
