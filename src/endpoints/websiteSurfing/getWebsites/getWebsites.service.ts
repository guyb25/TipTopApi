import { Injectable } from '@nestjs/common';
import { ServersDbService } from 'src/dataAccess/serversDb/serversDb.service';
import { WebsiteDto } from 'src/endpoints/dtos/websiteSurfing/websiteDto';

@Injectable()
export class GetWebsitesService {
  constructor(private readonly serversDbService: ServersDbService) {
    this.serversDbService = serversDbService;
  }

  async getWebsites(names: string[]) : Promise<WebsiteDto[]> {
    const websites : WebsiteDto[] = [] ;

    for (const name of names) {
        const websitesWithName = await this.serversDbService.getWebsitesWithName(name);
        for (const website of websitesWithName) {
            websites.push(new WebsiteDto(website._id, website.name, website.description, website.link, website.category, website.tags, website.votes));
        }
    }
    
    return websites;
  }
}