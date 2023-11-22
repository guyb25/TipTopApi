import { ApiProperty } from "@nestjs/swagger"

export class FilterDto {
    constructor(name: string, category: string, tags: string[], limit: number, skip: number) {
        this.name = name
        this.category = category
        this.tags = tags
        this.limit = limit
        this.skip = skip
    }

    @ApiProperty()
    name: string

    @ApiProperty()
    category: string

    @ApiProperty()
    tags: string[]

    @ApiProperty({ required: true})
    limit: number

    @ApiProperty({ default: 0 })
    skip: number = 0
}