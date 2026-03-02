export class PasswordHasher {
  static hashPassword(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    const hashString = Math.abs(hash).toString(16).padStart(16, '0');
    return `$mock$${hashString}`;
  }

  static verifyPassword(password: string, hash: string): boolean {
    if (!hash.startsWith('$mock$')) {
      return false;
    }
    
    const computedHash = this.hashPassword(password);
    return computedHash === hash;
  }
}
