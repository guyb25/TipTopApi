import { Body, Post, Inject } from '@nestjs/common';
import { SurfingBaseController } from '../surfingBase.controller';
import { FilterService } from './filter.service';
import { WebsiteDto } from 'src/endpoints/dtos/websiteSurfing/websiteDto';
import { FilterDto } from 'src/endpoints/dtos/websiteSurfing/filterDto';

export class FilterController extends SurfingBaseController {
    @Inject(FilterService)
    private readonly getWebsitesService: FilterService;

    @Post("/filter")
    async filter(@Body() filterDto: FilterDto): Promise<WebsiteDto[]> {
        return await this.getWebsitesService.getWebsites(filterDto);
    }
}
