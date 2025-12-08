import { Prop, Schema } from '@nestjs/mongoose';
import { Data } from './data.entity';
import { BlockType } from '@commons/enum/block-type.enum';

@Schema()
export class Block {
  @Prop({ required: true, enum: BlockType })
  type: BlockType;

  @Prop({ required: true, type: Data })
  data: Data;
}
