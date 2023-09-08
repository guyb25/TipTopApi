import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AccountTerminationDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    sessionKey: string;
}