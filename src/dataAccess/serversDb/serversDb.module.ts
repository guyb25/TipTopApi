import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebsiteModel } from './website.schema';
import { ServersDbService } from './serversDb.service';

@Module({})
export class ServersDbModule {
  static forRoot(connectionString: string) : DynamicModule {
    return {
      module: ServersDbModule,
      imports: [
        MongooseModule.forRoot(connectionString),
        MongooseModule.forFeature([{ name: 'Website', schema: WebsiteModel.schema }])
      ],
      controllers: [],
      providers: [ServersDbService],
      exports: [ServersDbService]
    }
  }
}