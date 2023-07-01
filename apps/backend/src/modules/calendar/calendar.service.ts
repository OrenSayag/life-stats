import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { UtilitiesService } from '../utilities/utilities.service';
import { CalendarDate, DateRange } from 'shared-types/shared.type';

@Injectable()
export class CalendarService {
  constructor(private readonly userService: UsersService) {}

  public async getCalendarViewData(range: DateRange): Promise<CalendarDate[]> {
    const { minDate, maxDate } = range;
    const user = await this.userService.findByCookie();
    const { formHistory } = user;
    const dates = {};
    for (const log of formHistory.filter((l) =>
      UtilitiesService.isBetweenDates(l.date, minDate, maxDate),
    )) {
      const { date, isPerfect } = log;
      const calendarDate: CalendarDate = { date, isPerfectDay: isPerfect };
      if (!dates[date]) {
        dates[date] = calendarDate;
      } else {
        if (!isPerfect) {
          dates[date].isPefrectDay = false;
        }
      }
    }
    const calendarDates = [];
    for (const date of Object.keys(dates)) {
      calendarDates.push(dates[date]);
    }
    return calendarDates;
  }
}
