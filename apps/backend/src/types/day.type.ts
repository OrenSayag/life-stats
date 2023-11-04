import { IsDateString } from 'class-validator';
import { FormItem } from '../mongoose-schemas/form-item.mongoose-schema';
import { MoneyTransaction } from '../mongoose-schemas/money-transaction.mongoose-schema';
import { Note as INote } from 'shared-types/shared.type';

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
  notes: INote[];
}
