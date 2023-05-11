import { Module } from '@nestjs/common';
import { MoneyTransactionService } from './money-transaction.service';
import { UserModule } from '../user/user.module';
import { MoneyTransactionController } from './money-transaction.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  providers: [MoneyTransactionService],
  controllers: [MoneyTransactionController],
  exports: [MoneyTransactionService],
})
export class MoneyTransactionModule {}
