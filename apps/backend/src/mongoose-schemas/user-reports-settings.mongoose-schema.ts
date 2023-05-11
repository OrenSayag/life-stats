import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserReportsSettingsDocument = HydratedDocument<UserReportsSettings>;

@Schema()
export class UserReportsSettings {
  @Prop()
  mailTo: string[];

  @Prop()
  interval: number;

  @Prop()
  forms: Types.ObjectId[];
}

export const UserReportsSettingsSchema =
  SchemaFactory.createForClass(UserReportsSettings);
