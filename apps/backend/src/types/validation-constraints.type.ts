import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class FormItemValueConstraint implements ValidatorConstraintInterface {
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'form item value must be of type boolean or number';
  }

  validate(value: any, args: ValidationArguments): boolean {
    return ['boolean', 'number'].includes(typeof value);
  }
}
