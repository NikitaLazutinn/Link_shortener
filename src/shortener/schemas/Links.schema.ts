import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Links{
    @Prop({unique:true})
    Original: string;

    @Prop()
    num: number;

    @Prop()
    Shortened: string;
}

export const LinksSchema = SchemaFactory.createForClass(Links);


