import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, now } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop({ default: now() })
  createdAt?: Date;

  @Prop({ default: now() })
  updatedAt?: Date;

  @Prop()
  objectId: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  content?: string;

  @Prop()
  rtl: boolean;

  @Prop()
  date: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
