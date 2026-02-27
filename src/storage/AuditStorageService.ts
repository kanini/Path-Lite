import { AuditStorage } from './AuditStorage';
import { AuditLog } from '../types/AuditLog';
import { RetentionPolicyManager } from './RetentionPolicyManager';

export class AuditStorageService {
  private storage: AuditStorage;

  constructor() {
    this.storage = new AuditStorage();
  }

  async initialize(): Promise<void> {
    await this.storage.initialize();
  }

  private createAuditLog(
    userId: string,
    actionType: AuditLog['actionType'],
    entityType: AuditLog['entityType'],
    entityId: string,
    beforeValue?: any,
    afterValue?: any,
    metadata?: Record<string, any>
  ): AuditLog {
    const now = new Date().toISOString();
    return {
      logId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: now,
      userId,
      actionType,
      entityType,
      entityId,
      beforeValue,
      afterValue,
      metadata,
      createdAt: now,
    };
  }

  logUserAction(
    userId: string,
    action: 'LOGIN' | 'LOGOUT',
    metadata?: Record<string, any>
  ): void {
    const log = this.createAuditLog(
      userId,
      action,
      'USER',
      userId,
      undefined,
      undefined,
      metadata
    );
    this.storage.logEntry(log);
  }

  logDataModification(
    userId: string,
    actionType: 'CREATE' | 'UPDATE' | 'DELETE',
    entityType: 'PATIENT' | 'TREATMENT_SESSION',
    entityId: string,
    beforeValue?: any,
    afterValue?: any
  ): void {
    const log = this.createAuditLog(
      userId,
      actionType,
      entityType,
      entityId,
      beforeValue,
      afterValue
    );
    this.storage.logEntry(log);
  }

  logValidationFailure(
    userId: string,
    fieldName: string,
    invalidValue: any,
    errorMessage: string
  ): void {
    const log = this.createAuditLog(
      userId,
      'VALIDATION_FAILURE',
      'FORM_FIELD',
      fieldName,
      undefined,
      undefined,
      {
        invalidValue,
        errorMessage,
      }
    );
    this.storage.logEntry(log);
  }

  logAIInteraction(
    userId: string,
    question: string,
    response: string,
    fieldName: string,
    extractedValue?: any
  ): void {
    const log = this.createAuditLog(
      userId,
      'AI_INTERACTION',
      'FORM_FIELD',
      fieldName,
      undefined,
      undefined,
      {
        question,
        response,
        extractedValue,
      }
    );
    this.storage.logEntry(log);
  }

  getLogsByDateRange(startDate: Date, endDate: Date): AuditLog[] {
    return this.storage.getLogsByDateRange(startDate, endDate);
  }

  getAllLogs(): AuditLog[] {
    return this.storage.getAllLogs();
  }

  getActiveLogs(): AuditLog[] {
    const allLogs = this.storage.getAllLogs();
    return RetentionPolicyManager.filterActiveLogs(allLogs);
  }

  getExpiredLogs(): AuditLog[] {
    const allLogs = this.storage.getAllLogs();
    return RetentionPolicyManager.filterExpiredLogs(allLogs);
  }

  getRetentionSummary() {
    const allLogs = this.storage.getAllLogs();
    return RetentionPolicyManager.getRetentionSummary(allLogs);
  }

  getStorageSize(): number {
    return this.storage.getSize();
  }

  getLogCount(): number {
    return this.storage.getLogCount();
  }
}
