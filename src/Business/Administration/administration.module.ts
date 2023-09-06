import { Module } from '@nestjs/common';
import { RegisterController } from './Register/register.controller';
import { LoginController } from './Login/login.controller';
import { LogoutController } from './Logout/logout.controller';

@Module({
  imports: [],
  controllers: [RegisterController, LoginController, LogoutController],
  providers: [],
})
export class AdministrationModule {}