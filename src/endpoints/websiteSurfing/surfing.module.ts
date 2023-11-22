import { Module, DynamicModule } from '@nestjs/common';
import { ServersDbModule } from 'src/dataAccess/serversDb/serversDb.module';
import { VotesDbModule } from 'src/dataAccess/votesDb/votesDb.module';
import { VoteController } from './vote/vote.controller';
import { VoteService } from './vote/vote.service';
import { FilterController } from './filter/filter.controller';
import { FilterService } from './filter/filter.service';

@Module({})
export class SurfingModule {
  static forRoot(serversDbConnectionString: string, votesDbConnectionString: string): DynamicModule {
    return {
      module: SurfingModule,
      imports: [ServersDbModule.forRoot(serversDbConnectionString), VotesDbModule.forRoot(votesDbConnectionString)],
      controllers: [FilterController, VoteController],
      providers: [FilterService, VoteService],
    }
  }
}