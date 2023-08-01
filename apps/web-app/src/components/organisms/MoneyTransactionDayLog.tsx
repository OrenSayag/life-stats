import React, { useState } from "react";
import { MoneyTransactionDayLogParams } from "../../types/component-params/day.type";
import DayService from "../../services/day.service";
import Card from "../../components/atoms/Card";
import Divider from "../../components/atoms/Divider";
import SubtractButton from "../../components/atoms/SubtractButton";
import AddButton from "../../components/atoms/AddButton";
import MoneyTransactionLogItem from "../../components/molecules/MoneyTransactionLogItem";
import AddMoneyTransactionForm from "../../components/molecules/AddMoneyTransactionForm";
import MoneyTransactionService from "../../services/money-transaction.service";
import { PostMoneyTransactionLogRequestBody } from "../../types/money-transaction.type";
import UtilitiesService from "../../services/utilities.service";

const PADDING = "xl:p-6 p-4";
const PADDING_X = "xl:px-24";

const MoneyTransactionDayLog: React.FC<MoneyTransactionDayLogParams> = ({
  moneyTransactions,
  currency,
  date,
  moneyTransactionCategories,
}) => {
  const expenses = DayService.calcOverallExpenses(moneyTransactions);
  const [addTransactionMode, setAddTransactionMode] = useState<{
    active: boolean;
    revenue: boolean;
  }>({ revenue: false, active: false });
  const toggleAddTransactionMode = (revenue?: boolean) =>
    setAddTransactionMode({
      active: !addTransactionMode.active,
      revenue: revenue !== undefined ? revenue : addTransactionMode.revenue,
    });
  const determineExpensesColor = () => {
    return expenses > 0 ? "error" : "success";
  };
  const { mutate: onAddTransactionMutate } =
    MoneyTransactionService.useAddMoneyTransaction(date);
  const onAddTransaction = (
    requestBody: PostMoneyTransactionLogRequestBody
  ) => {
    onAddTransactionMutate(requestBody);
    toggleAddTransactionMode();
  };
  const { mutate: onDeleteTransactionMutate } =
    MoneyTransactionService.useDeleteMoneyTransaction(date);
  return (
    <Card
      className={"xl:w-1/2 w-full mt-6 mx-6 flex flex-col items-center gap-6"}
    >
      <div
        className={["flex gap-6 items-center justify-center", PADDING]
          .filter(Boolean)
          .join(" ")}
      >
        <label className={"text-3xl"}>Expenses:</label>
        <div
          className={[`text-${determineExpensesColor()} text-3xl`]
            .filter(Boolean)
            .join(" ")}
        >
          {UtilitiesService.formatMoneyAmount(expenses)}
          {UtilitiesService.determineCurrencySymbol(currency)}
        </div>
      </div>
      <Divider />
      <div
        className={[
          "w-full flex flex-col items-center gap-6",
          addTransactionMode.active && "hidden",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={"flex justify-between w-1/3 min-w-24"}>
          <SubtractButton
            onClick={() => toggleAddTransactionMode(false)}
            fill={"#D32F2F"}
          />
          <AddButton
            onClick={() => toggleAddTransactionMode(true)}
            fill={"#309700"}
          />
        </div>
        <Divider className={"bg-primary"} />
        <div
          className={["flex flex-col gap-3 items-center w-full p-6"]
            .filter(Boolean)
            .join(" ")}
        >
          {UtilitiesService.sortArrayObjectsByTimestamp(moneyTransactions).map(
            (t) => (
              <MoneyTransactionLogItem
                key={t.objectId}
                moneyTransaction={t}
                onDelete={onDeleteTransactionMutate}
                currency={currency}
              />
            )
          )}
        </div>
      </div>
      {addTransactionMode.active && (
        <div
          className={["w-full flex flex-col items-center gap-6"]
            .filter(Boolean)
            .join(" ")}
        >
          <AddMoneyTransactionForm
            isRevenue={addTransactionMode.revenue}
            onSubmit={onAddTransaction}
            onCancel={() =>
              toggleAddTransactionMode(addTransactionMode.revenue)
            }
            categories={moneyTransactionCategories}
            date={date}
          />
        </div>
      )}
    </Card>
  );
};

export default MoneyTransactionDayLog;
