import { Injectable } from '@nestjs/common';
import { DayViewDateData } from '../../types/day.type';
import { FormService } from '../form/form.service';
import { MoneyTransactionService } from '../money-transaction/money-transaction.service';
import { NoteService } from '../note/note.service';

@Injectable()
export class DayService {
  constructor(
    private readonly formService: FormService,
    private readonly moneyTransactionService: MoneyTransactionService,
    private readonly noteService: NoteService,
  ) {}

  public async getDayDataByDate(date: string): Promise<DayViewDateData> {
    const forms = await this.formService.getHistoryByDate(date);
    const dateObj = new Date(date);
    const dayAfterDateObj = new Date(dateObj.getTime() + 24 * 3_600 * 1_000);
    const from = new Date(
      dateObj.getFullYear(),
      dateObj.getMonth(),
      dateObj.getDate(),
    ).toISOString();
    const to = new Date(
      dayAfterDateObj.getFullYear(),
      dayAfterDateObj.getMonth(),
      dayAfterDateObj.getDate(),
    ).toISOString();
    const moneyTransactions = await this.moneyTransactionService.getHistory({
      minDate: from,
      maxDate: to,
    });
    const notes = await this.noteService.getHistory({
      fromDate: from,
      toDate: to,
    });
    return {
      forms,
      moneyTransactions,
      notes,
    };
  }
}
