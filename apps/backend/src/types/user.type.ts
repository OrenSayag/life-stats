import { MoneyTransactionCategory } from '../mongoose-schemas/money-transaction-category.mongoose-schema';
import { UserSettings } from '../mongoose-schemas/user-settings.mongoose-schema';
import { Form } from '../mongoose-schemas/form.mongoose-schema';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export interface UserAuthenticData {
  name: string;
  profilePicUrl: string;
  forms: Form[];
  moneyTransactionCategories: MoneyTransactionCategory[];
  settings: UserSettings;
  providerId: string;
  defaultForm: string;
}

export class ReportsUserSettingsDto {
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  mailTo?: string[];
  @IsNumber()
  @IsOptional()
  interval?: number;
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  forms?: string[];
}
export class FinanceUserSettingsDto {
  @IsNumber()
  @IsOptional()
  currency?: number;
}
export class UpdateUserSettingsRequestBody {
  @Type(() => ReportsUserSettingsDto)
  @ValidateNested({ each: true })
  @IsOptional()
  reports?: ReportsUserSettingsDto;
  @Type(() => FinanceUserSettingsDto)
  @IsOptional()
  finance?: FinanceUserSettingsDto;
}
