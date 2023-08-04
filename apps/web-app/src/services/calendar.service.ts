import { CalendarWeekData, UseCalendarReturn } from "../types/calendar.type";
import { CalendarDate, DateRange } from "shared-types/shared.type";
import { useMemo, useState } from "react";
import UtilitiesService from "./utilities.service";
import { DateRangeSelection } from "../types/app.type";
import moment from "moment";
import axios from "axios";
import config from "../config";
import { useQuery } from "react-query";

class CalendarService {
  public static useCalendar = (): UseCalendarReturn => {
    const [dateRange, setDateRange] = useState<DateRange>(
      UtilitiesService.createDateRange(DateRangeSelection.THIS_MONTH)
    );
    const monthLabel = useMemo<string>(
      () => moment(dateRange.minDate).format("MMM YYYY"),
      [dateRange]
    );
    const onSwitchMonth = (increment: boolean) => {
      let newRange: DateRange;
      const { minDate, maxDate } = dateRange;
      if (increment) {
        newRange = {
          minDate: moment(minDate).add(1, "month").toISOString(),
          maxDate: moment(maxDate).add(1, "month").toISOString(),
        };
      } else {
        newRange = {
          minDate: moment(minDate).subtract(1, "month").toISOString(),
          maxDate: moment(maxDate).subtract(1, "month").toISOString(),
        };
      }
      setDateRange(newRange);
    };

    const queryKey = ["calendar-data", monthLabel];
    const fetchCalendarData = async () => {
      const { minDate, maxDate } = dateRange;
      const queryParams = new URLSearchParams({
        minDate: moment(minDate).format("YYYY-MM-DD"),
        maxDate: moment(maxDate).format("YYYY-MM-DD"),
      });
      const res = await axios.get(
        config.API_HOST + "calendar?" + queryParams.toString(),
        { withCredentials: true }
      );
      return res.data.data.calendarDates as CalendarDate[];
    };

    const query = useQuery<CalendarDate[]>(queryKey, fetchCalendarData);

    const totalDaysInMonth = useMemo<number>(() => {
      const { minDate } = dateRange;
      const month = moment(minDate).month();
      const year = moment(minDate).year();
      return moment([year, month]).daysInMonth();
    }, [dateRange]);

    return {
      monthLabel,
      onSwitchMonth,
      query,
      totalDaysInMonth,
    };
  };

  public static getCalendarWeeks = (
    dates: CalendarDate[]
  ): CalendarWeekData[] => {
    if (dates.length === 0) return [];
    dates = dates.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const firstDate = dates[0];
    const dayOfFirstDate = moment(firstDate.date).day();
    const firstWeek: CalendarWeekData = [];
    for (let i = 0; i < dayOfFirstDate; i++) {
      firstWeek.push(undefined);
    }
    for (let i = 0; i < 7 - dayOfFirstDate; i++) {
      firstWeek.push(dates[i]);
    }
    const weeks: CalendarWeekData[] = [firstWeek];
    dates.slice(7 - dayOfFirstDate).forEach((date, index) => {
      const weekIndex = Math.floor((index + 7) / 7);
      if (!weeks[weekIndex]) weeks[weekIndex] = [];
      weeks[weekIndex].push(date);
    });

    const lastWeek = weeks[weeks.length - 1];
    const lastDate = lastWeek[lastWeek.length - 1];
    for (let i = 0; i < 6 - lastWeek.indexOf(lastDate); i++) {
      lastWeek.push(undefined);
    }

    console.log({ weeks });

    return weeks;
  };
}

export default CalendarService;
