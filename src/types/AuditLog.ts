export interface AuditLog {
  logId: string;
  timestamp: string;
  userId: string;
  actionType: 'CREATE' | 'UPDATE' | 'DELETE' | 'READ' | 'LOGIN' | 'LOGOUT' | 'VALIDATION_FAILURE' | 'AI_INTERACTION';
  entityType: 'PATIENT' | 'TREATMENT_SESSION' | 'USER' | 'FORM_FIELD';
  entityId: string;
  beforeValue?: any;
  afterValue?: any;
  ipAddress?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface RetentionMetadata {
  createdAt: string;
  retentionPeriodDays: number;
  expiresAt: string;
}
