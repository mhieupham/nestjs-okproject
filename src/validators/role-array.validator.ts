// role-array.validator.ts
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidRoleArray', async: false })
export class IsValidRoleArray implements ValidatorConstraintInterface {
  validate(roles: string) {
    if (roles.length === 0) {
      return false; // ít nhất một role
    }

    return true;
  }

  defaultMessage() {
    return 'Invalid roles. At least one role required and all roles must exist.';
  }
}
