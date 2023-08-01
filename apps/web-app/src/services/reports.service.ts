import axios from "axios";
import {
  GetReportRequestBody,
  Report,
  UseReportReturn,
} from "../types/reports.type";
import config from "../config";
import { useQuery } from "react-query";
import { useMemo, useState } from "react";
import moment from "moment/moment";
import { DateRange } from "shared-types/shared.type";
import UtilitiesService from "./utilities.service";
import { DateRangeSelection } from "../types/app.type";

export const useReport = (params: { formId: string }): UseReportReturn => {
  const { formId } = params;

  const [dateRange, setDateRange] = useState<DateRange>(
    UtilitiesService.createDateRange(DateRangeSelection.THIS_MONTH)
  );
  const getReport = async () => {
    const requestBody: GetReportRequestBody = {
      minDate: dateRange.minDate,
      maxDate: dateRange.maxDate,
      formId,
    };
    const res = await axios.post(
      config.API_HOST + "reports/get-report",
      requestBody,
      { withCredentials: true }
    );
    console.log(res.data);
    return res.data.data as Report;
  };

  const monthLabel = useMemo<string>(
    () => moment(dateRange.minDate).format("MMM YYYY"),
    [dateRange]
  );

  const onSwitchMonth = (increment: boolean) => {
    let newRange: DateRange;
    const { minDate, maxDate } = dateRange;
    if (increment) {
      newRange = {
        minDate: moment(minDate).add(1, "month").toISOString(),
        maxDate: moment(maxDate).add(1, "month").toISOString(),
      };
    } else {
      newRange = {
        minDate: moment(minDate).subtract(1, "month").toISOString(),
        maxDate: moment(maxDate).subtract(1, "month").toISOString(),
      };
    }
    setDateRange(newRange);
  };

  const queryKey = ["report", dateRange.minDate, dateRange.maxDate, formId];
  const query = useQuery<Report>(queryKey, getReport);

  return {
    monthLabel,
    onSwitchMonth,
    query,
  };
};
