import { MoneyTransaction, Note } from "shared-types/shared.type";

export interface DayViewDateData {
  forms: any; // Object that groups form shared-types by keys. Each key contains a form depending on the time.
  moneyTransactions: MoneyTransaction[];
  notes: Note[];
}
