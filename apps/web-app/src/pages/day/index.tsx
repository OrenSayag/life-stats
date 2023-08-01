import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import Layout from "../../components/templates/Layout";
import ViewModeToggle from "../../components/molecules/ViewModeToggle";
import DayNavigator from "../../components/molecules/DayNavigator";
import UtilitiesService from "../../services/utilities.service";
import DayService from "../../services/day.service";
import Form from "../../components/organisms/Form";
import MoneyTransactionDayLog from "../../components/organisms/MoneyTransactionDayLog";
import MoneyTransactionService from "../../services/money-transaction.service";
import { Form as FormDefinition, UserData } from "shared-types/shared.type";

const VIEW_MODES = {
  FORM: {
    label: "Form",
  },
  FINANCE: {
    label: "Finance",
  },
};

const DayView: React.FC<UserData> = ({
  formDefinitions,
  moneyTransactionCategories,
  settings,
}) => {
  const [viewMode, setViewMode] = useState<string>(VIEW_MODES.FORM.label);
  const [date, setDate] = useState<string>(
    UtilitiesService.getDateString("israel")
  );
  const [selectedFormDefinition, setSelectedFormDefinition] =
    useState<FormDefinition>(formDefinitions[0]);
  const modifyDate = (increment: boolean) => {
    setDate(UtilitiesService.modifyDateByDays("israel", date, 1, increment));
  };

  const { data, isLoading, isError } = DayService.useDayData(
    UtilitiesService.getDateString(
      "computer",
      UtilitiesService.dateStringToDate(date, "israel")
    )
  );

  const formLog = DayService.getFormStateData(
    selectedFormDefinition.objectId,
    data
  );

  const toggleViewMode = () =>
    setViewMode(
      viewMode === VIEW_MODES.FORM.label
        ? VIEW_MODES.FINANCE.label
        : VIEW_MODES.FORM.label
    );

  return (
    <div>
      <div className={"flex"}>
        <div className={"w-5/6"}></div>
        <ViewModeToggle
          label1={VIEW_MODES.FORM.label}
          label2={VIEW_MODES.FINANCE.label}
          highlighted={viewMode}
          onChange={toggleViewMode}
        />
      </div>
      <div className={"flex justify-center"}>
        <DayNavigator
          date={date}
          onChange={modifyDate}
          dateColor={formLog?.isPerfect ? "success" : undefined}
        />
      </div>
      <div className={"flex justify-center"}>
        <div
          className={[
            "w-full flex justify-center",
            viewMode !== VIEW_MODES.FORM.label && "hidden",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <Form formLog={formLog} />
        </div>
        <div
          className={[
            "w-full flex justify-center",
            viewMode !== VIEW_MODES.FINANCE.label && "hidden",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {data?.moneyTransactions && formLog && (
            <MoneyTransactionDayLog
              moneyTransactions={data?.moneyTransactions.map((t) => ({
                ...t,
                category:
                  MoneyTransactionService.getMoneyTransactionCategoryName(
                    moneyTransactionCategories,
                    t.category
                  ),
              }))}
              currency={settings.finance.currency}
              moneyTransactionCategories={moneyTransactionCategories}
              date={formLog.date}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default (params: UserData) =>
  Layout({
    view: DayView({ ...params }),
    profilePicUrl: params.profilePicUrl as string,
  });

export const getServerSideProps = AuthService.routeGuardMiddleware;
