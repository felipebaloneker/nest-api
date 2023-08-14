import { IsNumber, IsString } from "class-validator";

export class UserDto {
    @IsNumber()
    id: string;

    @IsString()
    name:string;

    @IsString()
    lastName: string;
}
