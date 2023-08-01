import { CalendarParams } from "../../types/component-params/calendar.type";
import { CalendarDate } from "shared-types/shared.type";
import { CalendarWeekData } from "../../types/calendar.type";
import CalendarService from "../../services/calendar.service";
import { useMemo } from "react";
import UtilitiesService from "../../services/utilities.service";
import moment from "moment";

const CalendarDayBlock: React.FC<{ item?: CalendarDate }> = ({ item }) => {
  const dateOfItem = useMemo(() => {
    if (item === undefined) return "";
    return new Date(item?.date).getDate();
  }, [item]);
  const isToday = useMemo<boolean>(
    () => moment(item?.date).isSame(new Date(), "d") && item !== undefined,
    [item]
  );
  const isDateFuture = useMemo<boolean>(
    () => moment(item?.date).isAfter(new Date(), "d") && item !== undefined,
    [item]
  );
  return (
    <div
      className={UtilitiesService.classNames(
        "flex items-center justify-center bg-opacity-40 h-24 border-[1px] border-gray-400 border-opacity-10 select-none transition duration-500",
        !isToday && !isDateFuture
          ? item?.isPerfectDay
            ? "bg-success"
            : "bg-error"
          : "bg-gray-800",
        item === undefined && "bg-gray-800"
      )}
    >
      {isDateFuture}
      <div
        className={UtilitiesService.classNames(
          isToday &&
            "bg-green-800 rounded-full h-8 w-8 flex items-center justify-center"
        )}
      >
        {dateOfItem}
      </div>
    </div>
  );
};
const Calendar: React.FC<CalendarParams> = ({ items }) => {
  const weeks = useMemo<CalendarWeekData[]>(() => {
    return CalendarService.getCalendarWeeks(items);
  }, [items]);
  return (
    <div className={"grid grid-cols-7"}>
      {weeks &&
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div
            key={index}
            className={
              "flex items-center justify-center text-center text-white text-sm"
            }
          >
            {day}
          </div>
        ))}
      {weeks &&
        weeks
          .flat()
          .map((date, index) => <CalendarDayBlock item={date} key={index} />)}
    </div>
  );
};

export default Calendar;
