import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Meta } from './meta.entity';

@Schema()
export class Item extends Document {
  @Prop()
  content: string;

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Meta' })
  @Prop({ type: Meta })
  meta: Meta;

  // @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Item' }] })
  @Prop({ type: [MongooseSchema.Types.Mixed] })
  items: Item[];
}
// export const ItemSchema = SchemaFactory.createForClass(Item);
