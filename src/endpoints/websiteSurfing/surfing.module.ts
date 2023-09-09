import { Module, DynamicModule } from '@nestjs/common';
import { GetWebsiteController } from './getWebsite/getWebsite.controller';
import { GetWebsitesController } from './getWebsites/getWebsites.controller';
import { GetWebsitesService } from './getWebsites/getWebsites.service';
import { ServersDbModule } from 'src/dataAccess/serversDb/serversDb.module';

@Module({})
export class SurfingModule {
  static forRoot(mongoDbConnectionString: string): DynamicModule {
    return {
      module: SurfingModule,
      imports: [ServersDbModule.forRoot(mongoDbConnectionString)],
      controllers: [GetWebsiteController, GetWebsitesController],
      providers: [GetWebsitesService],
    }
  }
}