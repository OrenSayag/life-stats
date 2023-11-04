import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserReportsSettings } from './user-reports-settings.mongoose-schema';
import { UserFinanceSettings } from './user-finance-settings.mongoose-schema';
import { UserNotesSettings } from './user-notes-settings.mongoose-schema';

export type UserSettingsDocument = HydratedDocument<UserSettings>;

@Schema()
export class UserSettings {
  @Prop()
  reports: UserReportsSettings;

  @Prop()
  finance: UserFinanceSettings;
  @Prop()
  notes: UserNotesSettings;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
