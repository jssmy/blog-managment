import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from 'mongoose';
import { Data } from "./data.entity";

@Schema()
export class    Block {
    @Prop({ required: true })
    type: string;

    @Prop({ required: true, type: Data })
    data: Data;
}   
// export const BlockSchema = SchemaFactory.createForClass(Block);