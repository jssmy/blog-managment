import { Prop, Schema } from '@nestjs/mongoose';
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

  @Prop({ type: Meta })
  meta?: Meta;

  @Prop({ type: [Item] })
  items?: Item[];
}
