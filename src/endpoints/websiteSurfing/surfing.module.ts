import { Module, DynamicModule } from '@nestjs/common';
import { GetWebsitesController } from './getWebsites/getWebsites.controller';
import { GetWebsitesService } from './getWebsites/getWebsites.service';
import { ServersDbModule } from 'src/dataAccess/serversDb/serversDb.module';
import { VotesDbModule } from 'src/dataAccess/votesDb/votesDb.module';
import { VoteController } from './vote/vote.controller';
import { VoteService } from './vote/vote.service';

@Module({})
export class SurfingModule {
  static forRoot(serversDbConnectionString: string, votesDbConnectionString: string): DynamicModule {
    return {
      module: SurfingModule,
      imports: [ServersDbModule.forRoot(serversDbConnectionString), VotesDbModule.forRoot(votesDbConnectionString)],
      controllers: [GetWebsitesController, VoteController],
      providers: [GetWebsitesService, VoteService],
    }
  }
}