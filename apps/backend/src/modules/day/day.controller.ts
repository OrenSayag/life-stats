import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AppAPIResponseBodyBase } from '../../types/app.type';
import apiReturnStrings from '../../assets/strings/api-return.strings';
import { GetDayDataByDateParamsDto } from '../../types/day.type';
import { DayService } from './day.service';

@Controller('day')
export class DayController {
  constructor(private readonly dayService: DayService) {}
  @Get(':date')
  @UseGuards(AuthGuard)
  async getDayData(
    @Param() params: GetDayDataByDateParamsDto,
  ): Promise<AppAPIResponseBodyBase> {
    const { date } = params;
    const data = await this.dayService.getDayDataByDate(date);
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.day.GET_DATE_SUCCESS + date,
      data,
    );
  }
}
