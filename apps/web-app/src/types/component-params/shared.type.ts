import { MoneyTransaction } from "shared-types/shared.type";
import { Dimensions } from "../../types/utilities.type";

export interface PreviousNextButtonParams {
  onClick: () => void;

  // TODO update docs
  dimensions?: Dimensions;

  fill?: string;
}

export interface ViewModeToggleParams {
  label1: string;
  label2: string;
  highlighted: string;
  onChange: () => void;
}

export interface MoneyTransactionLogItemParams {
  moneyTransaction: MoneyTransaction;
  onDelete: (params: { transactionId: string }) => void;
  currency: number;
}

export interface SubmitButtonParams {
  onClick: () => void;
  className?: string;
  dimensions?: Dimensions;
  fill?: string;
}
