import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Links{
    @Prop({unique:true})
    Original: string;

    @Prop()
    num: number;

    @Prop()
    Shortened: string;

    @Prop()
    usageTimes: number;
}

export const LinksSchema = SchemaFactory.createForClass(Links);


