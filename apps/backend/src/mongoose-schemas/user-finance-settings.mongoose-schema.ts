import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserFinanceSettingsDocument = HydratedDocument<UserFinanceSettings>;

@Schema()
export class UserFinanceSettings {
  @Prop({ default: 0 })
  currency: number;
}

export const UserFinanceSettingsSchema =
  SchemaFactory.createForClass(UserFinanceSettings);
