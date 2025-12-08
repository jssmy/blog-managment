import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Meta {
  @Prop()
  checked: boolean;

  @Prop()
  counterType: string;
}
// export const MetaSchema = SchemaFactory.createForClass(Meta);
