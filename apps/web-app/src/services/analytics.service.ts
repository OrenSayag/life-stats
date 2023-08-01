import {
  FormAnalytics,
  GetAnalyticsForFormRequestBody,
  UseFormAnalyticsDataReturn,
} from "../types/analytics.type";
import axios from "axios";
import config from "../config";
import { useQuery } from "react-query";
import UtilitiesService from "./utilities.service";

class AnalyticsService {
  public static useFormAnalyticsData = (params: {
    formDefinitionId: string;
  }): UseFormAnalyticsDataReturn => {
    const {
      dateRange,
      dateRangeOptions,
      selectedDateRangeOption,
      setSelectedDateRangeOption,
      changeDateRange,
    } = UtilitiesService.useDateRangeSelection();
    const { formDefinitionId } = params;

    const queryKey = [formDefinitionId, dateRange];
    const fetchFormAnalyticsData = async (): Promise<FormAnalytics> => {
      const requestBody: GetAnalyticsForFormRequestBody = dateRange;
      const analyticsData: any = await axios.post(
        config.API_HOST + "analytics/get/" + formDefinitionId,
        requestBody,
        {
          withCredentials: true,
        }
      );
      return analyticsData.data.data;
    };

    const query = useQuery<FormAnalytics>(queryKey, fetchFormAnalyticsData);

    return {
      query,
      changeDateRange,
      dateRangeOptions,
      selectedDateRangeOption,
      setSelectedDateRangeOption,
    };
  };
}

export default AnalyticsService;
