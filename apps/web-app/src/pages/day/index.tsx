import React, { useMemo, useState } from "react";
import AuthService from "../../services/auth.service";
import Layout from "../../components/templates/Layout";
import ViewModeToggle from "../../components/molecules/ViewModeToggle";
import DayNavigator from "../../components/molecules/DayNavigator";
import UtilitiesService, { classNames } from "../../services/utilities.service";
import DayService from "../../services/day.service";
import Form from "../../components/organisms/Form";
import MoneyTransactionDayLog from "../../components/organisms/MoneyTransactionDayLog";
import MoneyTransactionService from "../../services/money-transaction.service";
import { Form as FormDefinition, UserData } from "shared-types/shared.type";
import Button from "../../components/ui/button";

import JournalIcon from "../../assets/icons/day/journal.svg";
import Notes from "../../components/day/notes";

export const ViewModes = {
  FORM: {
    label: "Form",
  },
  FINANCE: {
    label: "Finance",
  },
  NOTES: {
    label: "Notes",
  },
  GRAPH: {
    label: "Graph",
  },
  HISTORY: {
    label: "History",
  },
} as const;

export type ViewMode = typeof ViewModes[keyof typeof ViewModes];

const DayView: React.FC<UserData> = ({
  formDefinitions,
  moneyTransactionCategories,
  settings,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewModes.FORM);
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

  const toggleViewMode = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const [lastViewMode, setLastViewMode] = useState<ViewMode>();

  const toggleNotesViewMode = () => {
    const isNotesViewMode = viewMode === ViewModes.NOTES;
    if (!isNotesViewMode) {
      setLastViewMode(viewMode);
      setViewMode(ViewModes.NOTES);
    } else {
      setViewMode(lastViewMode || ViewModes.FORM);
    }
  };

  return (
    <div>
      <div
        className={
          "flex h-12 w-full mb-12 lg:mb-12 bg-dark-200 bg-opacity-80 lg:px-4 justify-between"
        }
      >
        <Button className={"ml-4"} onClick={toggleNotesViewMode}>
          <JournalIcon
            fill={"#fff"}
            className={classNames(
              "hover:fill-success",
              viewMode === ViewModes.NOTES && "fill-success"
            )}
          />
        </Button>
        <ViewModeToggle
          mode={viewMode}
          modes={[ViewModes.FORM, ViewModes.FINANCE]}
          onChange={toggleViewMode}
          className={
            viewMode !== ViewModes.FINANCE &&
            viewMode !== ViewModes.FORM &&
            "hidden"
          }
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
            viewMode !== ViewModes.FORM && "hidden",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <Form formLog={formLog} />
        </div>
        <div
          className={[
            "w-full flex justify-center",
            viewMode !== ViewModes.FINANCE && "hidden",
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
        <div
          className={classNames(
            "w-full flex justify-center",
            viewMode !== ViewModes.NOTES && "hidden"
          )}
        >
          <Notes date={date} notes={data?.notes || []} />
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
