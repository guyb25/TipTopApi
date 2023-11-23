import { Injectable } from '@nestjs/common';
import { pickBy } from 'lodash';

import { ServersDbService } from 'src/dataAccess/serversDb/serversDb.service';
import { Website } from 'src/dataAccess/serversDb/website.schema';
import { FilterDto } from 'src/endpoints/dtos/websiteSurfing/filterDto';
import { WebsiteDto } from 'src/endpoints/dtos/websiteSurfing/websiteDto';

@Injectable()
export class FilterService {
  constructor(private readonly serversDbService: ServersDbService) {
    this.serversDbService = serversDbService;
  }

  async getWebsites(filter: FilterDto) : Promise<WebsiteDto[]> {
    const websitesDto : WebsiteDto[] = []

    const websites: Website[] = await this.serversDbService.filterWebsites(filter.name, filter.category, filter.tags, filter.skip, filter.limit)

    for (const website of websites) {
      websitesDto.push(
        new WebsiteDto(website._id, website.name, website.description, website.link, website.category, website.tags, website.votes)
        );
    }
    
    return websitesDto;
  }
}