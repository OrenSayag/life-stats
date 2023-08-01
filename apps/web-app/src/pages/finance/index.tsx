import React, { FC, useMemo, useState } from "react";
import ViewModeToggle from "../../components/molecules/ViewModeToggle";
import Layout from "../../components/templates/Layout";
import AuthService from "../../services/auth.service";
import Divider from "../../components/atoms/Divider";
import {
  MoneyTransaction,
  MoneyTransactionCategory,
  MoneyTransactionsByDate,
  UserData,
} from "shared-types/shared.type";
import strings from "../../assets/strings";
import DateRangeSelector from "../../components/molecules/DateRangeSelector";
import { DateRangeSelection } from "../../types/app.type";
import UtilitiesService from "../../services/utilities.service";
import MoneyTransactionService from "../../services/money-transaction.service";
import PieChart from "../../components/organisms/PieChart";

const VIEW_MODES = {
  GRAPH: {
    label: "Graph",
  },
  HISTORY: {
    label: "History",
  },
};

const RADIAN = Math.PI / 180;

const Filters: React.FC<{
  selectedDateRangeOption: { value: DateRangeSelection; label: string };
  dateRangeOptions: { value: DateRangeSelection; label: string }[];
  setSelectedDateRangeOption: (option: {
    value: DateRangeSelection;
    label: string;
  }) => void;
}> = ({
  selectedDateRangeOption,
  setSelectedDateRangeOption,
  dateRangeOptions,
}) => {
  return (
    <div className={"flex border-b-[1px] pl-2 border-white pt-8 pb-4"}>
      <DateRangeSelector
        dateRangeOptions={dateRangeOptions}
        selectedDateRangeOption={selectedDateRangeOption}
        setSelectedDateRangeOption={setSelectedDateRangeOption}
        selectInputLabel={strings.finance.FILTERS.DATE_RANGE_SELECTOR_LABEL}
        selectInputLabelId={
          strings.finance.FILTERS.DATE_RANGE_SELECTOR_LABEL_ID
        }
      />
    </div>
  );
};

