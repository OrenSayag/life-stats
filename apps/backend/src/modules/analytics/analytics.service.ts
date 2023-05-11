import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import {
  AnalyticsFormItem,
  FormAnalytics,
  GetAnalyticsForFormParams,
} from '../../types/analytics.type';
import { FormService } from '../form/form.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly userService: UsersService) {}
  public async getAnalyticsForForm(
    params: GetAnalyticsForFormParams,
  ): Promise<FormAnalytics> {
    const { formDefinitionId, maxDate, minDate, items } = params;
    const user = await this.userService.findByCookie();
    const { forms, formHistory } = user;
    const formDefinition = FormService.validateFormDefinitionExists(
      formDefinitionId,
      forms,
    );
    const res: FormAnalytics = {
      form: formDefinition,
      maxDate,
      minDate,
      items: {},
    };
    const logs = FormService.getFormHistoryByDefinitionId(
      formDefinitionId,
      formHistory,
      { minDate, maxDate },
    );
    for (const log of logs) {
      const { items, definitionId } = log;
      if (!res.items[definitionId.toString()]) {
        res.items[definitionId.toString()] = [];
      }
      for (const i of items) {
        const { value } = i;
        const analyticsFormItem: AnalyticsFormItem = {
          date: log.date,
          value,
        };
        res.items[definitionId.toString()].push(analyticsFormItem);
      }
    }
    return res;
  }
}
