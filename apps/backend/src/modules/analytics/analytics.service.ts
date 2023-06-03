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
    const { items: formDefinitionItems } = formDefinition;
    for (const log of logs) {
      const { items } = log;
      for (const i of items) {
        const { objectId } = i;
        if (
          !historyItemIsInCurrentFormDefinitionItems(
            objectId.toString(),
            formDefinitionItems.map((fdi) => fdi.objectId.toString()),
          )
        ) {
          continue;
        }
        if (!res.items[i.objectId.toString()]) {
          res.items[i.objectId.toString()] = [];
        }
        const { value } = i;
        const analyticsFormItem: AnalyticsFormItem = {
          date: log.date,
          value,
        };
        res.items[i.objectId.toString()].push(analyticsFormItem);
      }
    }

    return res;

    function historyItemIsInCurrentFormDefinitionItems(
      historyItemId: string,
      formDefinitionItems: string[],
    ) {
      return formDefinitionItems.includes(historyItemId);
    }
  }
}
