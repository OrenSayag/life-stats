import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Form } from './form.mongoose-schema';

export type FormLogDocument = HydratedDocument<Form>;

@Schema()
export class FormLog extends Form {
  @Prop()
  date: string;
  @Prop()
  isPerfect: boolean;
  @Prop()
  definitionId: Types.ObjectId;
}

export const FormLogSchema = SchemaFactory.createForClass(FormLog);
