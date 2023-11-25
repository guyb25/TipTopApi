import { HttpStatus } from "@nestjs/common";
import { ServerRes } from "../models/response/ServerRes";
import { OpResult } from "src/models/response/OpResult";

export const serverResponses = {
    [OpResult.SUCCESS]: new ServerRes(HttpStatus.OK, ""),
    [OpResult.USER_TAKEN]: new ServerRes(HttpStatus.CONFLICT, "the username is already taken"),
    [OpResult.EMAIL_TAKEN]: new ServerRes(HttpStatus.CONFLICT, "the email is already taken"),
    [OpResult.USER_NOT_EXIST]: new ServerRes(HttpStatus.NOT_FOUND, "The username doesn't exist"),
    [OpResult.INCORRECT_PASSWORD]: new ServerRes(HttpStatus.UNAUTHORIZED, "Incorrect username or password"),
    [OpResult.SESSION_NOT_FOUND]: new ServerRes(HttpStatus.NOT_FOUND, "session not found"),
    [OpResult.IP_VOTED_TODAY]: new ServerRes(HttpStatus.FORBIDDEN, "This IP address has already voted today"),
    [OpResult.WEBSITE_NOT_EXIST]: new ServerRes(HttpStatus.NOT_FOUND, "The website doesn't exist"),
    [OpResult.INVALID_WEBSITE_ID]: new ServerRes(HttpStatus.BAD_REQUEST, "Invalid website id"),
    [OpResult.INVALID_FILE_TYPE_IMAGE]: new ServerRes(HttpStatus.BAD_REQUEST, "Invalid image type"),
}