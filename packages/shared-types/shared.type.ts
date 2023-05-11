import { FormItem } from "pwa/src/types/form.type";

export interface UserData {
  formDefinitions: Form[];
  moneyTransactionCategories: MoneyTransactionCategory[];
  settings: UserSettings;
  profilePicUrl: string;
  name: string;
}

export interface AppAPIResponseBodyBase {
  success: boolean;
  message: string;
  httpStatus: number;
  timestamp: string;
  data?: any;
}

export interface DateRange {
  minDate: string;
  maxDate: string;
}

export interface FormLog {
  name: string;
  objectId: string;
  items: FormItem[];
  isActive: boolean;
  date: string;
  isPerfect: boolean;
  definitionId: string;
}

export interface Form {
  name: string;

  items: FormItem[];
  isActive: boolean;

  objectId: string;
}

export interface MoneyTransactionCategory {
  name: string;
  objectId: string;
}

export interface GetUserDataResponseBody extends AppAPIResponseBodyBase {
  data: UserData;
}

export interface UserSettings {
  reports: ReportsUserSettings;
  finance: FinanceUserSettings;
}
export interface ReportsUserSettings {
  mailTo: string[];
  interval: number;
  forms: string[];
}
export interface FinanceUserSettings {
  currency: number;
}

export interface UserAuthenticData {
  name: string;
  profilePicUrl: string;
  providerId: string;
}
