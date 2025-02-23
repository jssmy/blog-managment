import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Meta {
    @Prop()
    checked: boolean;

    @Prop()
    counterType: string;
}
// export const MetaSchema = SchemaFactory.createForClass(Meta);
