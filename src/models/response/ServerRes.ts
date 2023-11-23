import { HttpStatus } from "@nestjs/common"

export class ServerRes {
    status: HttpStatus
    message: string

    constructor(status: HttpStatus, message: string) {
        this.status = status
        this.message = message
    }
}