import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { GetReportRequestBody } from '../../types/reports.type';
import { AppAPIResponseBodyBase } from '../../types/app.type';
import apiReturnStrings from '../../assets/strings/api-return.strings';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('reports')
@UseGuards(AuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('get-report')
  async getReport(
    @Body() body: GetReportRequestBody,
  ): Promise<AppAPIResponseBodyBase> {
    const report = await this.reportsService.generateReportData(body);
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.reports.SUCCESSFULLY_GOT_REPORT,
      report,
    );
  }
}
