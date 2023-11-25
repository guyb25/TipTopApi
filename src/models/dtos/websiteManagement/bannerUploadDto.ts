import { ApiProperty } from "@nestjs/swagger";

export class UploadBannerDto {
    @ApiProperty({ type: 'string', required: true})
    websiteId: string

    @ApiProperty({ type: 'string', required: true})
    sessionKey: string
}