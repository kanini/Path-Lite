import { DateValidator } from '../../src/validation/DateValidator';

describe('DateValidator', () => {
  describe('isLeapYear', () => {
    it('should return true for leap year 2020', () => {
      expect(DateValidator.isLeapYear(2020)).toBe(true);
    });

    it('should return false for non-leap year 2021', () => {
      expect(DateValidator.isLeapYear(2021)).toBe(false);
    });

    it('should return true for leap year 2000 (divisible by 400)', () => {
      expect(DateValidator.isLeapYear(2000)).toBe(true);
    });

    it('should return false for year 1900 (divisible by 100 but not 400)', () => {
      expect(DateValidator.isLeapYear(1900)).toBe(false);
    });
  });

  describe('isValidDate', () => {
    it('should return true for valid date 01/15/1980', () => {
      expect(DateValidator.isValidDate('01/15/1980')).toBe(true);
    });

    it('should return true for leap year date 02/29/2020', () => {
      expect(DateValidator.isValidDate('02/29/2020')).toBe(true);
    });

    it('should return false for invalid leap year date 02/29/2021', () => {
      expect(DateValidator.isValidDate('02/29/2021')).toBe(false);
    });

    it('should return false for invalid format 2020-01-15', () => {
      expect(DateValidator.isValidDate('2020-01-15')).toBe(false);
    });

    it('should return false for invalid month 13/01/2020', () => {
      expect(DateValidator.isValidDate('13/01/2020')).toBe(false);
    });

    it('should return false for invalid day 01/32/2020', () => {
      expect(DateValidator.isValidDate('01/32/2020')).toBe(false);
    });

    it('should return false for invalid day in April 04/31/2020', () => {
      expect(DateValidator.isValidDate('04/31/2020')).toBe(false);
    });

    it('should return true for valid day in April 04/30/2020', () => {
      expect(DateValidator.isValidDate('04/30/2020')).toBe(true);
    });
  });

  describe('isNotFutureDate', () => {
    it('should return true for past date 01/15/1980', () => {
      expect(DateValidator.isNotFutureDate('01/15/1980')).toBe(true);
    });

    it('should return true for today', () => {
      const today = new Date();
      const dateString = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;
      expect(DateValidator.isNotFutureDate(dateString)).toBe(true);
    });

    it('should return false for future date', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const dateString = `${String(futureDate.getMonth() + 1).padStart(2, '0')}/${String(futureDate.getDate()).padStart(2, '0')}/${futureDate.getFullYear()}`;
      expect(DateValidator.isNotFutureDate(dateString)).toBe(false);
    });
  });

  describe('isAgeInRange', () => {
    it('should return true for age within range 0-120 years', () => {
      const date30YearsAgo = new Date();
      date30YearsAgo.setFullYear(date30YearsAgo.getFullYear() - 30);
      const dateString = `${String(date30YearsAgo.getMonth() + 1).padStart(2, '0')}/${String(date30YearsAgo.getDate()).padStart(2, '0')}/${date30YearsAgo.getFullYear()}`;
      expect(DateValidator.isAgeInRange(dateString, 0, 120)).toBe(true);
    });

    it('should return false for age > 120 years', () => {
      const date121YearsAgo = new Date();
      date121YearsAgo.setFullYear(date121YearsAgo.getFullYear() - 121);
      const dateString = `${String(date121YearsAgo.getMonth() + 1).padStart(2, '0')}/${String(date121YearsAgo.getDate()).padStart(2, '0')}/${date121YearsAgo.getFullYear()}`;
      expect(DateValidator.isAgeInRange(dateString, 0, 120)).toBe(false);
    });

    it('should return true for newborn (age 0)', () => {
      const today = new Date();
      const dateString = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;
      expect(DateValidator.isAgeInRange(dateString, 0, 120)).toBe(true);
    });

    it('should return true for age exactly 120 years', () => {
      const date120YearsAgo = new Date();
      date120YearsAgo.setFullYear(date120YearsAgo.getFullYear() - 120);
      const dateString = `${String(date120YearsAgo.getMonth() + 1).padStart(2, '0')}/${String(date120YearsAgo.getDate()).padStart(2, '0')}/${date120YearsAgo.getFullYear()}`;
      expect(DateValidator.isAgeInRange(dateString, 0, 120)).toBe(true);
    });
  });
});
