import React, { Ref, RefObject, useEffect, useState } from "react";
import {
  Dimensions,
  UseDateRangeSelectionReturn,
} from "../types/utilities.type";
import config from "../config";
import { DateFormat, DateRangeSelection } from "../types/app.type";
import ObjectID from "bson-objectid";
import moment from "moment/moment";
import { DateRange } from "shared-types/shared.type";
import strings from "../assets/strings";

class UtilitiesService {
  public static formatDate = (date: string) => {
    return moment(date).format("DD/MM/YY");
  };
  public static useIsMobileView = (): boolean => {
    const { width } = UtilitiesService.useWindowDimension();
    return width < config.DESKTOP_WIDTH_PX;
  };
  private static useWindowDimension = (): Dimensions => {
    const [windowDimensions, setWindowDimensions] = useState<Dimensions>({
      width: 0,
      height: 0,
    });

    useEffect(() => {
      function handleResize(): void {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      handleResize();
      window.addEventListener("resize", handleResize);
      return (): void => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowDimensions;
  };

  public static capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public static getDayOfWeek(dateString: string, format: DateFormat): string {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = this.dateStringToDate(dateString, format);
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
  }

  public static getDateString(format: DateFormat, date = new Date()): string {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    if (format === "israel") {
      return `${day}/${month}/${year}`;
    }
    if (format === "computer") {
      return `${year}-${month}-${day}`;
    }
    return "";
  }

  public static dateStringToDate(dateString: string, format: DateFormat): Date {
    return format === "israel"
      ? new Date(dateString.split("/").reverse().join("-"))
      : new Date(dateString);
  }

  public static modifyDateByDays(
    format: DateFormat,
    dateString: string,
    x: number,
    increment: boolean
  ): string {
    const date = this.dateStringToDate(dateString, format);
    const dayInMilliseconds = 1000 * 60 * 60 * 24;
    const direction = increment ? 1 : -1;
    const newDate = new Date(
      date.getTime() + x * dayInMilliseconds * direction
    );
    const day = ("0" + newDate.getDate()).slice(-2);
    const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    const year = newDate.getFullYear();
    if (format === "israel") {
      return `${day}/${month}/${year}`;
    }
    if (format === "computer") {
      return `${year}-${month}-${day}`;
    }
    return "";
  }

  public static isDateBeforeTomorrow(
    dateString: string,
    format: DateFormat
  ): boolean {
    const date = this.dateStringToDate(dateString, format);
    const today = new Date();
    const nextDay = new Date(new Date().setDate(today.getDate() + 1));
    return (
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0
      ).getTime() <
      new Date(
        nextDay.getFullYear(),
        nextDay.getMonth(),
        nextDay.getDate(),
        0,
        0,
        0
      ).getTime() -
        24 * 1_000 * 3_600
    );
  }

  public static determineCurrencySymbol(currencyIndex: number) {
    switch (currencyIndex) {
      case 0:
        return "₪";
      case 1:
        return "$";
      case 2:
        return "€";
      default:
        return "";
    }
  }

  public static formatMoneyAmount(x: number): string {
    const amountContainsFraction = x.toString().includes(".");
    if (amountContainsFraction) {
      const integer = x.toString().split(".")[0];
      const fraction = x.toString().split(".")[1];
      return (
        integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + fraction.slice(-2)
      );
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  public static timestamp() {
    const t = new Date();
    const z = t.getTimezoneOffset() * 60 * 1000;
    let tLocal: any = (t as any) - z;
    tLocal = new Date(tLocal);
    return tLocal.toISOString();
  }

  public static formatIsoStringToHoursAndMinutes(timestamp: string) {
    const date = new Date(timestamp);
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");

    return `${hour}:${minute}`;
  }

  public static sortArrayObjectsByTimestamp(arr: any[]) {
    const someElementsContainNoTimestamp = arr.some((e) => !e.timestamp);
    if (someElementsContainNoTimestamp) {
      throw new Error("Logic error in sortArrayObjectsByTimestamp");
    }
    return arr.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  public static createObjectId() {
    return ObjectID().toHexString();
  }

  public static useClickOutside = (
    ref: RefObject<HTMLElement>,
    callback: () => void
  ) => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    useEffect(() => {
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    });
  };
  public static useClickInside = (
    ref: RefObject<HTMLElement>,
    callback: () => void
  ) => {
    const handleClick = (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        callback();
      }
    };
    useEffect(() => {
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    });
  };

  public static createDateRange(
    dateRange: DateRangeSelection | DateRange
  ): DateRange {
    if (typeof dateRange !== "number") {
      return dateRange as DateRange;
    }
    switch (dateRange) {
      case DateRangeSelection.THIS_MONTH:
        const startOfMonth = moment().startOf("month").toISOString();
        const endOfMonth = moment().endOf("month").toISOString();
        return { minDate: startOfMonth, maxDate: endOfMonth };
      case DateRangeSelection.LAST_MONTH:
        const startOfLastMonth = moment()
          .subtract(1, "month")
          .startOf("month")
          .toISOString();
        const endOfLastMonth = moment()
          .subtract(1, "month")
          .endOf("month")
          .toISOString();
        return {
          minDate: startOfLastMonth,
          maxDate: endOfLastMonth,
        };
      case DateRangeSelection.LAST_3_MONTHS:
        const startOfLastThreeMonths = moment()
          .subtract(3, "months")
          .startOf("month")
          .toISOString();

        const endOfLastThreeMonths = moment().endOf("month").toISOString();
        return {
          minDate: startOfLastThreeMonths,
          maxDate: endOfLastThreeMonths,
        };
      case DateRangeSelection.LAST_6_MONTHS:
        const startOfLastSixMonths = moment()
          .subtract(6, "months")
          .startOf("month")
          .toISOString();

        const endOfLastSixMonths = moment().endOf("month").toISOString();
        return {
          minDate: startOfLastSixMonths,
          maxDate: endOfLastSixMonths,
        };
      case DateRangeSelection.LAST_YEAR:
        const startOfLastYear = moment().startOf("year").toISOString();

        const endOfLastYear = moment().endOf("year").toISOString();
        return {
          minDate: startOfLastYear,
          maxDate: endOfLastYear,
        };
      default:
        throw "Logic error in createAnalyticsDateRange";
    }
  }

  public static useDateRangeSelection = (): UseDateRangeSelectionReturn => {
    const [dateRange, setDateRange] = useState<DateRange>(
      UtilitiesService.createDateRange(DateRangeSelection.THIS_MONTH)
    );

    const dateRangeOptions: { label: string; value: any }[] = [
      {
        label: moment().format("MMMM"),
        value: DateRangeSelection.THIS_MONTH,
      },
      {
        label: moment().subtract(1, "month").format("MMMM"),
        value: DateRangeSelection.LAST_MONTH,
      },
      {
        label: strings.shared.FILTERS.DATE_RANGE_OPTIONS.LAST_3_MONTHS,
        value: DateRangeSelection.LAST_3_MONTHS,
      },
      {
        label: strings.shared.FILTERS.DATE_RANGE_OPTIONS.LAST_6_MONTHS,
        value: DateRangeSelection.LAST_6_MONTHS,
      },
      {
        label: strings.shared.FILTERS.DATE_RANGE_OPTIONS.LAST_YEAR,
        value: DateRangeSelection.LAST_YEAR,
      },
      {
        label: strings.shared.FILTERS.DATE_RANGE_OPTIONS.CUSTOM,
        value: DateRangeSelection.CUSTOM,
      },
    ];

    const [selectedDateRangeOption, setSelectedDateRangeOption] = useState<{
      label: string;
      value: any;
    }>(dateRangeOptions[0]);

    useEffect(() => {
      if (selectedDateRangeOption.value === DateRangeSelection.CUSTOM) {
        return;
      }
      changeDateRange(selectedDateRangeOption.value);
    }, [selectedDateRangeOption]);

    const changeDateRange = (dateRange: DateRangeSelection | DateRange) => {
      setDateRange(UtilitiesService.createDateRange(dateRange));
    };

    return {
      dateRange,
      selectedDateRangeOption,
      changeDateRange,
      dateRangeOptions,
      setSelectedDateRangeOption,
    };
  };
}

export const classNames = (...strings) => {
  return [...strings].filter(Boolean).join(" ");
};

export const isoToTimeString = (iso: string, format: "hh:mm" = "hh:mm") => {
  const date = new Date(iso);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  let timeString;

  // Format hours and minutes as a string in the "HH:mm" format
  switch (format) {
    case "hh:mm":
      timeString = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
  }

  return timeString;
};

export default UtilitiesService;
