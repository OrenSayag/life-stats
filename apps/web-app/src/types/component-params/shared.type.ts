import { MoneyTransaction } from "shared-types/shared.type";
import { Dimensions } from "../../types/utilities.type";
import { ViewModes, ViewMode } from "../../pages/day";

export interface PreviousNextButtonParams {
  onClick: (e?: React.MouseEvent<HTMLElement>) => void;

  // TODO update docs
  dimensions?: Dimensions;

  fill?: string;
}

export interface ViewModeToggleParams {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
  modes: [ViewMode, ViewMode];
  className?: string;
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
