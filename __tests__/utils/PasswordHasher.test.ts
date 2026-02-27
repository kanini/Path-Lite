import { PasswordHasher } from '../../src/utils/PasswordHasher';

describe('PasswordHasher', () => {
  describe('hashPassword', () => {
    it('should generate a hash for a password', () => {
      const password = 'TestPassword123!';
      const hash = PasswordHasher.hashPassword(password);
      
      expect(hash).toBeDefined();
      expect(typeof hash).toBe('string');
      expect(hash.startsWith('$mock$')).toBe(true);
    });

    it('should generate consistent hashes for same password', () => {
      const password = 'TestPassword123!';
      const hash1 = PasswordHasher.hashPassword(password);
      const hash2 = PasswordHasher.hashPassword(password);
      
      expect(hash1).toBe(hash2);
    });

    it('should generate different hashes for different passwords', () => {
      const password1 = 'Password1';
      const password2 = 'Password2';
      const hash1 = PasswordHasher.hashPassword(password1);
      const hash2 = PasswordHasher.hashPassword(password2);
      
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('verifyPassword', () => {
    it('should verify correct password', () => {
      const password = 'TestPassword123!';
      const hash = PasswordHasher.hashPassword(password);
      
      expect(PasswordHasher.verifyPassword(password, hash)).toBe(true);
    });

    it('should reject incorrect password', () => {
      const password = 'TestPassword123!';
      const wrongPassword = 'WrongPassword';
      const hash = PasswordHasher.hashPassword(password);
      
      expect(PasswordHasher.verifyPassword(wrongPassword, hash)).toBe(false);
    });

    it('should reject invalid hash format', () => {
      const password = 'TestPassword123!';
      const invalidHash = 'invalid_hash_format';
      
      expect(PasswordHasher.verifyPassword(password, invalidHash)).toBe(false);
    });
  });
});
