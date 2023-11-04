import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserSettings } from './user-settings.mongoose-schema';
import { Form } from './form.mongoose-schema';
import { FormLog } from './form-log.mongoose-schema';
import { MoneyTransaction } from './money-transaction.mongoose-schema';
import { MoneyTransactionCategory } from './money-transaction-category.mongoose-schema';
import { Types } from 'mongoose';
import { Note } from './note.mongoose-schema';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  provider: 'google';
  @Prop()
  providerId: string;

  @Prop()
  name: string;

  @Prop()
  profilePicUrl: string;

  @Prop()
  mail: string;

  @Prop()
  phone?: string;

  @Prop()
  forms: Form[];

  @Prop()
  formHistory: FormLog[] = [];

  @Prop()
  moneyTransactions: MoneyTransaction[] = [];

  @Prop()
  notes: Note[] = [];

  @Prop()
  moneyTransactionCategories: MoneyTransactionCategory[];

  @Prop()
  settings: UserSettings;

  @Prop()
  defaultForm: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
