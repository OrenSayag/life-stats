import { Injectable } from '@nestjs/common';
import { DayViewDateData } from '../../types/day.type';
import { FormService } from '../form/form.service';
import { MoneyTransactionService } from '../money-transaction/money-transaction.service';
import { UtilitiesService } from '../utilities/utilities.service';

@Injectable()
export class DayService {
  constructor(
    private readonly formService: FormService,
    private readonly moneyTransactionService: MoneyTransactionService,
  ) {}

  public async getDayDataByDate(date: string): Promise<DayViewDateData> {
    const forms = await this.formService.getHistoryByDate(date);
    const dateRange = UtilitiesService.getDateBeforeAndAfter(date);
    const moneyTransactions = await this.moneyTransactionService.getHistory({
      maxDate: dateRange.dateAfter,
      minDate: dateRange.dateBefore,
    });
    return {
      forms,
      moneyTransactions,
    };
  }
}
