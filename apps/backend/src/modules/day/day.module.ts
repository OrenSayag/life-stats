import { Module } from '@nestjs/common';
import { DayController } from './day.controller';
import { DayService } from './day.service';
import { AuthModule } from '../auth/auth.module';
import { FormModule } from '../form/form.module';
import { MoneyTransactionModule } from '../money-transaction/money-transaction.module';

@Module({
  imports: [AuthModule, FormModule, MoneyTransactionModule],
  controllers: [DayController],
  providers: [DayService],
})
export class DayModule {}
