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

@Module({})
export class AccountManagementModule {
  static forRoot(redisHost: string, redisPort: number, mongoDbConnectionString: string): DynamicModule {
    return {
      module: AccountManagementModule,
      imports: [
        SessionManagerModule.forRoot(redisHost, redisPort), 
        ServersDbModule.forRoot(mongoDbConnectionString)
      ],
      controllers: [RegisterController, LoginController, LogoutController, TerminateController],
      providers: [LoginService, LogoutService, RegisterService, TerminateService],
    }
  }
}