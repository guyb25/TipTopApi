import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LogoutWebsiteDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    token: string;
}