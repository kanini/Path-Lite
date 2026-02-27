import { User, UserRole } from '../models';
import { PasswordHasher } from '../utils/PasswordHasher';

const SCHEMA_VERSION = '1.0.0';

export const MOCK_USERS: User[] = [
  {
    schemaVersion: SCHEMA_VERSION,
    userId: 'USER001',
    username: 'nurse1',
    passwordHash: PasswordHasher.hashPassword('Nurse123!'),
    role: UserRole.Nurse,
    hospitalId: 'HOSP001',
  },
  {
    schemaVersion: SCHEMA_VERSION,
    userId: 'USER002',
    username: 'nurse2',
    passwordHash: PasswordHasher.hashPassword('Nurse456!'),
    role: UserRole.Nurse,
    hospitalId: 'HOSP002',
  },
  {
    schemaVersion: SCHEMA_VERSION,
    userId: 'USER003',
    username: 'nurse3',
    passwordHash: PasswordHasher.hashPassword('Nurse789!'),
    role: UserRole.Nurse,
    hospitalId: 'HOSP003',
  },
  {
    schemaVersion: SCHEMA_VERSION,
    userId: 'USER004',
    username: 'admin',
    passwordHash: PasswordHasher.hashPassword('Admin123!'),
    role: UserRole.Admin,
    hospitalId: 'HOSP001',
  },
];

export const findUserByUsername = (username: string): User | undefined => {
  return MOCK_USERS.find(user => user.username === username);
};

export const authenticateUser = (username: string, password: string): User | null => {
  const user = findUserByUsername(username);
  if (!user) {
    return null;
  }

  if (PasswordHasher.verifyPassword(password, user.passwordHash)) {
    return user;
  }

  return null;
};
