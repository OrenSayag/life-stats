import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { Request } from 'express';
import { User } from '../../mongoose-schemas/user.mongoose-schema';
import { Form } from '../../mongoose-schemas/form.mongoose-schema';
import { FormItem } from '../../mongoose-schemas/form-item.mongoose-schema';
import { MoneyTransactionCategory } from '../../mongoose-schemas/money-transaction-category.mongoose-schema';
import { UserSettings } from '../../mongoose-schemas/user-settings.mongoose-schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UtilitiesService } from '../utilities/utilities.service';

const TOKEN_MAX_LIFE = '24h';

@Injectable()
export class AuthService {
  private readonly tokenSecret: string;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.tokenSecret = configService.getOrThrow('JWT_SECRET');
  }

  public async signIn(req: Request): Promise<string> {
    const user = req.user as any;
    const userDocument = await this.getUser(user.providerId);
    if (!userDocument) {
      await this.createUser(user);
    }

    const token = this.jwtService.sign(
      {
        providerId: userDocument.providerId,
      },
      {
        secret: this.tokenSecret,
        expiresIn: TOKEN_MAX_LIFE,
      },
    );

    return token;
  }
  private async getUser(providerId: string) {
    return await this.usersService.findOne(providerId);
  }
  private async createUser(user: any): Promise<User> {
    const { providerId, provider, email, name, picture } = user as any;
    const userObj = new User();
    userObj.providerId = providerId;
    userObj.provider = provider;
    userObj.mail = email;
    userObj.name = name;
    userObj.profilePicUrl = picture;
    const defaultForm = createDefaultForm();
    userObj.defaultForm = defaultForm.objectId;
    userObj.forms = [defaultForm];
    const defaultMoneyTransactionCategroy =
      createDefaultMoneyTransactionCategory();
    userObj.moneyTransactionCategories = [defaultMoneyTransactionCategroy];
    userObj.settings = createDefaultUserSettings();
    await this.usersService.createUser(userObj);

    return userObj;
    function createDefaultMoneyTransactionCategory(): MoneyTransactionCategory {
      const cat = new MoneyTransactionCategory();
      cat.name = 'Default';
      return cat;
    }
    function createDefaultUserSettings(): UserSettings {
      const settings = new UserSettings();
      settings.finance = {
        currency: 0,
      };
      settings.reports = {
        forms: userObj.forms.map((f) => f.objectId),
        mailTo: [email],
        interval: 1,
      };
      return settings;
    }

    function createDefaultForm(): Form {
      const form = new Form();
      form.name = 'Main';
      form.items = createFormItems();
      form.isActive = true;
      return form;
      function createFormItems(): FormItem[] {
        const NUMBER_OF_ITEMS = 3;
        const items = [];
        for (let i = 0; i < NUMBER_OF_ITEMS; i++) {
          const item = new FormItem();
          const isDaily = i === 0;
          item.isDaily = isDaily;
          item.label = 'Example ' + +i + 1;
          item.type = i % 2 === 1 ? 'boolean' : 'numeric';
          item.numericTarget =
            item.type === 'numeric'
              ? { amount: 1, isMinimum: true }
              : undefined;
          item.booleanTarget = item.type === 'boolean' ? true : undefined;
          item.defaultValue = item.type === 'boolean' ? false : 0;
          item.objectId = UtilitiesService.objectId();
          items.push(item);
        }
        return items;
      }
    }
  }
}
