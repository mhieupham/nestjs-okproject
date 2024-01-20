import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'PhoneNumberValidator', async: false })
export class PhoneNumberValidator implements ValidatorConstraintInterface {
  validate(phoneNumber: string) {
    if (phoneNumber) {
      return phoneNumber.length === 10 && !Number.isNaN(phoneNumber);
    }

    return true;
  }

  defaultMessage() {
    return 'Invalid phone number';
  }
}
