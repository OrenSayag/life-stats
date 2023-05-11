import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  AppAPIResponseBodyBase,
  DateRangeQueryParams,
} from '../../types/app.type';
import { CalendarService } from './calendar.service';
import apiReturnStrings from '../../assets/strings/api-return.strings';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('calendar')
@UseGuards(AuthGuard)
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}
  @Get('')
  async getCalendarDates(
    @Query() queryParams: DateRangeQueryParams,
  ): Promise<AppAPIResponseBodyBase> {
    const { minDate, maxDate } = queryParams;
    const calendarDates = await this.calendarService.getCalendarViewData({
      minDate,
      maxDate,
    });
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.calendar.SUCCESSFULLY_GOT_CALENDAR_DATES,
      { calendarDates },
    );
  }
}
