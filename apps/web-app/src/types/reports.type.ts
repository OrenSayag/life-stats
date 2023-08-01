import { UseQueryResult } from "react-query";

export interface UseReportReturn {
  monthLabel: string;
  onSwitchMonth: (increment: boolean) => void;
  query: UseQueryResult<Report>;
}

export interface GetReportRequestBody {
  minDate: string;
  maxDate: string;
  formId: string;
}
export interface ReportFormItem {
  value: {
    success: number;
    total: number;
  };
  isDaily: boolean;
  label: string;
}
export interface Report {
  creationTimestamp: string;
  formName: string;
  formItems: {
    [formItemId: string]: ReportFormItem;
  };
}
