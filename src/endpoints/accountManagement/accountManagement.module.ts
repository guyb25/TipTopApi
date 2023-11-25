import { Module, DynamicModule } from '@nestjs/common';
import { RegisterController } from './register/register.controller';
import { LoginController } from './login/login.controller';
import { LogoutController } from './logout/logout.controller';
import { TerminateController } from './terminate/terminate.controller';
import { SessionManagerModule } from 'src/dataAccess/sessionManager/sessionManager.module';
import { LoginService } from './login/login.service';
import { LogoutService } from './logout/logout.service';
import { RegisterService } from './register/register.service';
import { ServersDbModule } from 'src/dataAccess/serversDb/serversDb.module';
import { TerminateService } from './terminate/terminate.service';
import { UploadBannerController } from './banner/upload/uploadBanner.controller';
import { UploadBannerService } from './banner/upload/uploadBanner.service';
import { FsBannersStorageModule } from 'src/dataAccess/bannersStorage/fsBannersStorage/fsBannersStorage.module';

@Module({})
export class AccountManagementModule {
  static forRoot(redisHost: string, redisPort: number, mongoDbConnectionString: string, bannersConfigPath: string): DynamicModule {
    return {
      module: AccountManagementModule,
      imports: [
        SessionManagerModule.forRoot(redisHost, redisPort), 
        ServersDbModule.forRoot(mongoDbConnectionString), 
        FsBannersStorageModule.forRoot(bannersConfigPath)
      ],
      controllers: [RegisterController, LoginController, LogoutController, TerminateController, UploadBannerController],
      providers: [LoginService, LogoutService, RegisterService, TerminateService, UploadBannerService],
    }
  }
}