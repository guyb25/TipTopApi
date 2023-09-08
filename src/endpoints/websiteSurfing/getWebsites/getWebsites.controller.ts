import { Body, Post } from '@nestjs/common';
import { SurfingBaseController } from '../surfingBase.controller';

export class GetWebsitesController extends SurfingBaseController {
  @Post("/websites")
  register(@Body() websites: string[]): string {
    return websites[0];
  }
}
