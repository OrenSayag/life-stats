import { FormItem } from '../mongoose-schemas/form-item.mongoose-schema';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Validate,
  ValidateIf,
  ValidateNested,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FormLog } from '../mongoose-schemas/form-log.mongoose-schema';
import { FormItemValueConstraint } from './validation-constraints.type';

export class FormDefinitionIdParamDto {
  @IsString()
  formDefinitionId: string;
}
export class PatchFormStateRequestBodyDto {
  @IsArray()
  @Type(() => FormItem)
  @ValidateNested({ each: true })
  items: FormItemDto[];
  @IsDateString()
  date: string;
}

export interface GetFormLogByDateParams {
  date: string;
  definitionId: string; // id of the form definition
}

export class FormItemDto {
  @IsString()
  objectId: string;
  value: number | boolean;
}

export interface UpdateFormLogParams {
  items: FormItemDto[];
  log: FormLog;
}

export class FormItemNumericTargetDto {
  @IsNumber()
  @IsOptional()
  amount?: number;
  @IsBoolean()
  @IsOptional()
  isMinimum?: boolean;
}

@ValidatorConstraint({ name: 'defaultValue', async: false })
export class FormDefinitionItemDefaultValueValidator
  implements ValidatorConstraintInterface
{
  validate(defaultValue: any, args: ValidationArguments) {
    const object = args.object as FormDefinitionItemDto;
    if (object.type === 'numeric') {
      console.log('debug valdation formcontroller');
      console.log(object);
      return typeof defaultValue === 'number';
    } else if (object.type === 'boolean') {
      return typeof defaultValue === 'boolean';
    } else {
      return true;
    }
  }

  defaultMessage(args: ValidationArguments) {
    const object = args.object as FormDefinitionItemDto;
    if (object.type === 'numeric') {
      return 'defaultValue must be a number if type is numeric';
    } else if (object.type === 'boolean') {
      return 'defaultValue must be a boolean if type is boolean';
    } else {
      return '';
    }
  }
}

export class FormDefinitionItemDto {
  @IsOptional()
  @Validate(FormDefinitionItemDefaultValueValidator)
  defaultValue?: boolean | number;
  @IsString()
  @IsOptional()
  label?: string;
  @IsBoolean()
  @IsOptional()
  isDaily?: boolean;

  @IsObject()
  @Type(() => FormItemNumericTargetDto)
  @ValidateNested({ each: true })
  @IsOptional()
  numericTarget?: FormItemNumericTargetDto;

  @IsBoolean()
  @IsOptional()
  booleanTarget?: boolean;

  @IsOptional()
  @IsIn(['numeric', 'boolean'])
  type?: 'numeric' | 'boolean';

  @IsString()
  objectId: string;

  @IsBoolean()
  @IsOptional()
  delete?: boolean;
}

export class PatchFormDefinitionRequestBodyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsArray()
  @Type(() => FormDefinitionItemDto)
  @ValidateNested({ each: true })
  @IsOptional()
  items?: FormDefinitionItemDto[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export interface UpdateFormDefinitionParams
  extends PatchFormDefinitionRequestBodyDto {
  definitionId: string;
}

export class FormDefinitionItemNumericTargetDto {
  @IsNumber()
  amount: number;
  @IsBoolean()
  isMinimum: boolean;
}
export class CreateFormDefinitionItemDefinitionDto {
  @Validate(FormItemValueConstraint)
  defaultValue: boolean | number;

  @IsString()
  label: string;

  @IsIn(['boolean', 'numeric'])
  type: 'boolean' | 'numeric';

  @IsBoolean()
  isDaily: boolean;

  @ValidateIf((o) => o.type === 'numeric')
  @ValidateNested()
  @IsDefined()
  @Type(() => FormDefinitionItemNumericTargetDto)
  numericTarget: FormDefinitionItemNumericTargetDto;

  @ValidateIf((o) => o.type === 'boolean')
  @IsBoolean()
  booleanTarget: boolean;
}

export class CreateFormDefinitionDto {
  @IsString()
  name: string;
  @Type(() => CreateFormDefinitionItemDefinitionDto)
  @ValidateNested({ each: true })
  @IsArray()
  @IsNotEmpty()
  items: CreateFormDefinitionItemDefinitionDto[];
  @IsBoolean()
  @IsOptional()
  isActive = true;

  @IsString()
  objectId: string;
}
