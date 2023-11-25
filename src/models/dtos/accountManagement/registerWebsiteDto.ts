import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray } from "class-validator";

export class RegisterWebsiteDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    username: string;

    @IsString()
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsString()
    @ApiProperty()
    category: string;

    @IsArray()
    @ApiProperty()
    tags: string[];

    @IsArray()
    @ApiProperty()
    email: string;

    @IsArray()
    @ApiProperty()
    link: string;
}