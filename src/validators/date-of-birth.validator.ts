// date-of-birth.validator.ts
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDateFormat', async: false })
export class IsDateFormat implements ValidatorConstraintInterface {
  validate(date: string) {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!date.match(regEx)) return false; // Invalid format
    const d = new Date(date);
    const dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === date;
  }

  defaultMessage() {
    return 'Invalid date format. Use yyyy-mm-dd.';
  }
}
