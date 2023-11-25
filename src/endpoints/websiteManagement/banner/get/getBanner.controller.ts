import { Res } from "@nestjs/common";
import { WebsiteManagementBaseController } from "../../websiteManagementBase.controller";
import { Response } from 'express'

export class GetBannerController extends WebsiteManagementBaseController {
    async getBanner(@Res() res: Response): Promise<Response> {

    }
}