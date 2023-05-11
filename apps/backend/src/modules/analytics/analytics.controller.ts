import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetAnalyticsForFormRequestBody } from '../../types/analytics.type';
import { AppAPIResponseBodyBase } from '../../types/app.type';
import apiReturnStrings from '../../assets/strings/api-return.strings';
import { FormDefinitionIdParamDto } from '../../types/form.type';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
@UseGuards(AuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}
  @Post('get/:formDefinitionId')
  async getAnalyticsForForm(
    @Param() params: FormDefinitionIdParamDto,
    @Body() body: GetAnalyticsForFormRequestBody,
  ): Promise<AppAPIResponseBodyBase> {
    const { formDefinitionId } = params;
    const analytics = await this.analyticsService.getAnalyticsForForm({
      ...body,
      formDefinitionId,
    });
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.analytics.GET_ANALYTICS_FOR_FORM_SUCCESS_MESSAGE +
        formDefinitionId,
      analytics,
    );
  }
}
