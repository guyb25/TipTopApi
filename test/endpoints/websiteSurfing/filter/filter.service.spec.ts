import { Test, TestingModule } from '@nestjs/testing';
import { ServersDbService } from 'src/dataAccess/serversDb/serversDb.service';
import { FilterService } from 'src/endpoints/websiteSurfing/filter/filter.service';
import { FilterDto } from 'src/endpoints/dtos/websiteSurfing/filterDto';
import { Website } from 'src/dataAccess/serversDb/website.schema';
import { WebsiteDto } from 'src/endpoints/dtos/websiteSurfing/websiteDto';

describe('filter.service', () => {
    let filterService: FilterService;
    let serversDbService: ServersDbService;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            FilterService,
            {
            provide: ServersDbService,
            useValue: {
                filterWebsites: jest.fn()
            },
            },
        ],
        }).compile();

        filterService = module.get<FilterService>(FilterService);
        serversDbService = module.get<ServersDbService>(ServersDbService);
    });

    it('should reconstruct db-structured Website models to website DTO', async () => {
        // Arrange
        const filter = new FilterDto(undefined, 'category', undefined, 5, 10)
        const websiteStub1 = new Website('name', 'username', 'pass', 'category', ['tag1', 'tag2'], 'description', 'email', 'link', 0)
        const websiteStub2 = new Website('name2', 'username2', 'pass2', 'category', [], 'description2', 'email2', 'link2', 5)
        websiteStub1._id = '1'
        websiteStub2._id = '2'
        const websiteDataStub = [websiteStub1, websiteStub2]
        
        const expectedWebsiteDtos = [
            new WebsiteDto(websiteStub1._id, websiteStub1.name, websiteStub1.description, websiteStub1.link, 
                websiteStub1.category, websiteStub1.tags, websiteStub1.votes),

            new WebsiteDto(websiteStub2._id, websiteStub2.name, websiteStub2.description, websiteStub2.link, 
                websiteStub2.category, websiteStub2.tags, websiteStub2.votes),
        ]

        serversDbService.filterWebsites = jest.fn().mockReturnValue(websiteDataStub)

        // Act
        const websites = await filterService.getWebsites(filter)
        
        // Assert
        expect(websites).toEqual(
            expect.arrayContaining(
                expectedWebsiteDtos.map((expectedDto) => expect.objectContaining(expectedDto))
            )
        )

        expect(websites).toHaveLength(expectedWebsiteDtos.length)
    });
});