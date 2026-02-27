import { UserRole } from './enums';

export interface User {
  schemaVersion: string;
  userId: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  hospitalId: string;
}
