import { ActionType } from './enums';

export interface AuditLog {
  schemaVersion: string;
  logId: string;
  timestamp: Date;
  userId: string;
  actionType: ActionType;
  entityType: string;
  entityId: string;
  beforeValue: Record<string, any> | null;
  afterValue: Record<string, any> | null;
  ipAddress: string;
}
