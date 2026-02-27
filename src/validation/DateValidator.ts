import { DATE_PATTERN } from '../utils/RegexPatterns';

export class DateValidator {
  static isLeapYear(year: number): boolean {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  static isValidDate(dateString: string): boolean {
    if (!DATE_PATTERN.test(dateString)) {
      return false;
    }

    const [month, day, year] = dateString.split('/').map(Number);

    if (month < 1 || month > 12) {
      return false;
    }

    const daysInMonth = [31, this.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day < 1 || day > daysInMonth[month - 1]) {
      return false;
    }

    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && 
           date.getMonth() === month - 1 && 
           date.getDate() === day;
  }

  static isNotFutureDate(dateString: string): boolean {
    if (!this.isValidDate(dateString)) {
      return false;
    }

    const [month, day, year] = dateString.split('/').map(Number);
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return inputDate <= today;
  }

  static isAgeInRange(dateString: string, minAge: number, maxAge: number): boolean {
    if (!this.isValidDate(dateString)) {
      return false;
    }

    const [month, day, year] = dateString.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age >= minAge && age <= maxAge;
  }
}
