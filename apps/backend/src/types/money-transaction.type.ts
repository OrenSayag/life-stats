import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateMoneyTransactionRequestBodyDto {
  @IsString()
  @IsOptional()
  categoryId?: string;
  @IsBoolean()
  isRevenue: boolean;
  @IsString()
  label: string;
  @IsNumber()
  amount: number;

  @IsString()
  objectId: string;

  @IsString()
  timestamp: string;
}

export class PatchMoneyTransactionRequestBody {
  @IsString()
  @IsOptional()
  categoryId?: string;
  @IsBoolean()
  @IsOptional()
  isRevenue?: boolean;
  @IsString()
  @IsOptional()
  label?: string;
  @IsNumber()
  @IsOptional()
  amount?: number;
}
export class GetMoneyTransactionHistoryDto {
  @IsString()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  moneyCategories?: string[];
  @IsDateString()
  minDate: string;
  @IsDateString()
  maxDate: string;
}

export class MoneyTransactionIdParamDto {
  @IsString()
  moneyTransactionId: string;
}
export class UpdateMoneyTransactionParams extends PatchMoneyTransactionRequestBody {
  moneyTransactionId: string;
}

export class CreateMoneyTransactionCategoryRequestBody {
  @IsString()
  name: string;
}
export class MoneyCategoryIdParamDto {
  @IsString()
  moneyTransactionCategoryId: string;
}
export class PatchMoneyCategoryRequestBody {
  @IsString()
  @IsOptional()
  name?: string;
}
export class UpdateMoneyCategoryParams extends PatchMoneyCategoryRequestBody {
  moneyTransactionCategoryId: string;
}
