import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateMoneyTransactionCategoryRequestBody,
  CreateMoneyTransactionRequestBodyDto,
  GetMoneyTransactionHistoryDto,
  MoneyCategoryIdParamDto,
  MoneyTransactionIdParamDto,
  PatchMoneyCategoryRequestBody,
  PatchMoneyTransactionRequestBody,
} from '../../types/money-transaction.type';
import { MoneyTransactionService } from './money-transaction.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AppAPIResponseBodyBase } from '../../types/app.type';
import apiReturnStrings from '../../assets/strings/api-return.strings';

@Controller('money-transaction')
@UseGuards(AuthGuard)
export class MoneyTransactionController {
  constructor(
    private readonly moneyTransactionService: MoneyTransactionService,
  ) {}
  @Post('get-history')
  async getMoneyTransactionHistory(
    @Body() filter: GetMoneyTransactionHistoryDto,
  ): Promise<AppAPIResponseBodyBase> {
    const moneyTransactions = await this.moneyTransactionService.getHistory(
      filter,
      true,
    );
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.moneyTransactions.SUCCESSFULLY_GOT_MONEY_TRANSACTION_HISTORY,
      { moneyTransactions },
    );
  }
  @Post('')
  async createMoneyTransaction(
    @Body() body: CreateMoneyTransactionRequestBodyDto,
  ): Promise<AppAPIResponseBodyBase> {
    const moneyTransactionId =
      await this.moneyTransactionService.createMoneyTransaction(body);
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.moneyTransactions.SUCCESSFULLY_GOT_MONEY_TRANSACTION_HISTORY,
      { moneyTransactionId },
    );
  }
  @Delete(':moneyTransactionId')
  async deleteMoneyTransaction(
    @Param() params: MoneyTransactionIdParamDto,
  ): Promise<AppAPIResponseBodyBase> {
    const { moneyTransactionId } = params;
    await this.moneyTransactionService.deleteMoneyTransaction(
      moneyTransactionId,
    );
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.moneyTransactions
        .SUCCESSFULLY_DELETED_MONEY_TRANSACTION + moneyTransactionId,
    );
  }

  @Patch(':moneyTransactionId')
  async updateMoneyTransaction(
    @Param() params: MoneyTransactionIdParamDto,
    @Body() body: PatchMoneyTransactionRequestBody,
  ): Promise<AppAPIResponseBodyBase> {
    await this.moneyTransactionService.updateMoneyTransaction({
      ...params,
      ...body,
    });
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.moneyTransactions.SUCCESSFULLY_UPDATED_MONEY_TRANSACTION,
    );
  }

  @Post('category')
  async createMoneyTransactionCategory(
    @Body() body: CreateMoneyTransactionCategoryRequestBody,
  ): Promise<AppAPIResponseBodyBase> {
    const moneyTransactionCategoryId =
      await this.moneyTransactionService.createMoneyTransactionCategory(body);
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.moneyTransactions.SUCCESSFULLY_CREATED_MONEY_TRANSACTION_CATEGORY,
      { moneyTransactionCategoryId },
    );
  }
  @Patch('category/:moneyTransactionCategoryId')
  async updateMoneyTransactionCategory(
    @Param() params: MoneyCategoryIdParamDto,
    @Body() body: PatchMoneyCategoryRequestBody,
  ): Promise<AppAPIResponseBodyBase> {
    await this.moneyTransactionService.updateMoneyTransactionCategory({
      ...body,
      ...params,
    });
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.moneyTransactions.SUCCESSFULLY_UPDATED_MONEY_TRANSACTION_CATEGORY,
    );
  }

  @Delete('category/:moneyTransactionCategoryId')
  async deleteMoneyCategory(
    @Param() params: MoneyCategoryIdParamDto,
  ): Promise<AppAPIResponseBodyBase> {
    const { moneyTransactionCategoryId } = params;
    await this.moneyTransactionService.deleteMoneyTransactionCategory(
      moneyTransactionCategoryId,
    );
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.moneyTransactions.SUCCESSFULLY_DELETED_MONEY_TRANSACTION_CATEGORY,
    );
  }
}
