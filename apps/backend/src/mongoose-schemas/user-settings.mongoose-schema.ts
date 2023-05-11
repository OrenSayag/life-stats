import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserReportsSettings } from './user-reports-settings.mongoose-schema';
import { UserFinanceSettings } from './user-finance-settings.mongoose-schema';

export type UserSettingsDocument = HydratedDocument<UserSettings>;

@Schema()
export class UserSettings {
  @Prop()
  reports: UserReportsSettings;

  @Prop()
  finance: UserFinanceSettings;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
