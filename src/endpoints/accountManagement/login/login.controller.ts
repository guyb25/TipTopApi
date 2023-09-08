import { Body, Inject, Post } from '@nestjs/common';
import { LoginWebsiteDto } from 'src/endpoints/dtos/accountManagement/loginWebsiteDto';
import { AccountManagementBaseController } from '../accountManagementBase.controller';
import { LoginService } from './login.service';

export class LoginController extends AccountManagementBaseController {
  @Inject(LoginService)
  private readonly loginService: LoginService;
  
  @Post("/login")
  async register(@Body() loginWebsiteDto: LoginWebsiteDto): Promise<string> {
    return await this.loginService.login(loginWebsiteDto.username);
  }
}
