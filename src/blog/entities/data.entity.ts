import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Meta } from './meta.entity';
import { Item } from './item.entity';

@Schema()
export class Data {
  @Prop()
  text?: string;

  @Prop()
  level?: number;

  @Prop()
  url?: string;

  @Prop()
  caption?: string;

  @Prop()
  withBorder?: boolean;

  @Prop()
  withBackground?: boolean;

  @Prop()
  stretched?: boolean;

  @Prop()
  code?: string;

  @Prop()
  title?: string;

  @Prop()
  message?: string;

  @Prop()
  style?: string;

  // @Prop({ type:  MongooseSchema.Types.ObjectId, ref: 'Meta' })
  @Prop({ type: Meta })
  meta?: Meta;

  // @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Item' }] })
  @Prop({ type: [Item] })
  items?: Item[];
}
// export const DataSchema = SchemaFactory.createForClass(Data);
