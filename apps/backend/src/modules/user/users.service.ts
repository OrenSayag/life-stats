import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  User,
  UserDocument,
} from '../../mongoose-schemas/user.mongoose-schema';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UpdateUserSettingsRequestBody } from '../../types/user.type';
import apiReturnStrings from '../../assets/strings/api-return.strings';
import { UserData } from 'shared-types/shared.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async findAll(): Promise<User[] | undefined> {
    return await this.userModel.find().exec();
  }

  async findOne(providerId: string): Promise<User | undefined> {
    return await this.userModel.findOne({ providerId }).exec();
  }

  async findByCookie(): Promise<User> {
    const providerId = (this.request as any).user?.providerId;
    if (!providerId) {
      throw new UnauthorizedException();
    }
    const user = await this.userModel.findOne({ providerId }).exec();
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async createUser(user: User): Promise<void> {
    await this.userModel.create(user);
  }

  async updateUser(user: User): Promise<void> {
    const { providerId } = user;
    await this.userModel.findOneAndUpdate({ providerId }, user);
  }

  async updateUserSettings(
    settings: UpdateUserSettingsRequestBody,
  ): Promise<void> {
    const { reports, finance } = settings;
    const user = await this.findByCookie();
    if (reports) {
      const { interval, mailTo, forms } = reports;
      if (interval !== undefined) {
        user.settings.reports.interval = interval;
      }
      if (mailTo !== undefined) {
        user.settings.reports.mailTo = mailTo;
      }
      if (forms !== undefined) {
        if (user.forms.some((f) => !forms.includes(f.objectId.toString()))) {
          throw new NotFoundException(
            apiReturnStrings.form.FAILED_TO_GET_FORM_BY_INPUT_ID,
          );
        }
        user.settings.reports.forms = forms.map((f) => new Types.ObjectId(f));
      }
    }
    if (finance) {
      const { currency } = finance;
      if (currency !== undefined) {
        user.settings.finance.currency = currency;
      }
    }
    await this.updateUser(user);
  }

  async getUserData(): Promise<UserData> {
    const user = await this.findByCookie();
    const { moneyTransactionCategories, forms, settings, profilePicUrl, name } =
      user;
    return {
      moneyTransactionCategories: moneyTransactionCategories.map((t) => ({
        ...t,
        objectId: t.objectId.toString(),
      })),
      settings: {
        ...settings,
        reports: { ...settings.reports, forms: [] },
        finance: settings.finance,
      },
      formDefinitions: forms.map((f) => ({
        name: f.name,
        objectId: f.objectId.toString(),
        items: f.items.map((i) => ({
          objectId: i.objectId.toString(),
          value: i.value,
          type: i.type,
          numericTarget: i.numericTarget,
          booleanTarget: i.booleanTarget,
          defaultValue: i.defaultValue,
          isDaily: i.isDaily,
          label: i.label,
        })),
        isActive: f.isActive,
      })),
      profilePicUrl,
      name,
    };
  }
}
