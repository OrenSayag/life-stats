import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { FormItem } from './form-item.mongoose-schema';

export type FormDocument = HydratedDocument<Form>;

@Schema()
export class Form {
  @Prop()
  name: string;

  @Prop()
  items: FormItem[];
  @Prop()
  isActive: boolean;

  @Prop()
  objectId: Types.ObjectId;
}

export const FormSchema = SchemaFactory.createForClass(Form);
