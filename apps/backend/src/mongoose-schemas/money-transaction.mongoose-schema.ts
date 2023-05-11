import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MoneyTransactionDocument = HydratedDocument<MoneyTransaction>;

@Schema()
export class MoneyTransaction {
  @Prop()
  timestamp: string;

  @Prop()
  category?: Types.ObjectId;

  @Prop()
  isRevenue: boolean;
  @Prop()
  label: string;
  @Prop()
  amount: number;
  @Prop()
  objectId: Types.ObjectId;

  constructor() {}
}

export const MoneyTransactionSchema =
  SchemaFactory.createForClass(MoneyTransaction);
