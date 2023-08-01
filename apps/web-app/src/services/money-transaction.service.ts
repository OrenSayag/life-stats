import {
  GetMoneyTransactionHistoryRequestBody,
  PostMoneyTransactionLogRequestBody,
  UseMoneyTransactionsReturn,
} from "../types/money-transaction.type";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import config from "../config";
import { DayViewDateData } from "../types/day.type";
import {
  MoneyTransaction,
  MoneyTransactionCategory,
  MoneyTransactionsByCategory,
  MoneyTransactionsByDate,
} from "shared-types/shared.type";
import UtilitiesService from "./utilities.service";
import { useMemo } from "react";
import moment from "moment";

class MoneyTransactionService {
  public static getMoneyTransactionCategoryName = (
    moneyTransactionCategories: MoneyTransactionCategory[],
    categoryId?: string
  ) => {
    return (
      moneyTransactionCategories.find((c) => c.objectId === categoryId)?.name ||
      "Default"
    );
  };

  public static useAddMoneyTransaction = (date: string) => {
    const queryClient = useQueryClient();

    const queryKey = ["day-view-data", date];

    return useMutation({
      mutationFn: (requestBody: PostMoneyTransactionLogRequestBody) => {
        return axios.post(config.API_HOST + "money-transaction", requestBody, {
          withCredentials: true,
        });
      },
      onMutate: async (requestBody: PostMoneyTransactionLogRequestBody) => {
        await queryClient.cancelQueries({ queryKey: queryKey });

        const dayViewData = await queryClient.getQueryData<DayViewDateData>(
          queryKey
        );

        const { amount, label, isRevenue, categoryId, objectId, timestamp } =
          requestBody;

        if (dayViewData) {
          const { moneyTransactions } = dayViewData;
          moneyTransactions.push({
            isRevenue,
            category: categoryId,
            label,
            amount,
            objectId,
            timestamp,
          });
          queryClient.setQueriesData<DayViewDateData>(
            queryKey,
            () => dayViewData
          );
        }

        return { dayViewData };
      },
      onError: (err, variables, context) => {
        if (context?.dayViewData) {
          queryClient.setQueryData<DayViewDateData>(
            [queryKey],
            context.dayViewData
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
    });
  };
  public static useDeleteMoneyTransaction = (date: string) => {
    const queryClient = useQueryClient();

    console.log({ date });

    const queryKey = ["day-view-data", date];

    console.log({ queryKey });

    return useMutation({
      mutationFn: (params: { transactionId: string }) => {
        const { transactionId } = params;
        return axios.delete(
          config.API_HOST + "money-transaction/" + transactionId,
          {
            withCredentials: true,
          }
        );
      },
      onMutate: async (params: { transactionId: string }) => {
        console.log(
          "DEBUG money-trnsaction-service: money`transactions after mutation of delete money transaction"
        );
        const { transactionId } = params;

        await queryClient.cancelQueries({ queryKey: queryKey });

        const dayViewData = await queryClient.getQueryData<DayViewDateData>(
          queryKey
        );

        if (dayViewData) {
          const { moneyTransactions } = dayViewData;
          dayViewData.moneyTransactions = moneyTransactions.filter(
            (t) => t.objectId !== transactionId
          );
          console.log(dayViewData.moneyTransactions);
          queryClient.setQueriesData<DayViewDateData>(
            queryKey,
            () => dayViewData
          );
        }

        return { dayViewData };
      },
      onError: (err, variables, context) => {
        if (context?.dayViewData) {
          queryClient.setQueryData<DayViewDateData>(
            [queryKey],
            context.dayViewData
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
    });
  };

  public static useMoneyTransactions = (): UseMoneyTransactionsReturn => {
    const {
      dateRange,
      changeDateRange,
      dateRangeOptions,
      selectedDateRangeOption,
      setSelectedDateRangeOption,
    } = UtilitiesService.useDateRangeSelection();
    const queryKey = ["money-transaction-history", dateRange];
    const getMoneyTransactionHistory =
      async (): Promise<MoneyTransactionsByCategory> => {
        const requestBody: GetMoneyTransactionHistoryRequestBody = dateRange;
        const res = await axios.post(
          config.API_HOST + "money-transaction/get-history",
          requestBody,
          {
            withCredentials: true,
          }
        );
        return res.data.data.moneyTransactions;
      };
    const { data, isError, isLoading } = useQuery<MoneyTransactionsByCategory>(
      queryKey,
      getMoneyTransactionHistory
    );
    const moneyTransactionsByDate = useMemo<MoneyTransactionsByDate>(() => {
      const transactionsByDate: MoneyTransactionsByDate = {};

      for (const categoryId in data) {
        const categoryTransactions: MoneyTransaction[] = data[categoryId];

        for (const transaction of categoryTransactions) {
          const { timestamp } = transaction;

          const formattedDate = moment(timestamp).format("YYYY-MM-DD");

          if (!transactionsByDate.hasOwnProperty(formattedDate)) {
            transactionsByDate[formattedDate] = [];
          }

          transactionsByDate[formattedDate].push(transaction);
        }
      }

      return transactionsByDate;
    }, [data]);
    return {
      isError,
      isLoading,
      moneyTransactionsByCategory: data,
      moneyTransactionsByDate,
      changeDateRange,
      dateRangeOptions,
      selectedDateRangeOption,
      setSelectedDateRangeOption,
    };
  };
}

export default MoneyTransactionService;
