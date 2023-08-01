import React from "react";
import { MoneyTransactionLogItemParams } from "../../types/component-params/shared.type";
import UtilitiesService from "../../services/utilities.service";
import TrashButton from "../../components/atoms/TrashButton";

const MoneyTransactionLogItem: React.FC<MoneyTransactionLogItemParams> = ({
  onDelete,

  moneyTransaction,
  currency,
}) => {
  const { amount, objectId, label, isRevenue, timestamp, category } =
    moneyTransaction;

  return (
    <div className={"flex justify-between items-center w-full"}>
      <div className={"flex gap-1 items-start"}>
        <TrashButton
          onClick={() => onDelete({ transactionId: objectId || "" })}
          fill={"white"}
        />
        <div className={"flex flex-col"}>
          <label className={"text-3xl"}>{category}</label>
          <label className={"text-xl"}>{label}</label>
          <label>
            {UtilitiesService.formatIsoStringToHoursAndMinutes(timestamp)}
          </label>
        </div>
      </div>
      <div
        className={[`text-5xl`, isRevenue ? "text-success" : "text-error"]
          .filter(Boolean)
          .join(" ")}
      >
        {UtilitiesService.formatMoneyAmount(amount)}
        {UtilitiesService.determineCurrencySymbol(currency)}
      </div>
    </div>
  );
};

export default MoneyTransactionLogItem;
