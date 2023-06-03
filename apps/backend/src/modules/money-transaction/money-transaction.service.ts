import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { MoneyTransaction } from '../../mongoose-schemas/money-transaction.mongoose-schema';
import { UtilitiesService } from '../utilities/utilities.service';
import {
  CreateMoneyTransactionCategoryRequestBody,
  CreateMoneyTransactionRequestBodyDto,
  GetMoneyTransactionHistoryDto,
  UpdateMoneyCategoryParams,
  UpdateMoneyTransactionParams,
} from '../../types/money-transaction.type';
import { Types } from 'mongoose';
import apiReturnStrings from '../../assets/strings/api-return.strings';
import { MoneyTransactionCategory } from '../../mongoose-schemas/money-transaction-category.mongoose-schema';

@Injectable()
export class MoneyTransactionService {
  constructor(private readonly userService: UsersService) {}

  public async getHistory(
    params: GetMoneyTransactionHistoryDto,
    byCategory?: boolean,
  ): Promise<MoneyTransaction[] | any> {
    const { moneyCategories, minDate, maxDate } = params;
    const user = await this.userService.findByCookie();
    const moneyTransactions = user.moneyTransactions.filter(
      (t) =>
        UtilitiesService.isBetweenDates(t.timestamp, minDate, maxDate) &&
        (moneyCategories?.length > 0
          ? moneyCategories?.includes(t.category.toString())
          : true),
    );
    if (byCategory) {
      const res = { uncategorized: [] };
      for (const t of moneyTransactions) {
        if (!t.category) {
          res.uncategorized.push(t);
          continue;
        }
        if (res[t.category.toString()]) {
          res[t.category.toString()].push(t);
        } else {
          res[t.category.toString()] = [t];
        }
      }
      return res;
    }
    return moneyTransactions;
  }

  public async createMoneyTransaction(
    params: CreateMoneyTransactionRequestBodyDto,
  ): Promise<string> {
    const { categoryId, label, isRevenue, amount, objectId, timestamp } =
      params;
    const user = await this.userService.findByCookie();
    const transaction = new MoneyTransaction();
    transaction.amount = amount;
    transaction.label = label;
    transaction.isRevenue = isRevenue;
    transaction.objectId = new Types.ObjectId(objectId);
    transaction.timestamp = timestamp;
    if (categoryId) {
      this.validateMoneyTransactionCategoryExists(
        categoryId,
        user.moneyTransactionCategories,
      );
      transaction.category = new Types.ObjectId(categoryId);
    }
    user.moneyTransactions.push(transaction);
    await this.userService.updateUser(user);
    return transaction.objectId.toString();
  }

  public async updateMoneyTransaction(
    params: UpdateMoneyTransactionParams,
  ): Promise<void> {
    const { moneyTransactionId, categoryId, isRevenue, amount, label } = params;
    const user = await this.userService.findByCookie();
    const { moneyTransactions, moneyTransactionCategories } = user;
    const transaction = this.validateMoneyTransactionExists(
      moneyTransactionId,
      moneyTransactions,
    );
    if (categoryId) {
      this.validateMoneyTransactionCategoryExists(
        categoryId,
        moneyTransactionCategories,
      );
      transaction.category = new Types.ObjectId(categoryId);
    }
    transaction.isRevenue =
      isRevenue !== undefined ? isRevenue : transaction.isRevenue;
    transaction.amount = amount !== undefined ? amount : transaction.amount;
    transaction.label = label ? label : transaction.label;
    await this.userService.updateUser(user);
  }

  private validateMoneyTransactionExists(
    id: string,
    transactions: MoneyTransaction[],
  ) {
    const moneyTransaction = transactions.find(
      (t) => t.objectId.toString() === id,
    );
    if (!moneyTransaction) {
      throw new NotFoundException(
        apiReturnStrings.moneyTransactions.MONEY_TRANSACTION_NOT_FOUND,
      );
    }
    return moneyTransaction;
  }

  private validateMoneyTransactionCategoryExists(
    categoryId: string,
    categories: MoneyTransactionCategory[],
  ) {
    const cat = categories.find((c) => c.objectId.toString() === categoryId);
    if (!cat) {
      throw new BadRequestException(
        apiReturnStrings.moneyTransactions.INVALID_MONEY_CATEGORY_ID_RECEIVED,
      );
    }
    return cat;
  }

  public async deleteMoneyTransaction(
    moneyTransactionId: string,
  ): Promise<void> {
    const user = await this.userService.findByCookie();
    console.log('DEBUG money-transaction service');
    console.log(user.moneyTransactions);
    user.moneyTransactions = user.moneyTransactions.filter(
      (t) => t.objectId.toString() !== moneyTransactionId,
    );
    await this.userService.updateUser(user);
  }

  public async updateMoneyTransactionCategory(
    params: UpdateMoneyCategoryParams,
  ): Promise<void> {
    const { name, moneyTransactionCategoryId } = params;
    const user = await this.userService.findByCookie();
    const cat = this.validateMoneyTransactionCategoryExists(
      moneyTransactionCategoryId,
      user.moneyTransactionCategories,
    );
    cat.name = name;
    await this.userService.updateUser(user);
  }
  public async deleteMoneyTransactionCategory(
    moneyTransactionCategoryId: string,
  ): Promise<void> {
    const user = await this.userService.findByCookie();
    this.validateMoneyTransactionCategoryExists(
      moneyTransactionCategoryId,
      user.moneyTransactionCategories,
    );
    user.moneyTransactionCategories = user.moneyTransactionCategories.filter(
      (c) => c.objectId.toString() !== moneyTransactionCategoryId,
    );
    user.moneyTransactions = user.moneyTransactions.map((t) => {
      const { category } = t;
      if (category?.toString() === moneyTransactionCategoryId) {
        t.category = undefined;
      }
      return t;
    });
    await this.userService.updateUser(user);
  }
  public async createMoneyTransactionCategory(
    params: CreateMoneyTransactionCategoryRequestBody,
  ): Promise<string> {
    const { name } = params;
    const user = await this.userService.findByCookie();
    const cat = new MoneyTransactionCategory();
    cat.name = name;
    const catObjId = UtilitiesService.objectId();
    cat.objectId = catObjId;
    user.moneyTransactionCategories.push(cat);
    await this.userService.updateUser(user);
    return catObjId.toString();
  }
}
