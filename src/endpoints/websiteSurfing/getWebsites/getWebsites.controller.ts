import { Body, Post, Inject } from '@nestjs/common';
import { SurfingBaseController } from '../surfingBase.controller';
import { GetWebsitesService } from './getWebsites.service';
import { WebsiteDto } from 'src/endpoints/dtos/websiteSurfing/websiteDto';

export class GetWebsitesController extends SurfingBaseController {
    @Inject(GetWebsitesService)
    private readonly getWebsitesService: GetWebsitesService;

    @Post("/websites")
    async register(@Body() websitesNames: string[]): Promise<WebsiteDto[]> {
        return await this.getWebsitesService.getWebsites(websitesNames);
    }
}
