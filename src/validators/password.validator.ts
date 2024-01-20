import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'PasswordValidator', async: false })
export class PasswordValidator implements ValidatorConstraintInterface {
  validate(password: string) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
  }

  defaultMessage() {
    return 'Invalid password format. Please enter all uppercase and lowercase characters, numbers and special characters';
  }
}
