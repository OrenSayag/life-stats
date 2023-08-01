import React, { useMemo } from "react";
import Layout from "../../components/templates/Layout";
import AuthService from "../../services/auth.service";
import Divider from "../../components/atoms/Divider";
import { UserData } from "shared-types/shared.type";
import PreviousButton from "../../components/atoms/PreviousButton";
import NextButton from "../../components/atoms/NextButton";
import moment from "moment";
import { useReport } from "../../services/reports.service";
import Report from "../../components/organisms/Report";
import UtilitiesService from "../../services/utilities.service";

const Filters: React.FC<{
  selectedMonth: string;
  setDateRange: (increment: boolean) => void;
}> = ({ selectedMonth, setDateRange }) => {
  const onPrevious = () => setDateRange(false);
  const onNext = () => setDateRange(true);
  const disableNext = useMemo<boolean>(() => {
    return selectedMonth === moment(new Date()).format("MMM YYYY");
  }, [selectedMonth]);
  return (
    <div
      className={
        "flex border-b-[1px] border-white pt-8 pb-4 flex justify-center"
      }
    >
      <div className={"w-72 flex justify-between items-center"}>
        <PreviousButton onClick={onPrevious} />
        <label className={"text-4xl"}>{selectedMonth}</label>
        {!disableNext && <NextButton onClick={onNext} />}
        {disableNext && <div className={"w-4 h-12"}></div>}
      </div>
    </div>
  );
};

const ReportsView: React.FC<UserData> = ({
  formDefinitions,
  moneyTransactionCategories,
  settings,
}) => {
  const {
    query: { data, isError, isLoading },
    monthLabel,
    onSwitchMonth,
  } = useReport({ formId: formDefinitions[0].objectId });
  return (
    <div className={"flex flex-col items-center"}>
      <Filters selectedMonth={monthLabel} setDateRange={onSwitchMonth} />
      <Divider />
      <div className={UtilitiesService.classNames("p-4 md:w-1/2")}>
        {data && <Report report={data} />}
      </div>
    </div>
  );
};

export default (params: UserData) =>
  Layout({
    view: ReportsView({ ...params }),
    profilePicUrl: params.profilePicUrl as string,
  });

export const getServerSideProps = AuthService.routeGuardMiddleware;
