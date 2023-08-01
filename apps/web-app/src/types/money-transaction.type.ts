import {
  DateRange,
  MoneyTransactionsByCategory,
  MoneyTransactionsByDate,
} from "shared-types/shared.type";
import { DateRangeSelection } from "./app.type";

export interface PostMoneyTransactionLogRequestBody {
  isRevenue: boolean;
  label: string;
  amount: number;
  categoryId: string;
  objectId: string;
  timestamp: string;
}

export interface UseMoneyTransactionsReturn {
  isLoading: boolean;
  isError: boolean;
  moneyTransactionsByCategory: MoneyTransactionsByCategory;
  moneyTransactionsByDate: MoneyTransactionsByDate;
  changeDateRange: (dateRange: DateRange | DateRangeSelection) => void;
  selectedDateRangeOption: { value: DateRangeSelection; label: string };
  dateRangeOptions: { value: DateRangeSelection; label: string }[];
  setSelectedDateRangeOption: (option: {
    value: DateRangeSelection;
    label: string;
  }) => void;
}
export interface GetMoneyTransactionHistoryRequestBody {
  minDate: string;
  maxDate: string;
}
