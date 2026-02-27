export class PasswordHasher {
  static hashPassword(password: string): string {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data[i];
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
