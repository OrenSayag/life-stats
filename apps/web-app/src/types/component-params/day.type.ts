import { PostMoneyTransactionLogRequestBody } from "../../types/money-transaction.type";
import {
  MoneyTransaction,
  MoneyTransactionCategory,
} from "shared-types/shared.type";

export interface MoneyTransactionDayLogParams {
  moneyTransactions: MoneyTransaction[];
  currency: number;
  date: string;
  moneyTransactionCategories: MoneyTransactionCategory[];
}

export interface AddMoneyTransactionFormParams {
  isRevenue: boolean;
  // TODO update docs
  onSubmit: (requestBody: PostMoneyTransactionLogRequestBody) => void;
  onCancel: () => void;
  categories: MoneyTransactionCategory[];
  date: string;
}
