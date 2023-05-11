import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UtilitiesService } from '../modules/utilities/utilities.service';

export type MoneyTransactionCategoryDocument =
  HydratedDocument<MoneyTransactionCategory>;

@Schema()
export class MoneyTransactionCategory {
  @Prop()
  name: string;
  @Prop()
  objectId: Types.ObjectId;

  constructor() {
    this.objectId = UtilitiesService.objectId();
  }
}

export const MoneyTransactionCategorySchema = SchemaFactory.createForClass(
  MoneyTransactionCategory,
);
