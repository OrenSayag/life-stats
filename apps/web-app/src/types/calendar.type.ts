import { UseQueryResult } from "react-query";
import { CalendarDate } from "shared-types/shared.type";

export interface UseCalendarReturn {
  monthLabel: string;
  onSwitchMonth: (increment: boolean) => void;
  query: UseQueryResult<CalendarDate[]>;
  totalDaysInMonth: number;
}

export type CalendarWeekData = (CalendarDate | undefined)[];
