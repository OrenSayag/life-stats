import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserNotesSettingsDocument = HydratedDocument<UserNotesSettings>;

@Schema()
export class UserNotesSettings {
  @Prop({ default: false })
  rtlDefaultDirection: boolean;
  @Prop()
  passcode?: string;
}

export const UserNotesSettingsSchema =
  SchemaFactory.createForClass(UserNotesSettings);
