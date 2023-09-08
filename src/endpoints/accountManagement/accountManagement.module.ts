import { Module, DynamicModule } from '@nestjs/common';
import { RegisterController } from './register/register.controller';
import { LoginController } from './login/login.controller';
import { LogoutController } from './logout/logout.controller';
import { AccountTerminationController } from './accountTermination/accountTermination.controller';
import { SessionManagerModule } from 'src/dataAccess/sessionManager/sessionManager.module';
import { LoginService } from './login/login.service';
import { LogoutService } from './logout/logout.service';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Module({})
export class AccountManagementModule {
  static forRoot(redisHost: string, redisPort: number): DynamicModule {
    return {
      module: AccountManagementModule,
      imports: [SessionManagerModule.forRoot(redisHost, redisPort)],
      controllers: [RegisterController, LoginController, LogoutController, AccountTerminationController],
      providers: [LoginService, LogoutService, HttpExceptionFilter],
    }
  }
}