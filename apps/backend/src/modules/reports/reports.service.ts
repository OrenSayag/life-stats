import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import {
  GetReportRequestBody,
  Report,
  ReportFormItem,
} from '../../types/reports.type';
import { FormService } from '../form/form.service';
import { UtilitiesService } from '../utilities/utilities.service';

@Injectable()
export class ReportsService {
  constructor(private readonly userService: UsersService) {}

  public async generateReportData(
    params: GetReportRequestBody,
  ): Promise<Report> {
    const user = await this.userService.findByCookie();
    const { formHistory, forms } = user;
    const { minDate, maxDate, formId } = params;
    const formDefinition = FormService.validateFormDefinitionExists(
      formId,
      forms,
    );
    const { name } = formDefinition;
    const logs = formHistory.filter(
      (f) =>
        UtilitiesService.isBetweenDates(f.date, minDate, maxDate) &&
        f.definitionId.toString() === formId,
    );
    const reportItems = {};
    for (const item of formDefinition.items) {
      const { objectId, isDaily, label, defaultValue, numericTarget } = item;
      const reportItem = new ReportFormItem();
      reportItem.isDaily = isDaily;
      reportItem.label = label;
      const daysInReport = UtilitiesService.getNumDaysBetweenDates(
        minDate,
        maxDate,
      );
      const totalPotential =
        typeof defaultValue === 'boolean'
          ? daysInReport
          : numericTarget.amount * daysInReport;
      reportItem.value.total = totalPotential;
      reportItem.value.success = calculateSuccessCountForItemDefinition();
      reportItems[objectId.toString()] = reportItem;
      function calculateSuccessCountForItemDefinition(): number {
        let success = 0;
        for (const log of logs) {
          const relevantItem = log.items.find(
            (i) => i.objectId.toString() === objectId.toString(),
          );
          if (!relevantItem) {
            continue;
          }
          const { value } = relevantItem;
          if (value === true) {
            success++;
            continue;
          }
          if (typeof value === 'number') {
            success += value;
          }
        }
        return success;
      }
    }
    return {
      creationTimestamp: UtilitiesService.timestamp(),
      formName: name,
      formItems: reportItems,
    };
  }
}
