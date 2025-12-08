import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Meta } from './meta.entity';

@Schema()
export class Item extends Document {
  @Prop()
  content: string;

  @Prop({ type: Meta })
  meta: Meta;

  @Prop({ type: [MongooseSchema.Types.Mixed] })
  items: Item[];
}
