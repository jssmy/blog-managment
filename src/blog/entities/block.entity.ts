import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Data } from './data.entity';
import { BlockType } from 'src/commons/enum/block-type.enum';

@Schema()
export class Block {
  @Prop({ required: true, enum: BlockType })
  type: BlockType;

  @Prop({ required: true, type: Data })
  data: Data;
}