const HistoryList: React.FC<{
  data: MoneyTransactionsByDate;
  currency: number;
  className?: string;
  moneyTransactionCategories: MoneyTransactionCategory[];
}> = ({ data, className, currency, moneyTransactionCategories }) => {
  const DateLog: FC<{
    moneyTransactions: MoneyTransaction[];
    date: string;
  }> = ({ moneyTransactions, date }) => {
    const getCategoryName = (id: string): string => {
      return moneyTransactionCategories.find((c) => c.objectId === id)?.name;
    };
    return (
      <div className={"w-full min-w-fit p-4 rounded-lg border-2"}>
        <label className={"text-3xl underline leading-24"}>
          {UtilitiesService.formatDate(date)}
        </label>
        <div className={"flex flex-col gap-4"}>
          {moneyTransactions.map((t) => (
            <div key={t.objectId}>
              <label className={"text-2xl"}>{t.label}</label>
              <h4 className={"text-3xl"}>{getCategoryName(t.category)}</h4>
              <h4
                className={UtilitiesService.classNames(
                  t.isRevenue ? "text-success" : "text-error",
                  "text-4xl"
                )}
              >
                {t.isRevenue ? "+" : "-"}
                {t.amount}
                {UtilitiesService.determineCurrencySymbol(currency)}
              </h4>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div
      className={["flex flex-col gap-2 items-center", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={"w-full px-6 flex flex-col gap-4 items-center"}>
        {Object.keys(data || {})
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
          .map((date) => (
            <DateLog key={date} moneyTransactions={data[date]} date={date} />
          ))}
      </div>
    </div>
  );
};

const RevenueDisplay: FC<{ revenue: number; currency: number }> = ({
  revenue,
  currency,
}) => {
  return (
    <div className={"text-3xl flex gap-3"}>
      <label>{strings.finance.TOTAL_REVENUE}</label>
      <h5 className={revenue > 0 ? "text-success" : "text-error"}>
        {UtilitiesService.formatMoneyAmount(revenue)}
        {UtilitiesService.determineCurrencySymbol(currency)}
      </h5>
    </div>
  );
};

const FinanceView: React.FC<UserData> = ({
  formDefinitions,
  moneyTransactionCategories,
  settings,
}) => {
  const [viewMode, setViewMode] = useState<string>(VIEW_MODES.GRAPH.label);

  const toggleViewMode = () =>
    setViewMode(
      viewMode === VIEW_MODES.GRAPH.label
        ? VIEW_MODES.HISTORY.label
        : VIEW_MODES.GRAPH.label
    );

  const {
    selectedDateRangeOption,
    setSelectedDateRangeOption,
    dateRangeOptions,
    moneyTransactionsByDate,
    moneyTransactionsByCategory,
    isError,
    isLoading,
  } = MoneyTransactionService.useMoneyTransactions();

  const pieChartData = useMemo<{
    expenses: {
      key: string;
      value: number;
    }[];
    revenue: {
      key: string;
      value: number;
    }[];
  }>(() => {
    const totalExpensesPerCategory: { key: string; value: number }[] = [];
    for (const categoryId in moneyTransactionsByCategory) {
      const totalExpensesAmountForCategory = moneyTransactionsByCategory[
        categoryId
      ].reduce((previousValue, currentValue, currentIndex, array) => {
        return (
          previousValue + (currentValue.isRevenue ? 0 : currentValue.amount)
        );
      }, 0);

      totalExpensesPerCategory.push({
        key: categoryId,
        value: totalExpensesAmountForCategory,
      });
    }
    const totalRevenuePerCategory: { key: string; value: number }[] = [];
    for (const categoryId in moneyTransactionsByCategory) {
      const totalRevenueAmountForCategory = moneyTransactionsByCategory[
        categoryId
      ].reduce((previousValue, currentValue, currentIndex, array) => {
        return (
          previousValue + (currentValue.isRevenue ? currentValue.amount : 0)
        );
      }, 0);

      totalRevenuePerCategory.push({
        key: categoryId,
        value: totalRevenueAmountForCategory,
      });
    }
    return {
      expenses: totalExpensesPerCategory.filter((d) => d.value !== 0),
      revenue: totalRevenuePerCategory.filter((d) => d.value !== 0),
    };
  }, [moneyTransactionsByCategory]);

  const revenue = useMemo<number>(() => {
    return []
      .concat(...Object.values(moneyTransactionsByCategory || {}))
      .reduce((previousValue, currentValue, currentIndex, array) => {
        return (
          previousValue +
          currentValue.amount * (currentValue.isRevenue ? 1 : -1)
        );
      }, 0);
  }, [moneyTransactionsByCategory]);

  const renderExpensesPieChartLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const categoryId = pieChartData?.expenses?.[index].key;

    let categoryName = moneyTransactionCategories.find(
      (c) => c.objectId === categoryId
    )?.name;

    if (categoryId === "uncategorized") {
      categoryName = "uncategorized";
    }

    const categoryTotalAmount = pieChartData?.expenses?.[index].value;

    return (
      <text
        x={x}
        y={y}
        fill="#D32F2F"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${categoryName}: `}
        {`${UtilitiesService.formatMoneyAmount(categoryTotalAmount)}`}
        {`${UtilitiesService.determineCurrencySymbol(
          settings.finance.currency
        )}`}
      </text>
    );
  };
  const renderRevenuePieChartLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const categoryId = pieChartData?.revenue?.[index].key;

    let categoryName = moneyTransactionCategories.find(
      (c) => c.objectId === categoryId
    )?.name;

    if (categoryId === "uncategorized") {
      categoryName = "uncategorized";
    }

    const categoryTotalAmount = pieChartData?.revenue?.[index].value;

    return (
      <text
        x={x}
        y={y}
        fill="#309700"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${categoryName}: ${UtilitiesService.formatMoneyAmount(
          categoryTotalAmount
        )}${UtilitiesService.determineCurrencySymbol(
          settings.finance.currency
        )}`}
      </text>
    );
  };

  return (
    <div>
      <Filters
        setSelectedDateRangeOption={setSelectedDateRangeOption}
        selectedDateRangeOption={selectedDateRangeOption}
        dateRangeOptions={dateRangeOptions}
      />
      <div className={"flex items-center"}>
        <div className={"w-5/6 pl-6"}>
          <RevenueDisplay
            revenue={revenue}
            currency={settings.finance.currency}
          />
        </div>
        <ViewModeToggle
          label1={VIEW_MODES.GRAPH.label}
          label2={VIEW_MODES.HISTORY.label}
          highlighted={viewMode}
          onChange={toggleViewMode}
        />
      </div>
      <Divider />
      {viewMode === VIEW_MODES.GRAPH.label && moneyTransactionsByCategory && (
        <div className={"grid grid-cols-2 my-8"}>
          <div className={"flex flex-col items-center"}>
            <h3 className={"underline text-3xl"}>
              {strings.finance.EXPENSES_TITLE}
            </h3>
            <PieChart
              data={pieChartData.expenses}
              className={"mt-24"}
              renderLabel={renderExpensesPieChartLabel}
            />
          </div>
          <div className={"flex flex-col items-center"}>
            <h3 className={"underline text-3xl"}>
              {strings.finance.REVENUE_TITLE}
            </h3>
            <PieChart
              data={pieChartData.revenue}
              className={"mt-24"}
              renderLabel={renderRevenuePieChartLabel}
            />
          </div>
        </div>
      )}
      {viewMode === VIEW_MODES.HISTORY.label && moneyTransactionsByDate && (
        <HistoryList
          moneyTransactionCategories={moneyTransactionCategories}
          data={moneyTransactionsByDate}
          className={"mt-24"}
          currency={settings.finance.currency}
        />
      )}
    </div>
  );
};

export default (params: UserData) =>
  Layout({
    view: FinanceView({ ...params }),
    profilePicUrl: params.profilePicUrl as string,
  });

export const getServerSideProps = AuthService.routeGuardMiddleware;
