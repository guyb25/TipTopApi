import { Get, Param } from '@nestjs/common';
import { SurfingBaseController } from '../surfingBase.controller';

export class GetWebsiteController extends SurfingBaseController {
  @Get("/website/:websiteId")
  register(@Param('websiteId') websiteId: string): string {
    return websiteId;
  }
}
