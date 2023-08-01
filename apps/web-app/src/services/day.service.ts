import { DayViewDateData } from "../types/day.type";
import axios from "axios";
import config from "../config";
import { useQuery } from "react-query";
import { MoneyTransaction } from "shared-types/shared.type";

const STALE_TIME_MIN = 10 * 60 * 1_000;
class DayService {
  public static useDayData = (date: string) => {
    const fetchData = async () => {
      const res = await axios.get(config.API_HOST + "day/" + date, {
        withCredentials: true,
      });
      if (!res.data.success) {
        throw new Error("Failed to fetch day data");
      }
      return res.data.data as DayViewDateData;
    };

    return useQuery<DayViewDateData>(["day-view-data", date], fetchData, {
      staleTime: STALE_TIME_MIN,
    });
  };

  public static getFormStateData = (
    selectedFormDefinitionId: string,
    dayData?: DayViewDateData
  ) => {
    if (!dayData) {
      return;
    }
    const { forms } = dayData;
    return forms[selectedFormDefinitionId];
  };

  public static calcOverallExpenses = (
    moneyTransactions: MoneyTransaction[]
  ): number => {
    const expenses = moneyTransactions.filter((t) => !t.isRevenue);
    console.log("debug dayService");
    console.log(expenses);
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    console.log({ totalExpenses });
    return totalExpenses;
  };
}

export default DayService;
