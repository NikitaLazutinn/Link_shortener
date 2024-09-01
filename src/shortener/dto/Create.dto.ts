import { IsNotEmpty, IsString } from "class-validator";

export class createDto{
    @IsNotEmpty()
    @IsString()
    Original: string;

}