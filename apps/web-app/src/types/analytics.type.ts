import { UseQueryResult } from "react-query";
import { DateRange, Form } from "shared-types/shared.type";
import { DateRangeSelection } from "./app.type";

export interface UseFormAnalyticsDataReturn {
  query: UseQueryResult<FormAnalytics>;
  changeDateRange: (dateRange: DateRange | DateRangeSelection) => void;
  selectedDateRangeOption: { value: DateRangeSelection; label: string };
  dateRangeOptions: { value: DateRangeSelection; label: string }[];
  setSelectedDateRangeOption: (option: {
    value: DateRangeSelection;
    label: string;
  }) => void;
}
export interface GetAnalyticsForFormRequestBody {
  minDate: string;
  maxDate: string;
}

export interface FormAnalytics {
  items: any; // object containing form item names as keys, each includes an array of AnalyticsFormItem
  form: Form; // the form definition
  minDate: string;
  maxDate: string;
}
