import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginWebsiteDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    password: string;
}