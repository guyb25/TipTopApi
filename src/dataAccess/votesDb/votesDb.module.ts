import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VoteModel } from './vote.schema';
import { VotesDbService } from './votesDb.service';

@Module({})
export class VotesDbModule {
  static forRoot(connectionString: string) : DynamicModule {
    return {
      module: VotesDbModule,
      imports: [
        MongooseModule.forRoot(connectionString),
        MongooseModule.forFeature([{ name: 'Vote', schema: VoteModel.schema }])
      ],
      controllers: [],
      providers: [VotesDbService],
      exports: [VotesDbService]
    }
  }
}