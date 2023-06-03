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
    const dateObj = new Date(date);
    const dayAfterDateObj = new Date(dateObj.getTime() + 24 * 3_600 * 1_000);
    const moneyTransactions = await this.moneyTransactionService.getHistory({
      minDate: new Date(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate(),
      ).toISOString(),
      maxDate: new Date(
        dayAfterDateObj.getFullYear(),
        dayAfterDateObj.getMonth(),
        dayAfterDateObj.getDate(),
      ).toISOString(),
    });
    return {
      forms,
      moneyTransactions,
    };
  }
}
