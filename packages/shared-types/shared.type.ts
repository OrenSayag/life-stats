export interface NumericTarget {
  amount: number;
  isMinimum: boolean;
}

export interface FormItem {
  isDaily: boolean;
  label: string;
  type: "numeric" | "boolean";
  numericTarget?: NumericTarget;
  booleanTarget?: boolean;
  defaultValue: number | boolean;
  objectId: string;
  value: number | boolean;
  // TODO update docs
  delete?: boolean; // used for mutating the form definition
}
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
  isActive: boolean;
  items: FormItem[];
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
  notes: NotesUserSettings;
}

export interface NotesUserSettings {
  rtlDefaultDirection: boolean;
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

export interface MoneyTransaction {
  timestamp: string;
  category?: string; // id, find the category from the UserAuthenticData object that is in the access_token
  isRevenue: boolean;
  label: string;
  amount: number;
  objectId?: string;
}

export interface Note {
  objectId: string;
  date: string;
  creationTime: string;
  title: string;
  content?: string;
  rtl: boolean;
}

export interface MoneyTransactionsByDate {
  [date: string]: MoneyTransaction[];
}

export interface MoneyTransactionsByCategory {
  [categoryId: string]: MoneyTransaction[];
  uncategorized: MoneyTransaction[];
}

export interface CalendarDate {
  isPerfectDay: boolean;
  date: string;
}
