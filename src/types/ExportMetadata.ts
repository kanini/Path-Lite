export interface ExportMetadata {
  schemaVersion: string;
  exportTimestamp: string;
  recordCount: number;
  exportType: 'patients' | 'sessions' | 'audit_logs';
}

export interface ExportResult<T = any> {
  metadata: ExportMetadata;
  data: T[];
  warning?: string;
}
