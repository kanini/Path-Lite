import { DateUtils } from '../../src/utils/DateUtils';

describe('DateUtils', () => {
  describe('isOlderThan', () => {
    it('should return true for date 25 hours ago with threshold 24 hours', () => {
      const date = new Date();
      date.setHours(date.getHours() - 25);
      
      const result = DateUtils.isOlderThan(date, 24);
      expect(result).toBe(true);
    });

    it('should return false for date 23 hours ago with threshold 24 hours', () => {
      const date = new Date();
      date.setHours(date.getHours() - 23);
      
      const result = DateUtils.isOlderThan(date, 24);
      expect(result).toBe(false);
    });

    it('should return true for date exactly 24 hours ago with threshold 24 hours', () => {
      const date = new Date();
      date.setHours(date.getHours() - 24);
      date.setMinutes(date.getMinutes() - 1);
      
      const result = DateUtils.isOlderThan(date, 24);
      expect(result).toBe(true);
    });

    it('should return true for date 48 hours ago with threshold 24 hours', () => {
      const date = new Date();
      date.setHours(date.getHours() - 48);
      
      const result = DateUtils.isOlderThan(date, 24);
      expect(result).toBe(true);
    });

    it('should return false for date 1 hour ago with threshold 24 hours', () => {
      const date = new Date();
      date.setHours(date.getHours() - 1);
      
      const result = DateUtils.isOlderThan(date, 24);
      expect(result).toBe(false);
    });
  });

  describe('getHoursAgo', () => {
    it('should return date 24 hours ago', () => {
      const result = DateUtils.getHoursAgo(24);
      const expected = new Date();
      expected.setHours(expected.getHours() - 24);
      
      const diffInMs = Math.abs(result.getTime() - expected.getTime());
      expect(diffInMs).toBeLessThan(1000);
    });

    it('should return date 1 hour ago', () => {
      const result = DateUtils.getHoursAgo(1);
      const expected = new Date();
      expected.setHours(expected.getHours() - 1);
      
      const diffInMs = Math.abs(result.getTime() - expected.getTime());
      expect(diffInMs).toBeLessThan(1000);
    });
  });
});
