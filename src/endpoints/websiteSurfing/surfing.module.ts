import { Module, DynamicModule } from '@nestjs/common';
import { GetWebsitesController } from './getWebsites/getWebsites.controller';
import { GetWebsitesService } from './getWebsites/getWebsites.service';
import { ServersDbModule } from 'src/dataAccess/serversDb/serversDb.module';

@Module({})
export class SurfingModule {
  static forRoot(mongoDbConnectionString: string): DynamicModule {
    return {
      module: SurfingModule,
      imports: [ServersDbModule.forRoot(mongoDbConnectionString)],
      controllers: [GetWebsitesController],
      providers: [GetWebsitesService],
    }
  }
}