import React, { FC, useMemo } from "react";
import Layout from "../../components/templates/Layout";
import AuthService from "../../services/auth.service";
import Divider from "../../components/atoms/Divider";
import { UserData } from "shared-types/shared.type";
import CalendarService from "../../services/calendar.service";
import PreviousButton from "../../components/atoms/PreviousButton";
import NextButton from "../../components/atoms/NextButton";
import moment from "moment";
import Calendar from "../../components/organisms/Calendar";

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

const DayBalanceDisplay: FC<{
  totalSuccess: number;
  totalFailed: number;
  total: number;
}> = ({ total, totalSuccess, totalFailed }) => {
  return (
    <div
      className={
        "flex justify-center items-center text-3xl my-4 tracking-wider"
      }
    >
      <span className={"text-success"}>{totalSuccess}</span>
      <span>:</span>
      <span className={"text-error"}>{totalFailed}</span>
      <span>/</span>
      <span>{total}</span>
    </div>
  );
};

const CalendarView: React.FC<UserData> = ({
  formDefinitions,
  moneyTransactionCategories,
  settings,
}) => {
  const {
    query: { data, isError, isLoading },
    monthLabel,
    onSwitchMonth,
    totalDaysInMonth,
  } = CalendarService.useCalendar();
  const { totalFailed, totalSuccess } = useMemo<{
    totalSuccess: number;
    totalFailed: number;
  }>(() => {
    return {
      totalFailed: data?.filter((d) => !d.isPerfectDay).length,
      totalSuccess: data?.filter((d) => d.isPerfectDay).length,
    };
  }, [data]);
  return (
    <div>
      <Filters selectedMonth={monthLabel} setDateRange={onSwitchMonth} />
      <Divider />
      <DayBalanceDisplay
        totalSuccess={totalSuccess}
        totalFailed={totalFailed}
        total={totalDaysInMonth}
      />
      <Divider />
      <div className={"p-4"}>
        <Calendar items={data || []} />
      </div>
    </div>
  );
};

export default (params: UserData) =>
  Layout({
    view: CalendarView({ ...params }),
    profilePicUrl: params.profilePicUrl as string,
  });

export const getServerSideProps = AuthService.routeGuardMiddleware;
