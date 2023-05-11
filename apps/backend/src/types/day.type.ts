import { MoneyTransactionCategory } from '../mongoose-schemas/money-transaction-category.mongoose-schema';
import { UserSettings } from '../mongoose-schemas/user-settings.mongoose-schema';
import { Types } from 'mongoose';
import { IsDate, IsDateString } from 'class-validator';
import { FormItem } from '../mongoose-schemas/form-item.mongoose-schema';
import { Form } from '../mongoose-schemas/form.mongoose-schema';
import { MoneyTransaction } from '../mongoose-schemas/money-transaction.mongoose-schema';

export class GetDayDataByDateParamsDto {
  @IsDateString()
  date: string;
}

export interface UserFormMeta {
  objectId: string;
  label: string;
  isDefaultForm: boolean;
}

export interface UserBaseData {
  forms: UserFormMeta;
}
export interface FormState extends UserFormMeta {
  formItems: FormItem[];
}
export interface DayViewDateData {
  forms: any;
  moneyTransactions: MoneyTransaction[];
}
