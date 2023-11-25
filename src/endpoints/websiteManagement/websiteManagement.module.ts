import { Module, DynamicModule } from '@nestjs/common';
import { UploadBannerController } from './banner/upload/uploadBanner.controller';
import { UploadBannerService } from './banner/upload/uploadBanner.service';
import { FsBannersStorageModule } from 'src/dataAccess/bannersStorage/fsBannersStorage/fsBannersStorage.module';
import { SessionManagerModule } from 'src/dataAccess/sessionManager/sessionManager.module';
import { ServersDbModule } from 'src/dataAccess/serversDb/serversDb.module';

@Module({})
export class WebsiteManagementModule {
  static forRoot(redisHost: string, redisPort: number, mongoDbConnectionString: string, bannersConfigPath: string): DynamicModule {
    return {
      module: WebsiteManagementModule,
      imports: [
        SessionManagerModule.forRoot(redisHost, redisPort), 
        ServersDbModule.forRoot(mongoDbConnectionString), 
        FsBannersStorageModule.forRoot(bannersConfigPath)
      ],
      controllers: [UploadBannerController],
      providers: [UploadBannerService],
    }
  }
}