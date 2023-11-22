import { Injectable } from '@nestjs/common';
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

    // construct the filter from the DTO
    const skip = filter.skip
    const limit = filter.limit

    delete filter.skip
    delete filter.limit

    const cleanFilter = Object.entries(filter) // get [key,value] pairs
    .filter((key, value) => value !== undefined) // get only the fields that have values
    .reduce((prev, [key, value]) => ({ ...prev, [key]: value}), {}) // reconstruct into an object

    const websites: Website[] = await this.serversDbService.filterWebsites(cleanFilter, skip, limit)

    for (const website of websites) {
      websitesDto.push(
        new WebsiteDto(website._id, website.name, website.description, website.link, website.category, website.tags, website.votes)
        );
    }
    
    return websitesDto;
  }
}