import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { UserReportsSettings } from './user-reports-settings.mongoose-schema';
import { UserFinanceSettings } from './user-finance-settings.mongoose-schema';

export type FormItemDocument = HydratedDocument<FormItem>;

@Schema()
export class NumericTarget {
  @Prop()
  amount: number;
  @Prop()
  isMinimum: boolean;
}

@Schema()
export class FormItem {
  @Prop({ type: mongoose.Schema.Types.Mixed })
  value: boolean | number;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  defaultValue: boolean | number;

  @Prop()
  label: string;
  @Prop()
  type: 'boolean' | 'numeric';
  @Prop()
  isDaily: boolean;
  @Prop()
  numericTarget: NumericTarget;
  @Prop()
  booleanTarget: boolean;
  @Prop({ required: true })
  objectId: Types.ObjectId;
}

export const FormItemSchema = SchemaFactory.createForClass(FormItem);
