import { DateRange } from "shared-types/shared.type";
import { DateRangeSelection } from "./app.type";

export interface Dimensions {
  width?: number;
  height?: number;
}
export interface UseDateRangeSelectionReturn {
  dateRange: DateRange;
  changeDateRange: (dateRange: DateRange | DateRangeSelection) => void;
  selectedDateRangeOption: { value: DateRangeSelection; label: string };
  dateRangeOptions: { value: DateRangeSelection; label: string }[];
  setSelectedDateRangeOption: (option: {
    value: DateRangeSelection;
    label: string;
  }) => void;
}
