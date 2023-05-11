import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { FormItem } from './form-item.mongoose-schema';
import { UtilitiesService } from '../modules/utilities/utilities.service';

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

  constructor() {
    this.objectId = UtilitiesService.objectId();
  }
}

export const FormSchema = SchemaFactory.createForClass(Form);
