import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Block } from './block.entity';
import { BlogStage } from 'src/commons/enum/blog-stage.enum';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @Prop()
  time: number;

  @Prop({ unique: true, index: true, required: true })
  slug: string;

  @Prop({ enum: BlogStage, required: true, default: BlogStage.DRAFT })
  stage: BlogStage;

  @Prop({ required: true, type: [Block] })
  blocks: Block[];

  @Prop({ required: true })
  userId: string;

  @Prop()
  version: string;
}
export const BlogSchema = SchemaFactory.createForClass(Blog);
