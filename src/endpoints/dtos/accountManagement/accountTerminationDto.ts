import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AccountTerminationDto {
    @IsString()
    @ApiProperty()
    username: string;

    @IsString()
    @ApiProperty()
    sessionId: string;
}