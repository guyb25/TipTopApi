import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray } from "class-validator";

export class RegisterWebsiteDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsString()
    @ApiProperty()
    banner: string;

    @IsString()
    @ApiProperty()
    category: string;

    @IsArray()
    @ApiProperty()
    tags: string[];
}