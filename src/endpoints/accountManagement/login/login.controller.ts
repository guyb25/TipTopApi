import { Body, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import { LoginWebsiteDto } from 'src/models/dtos/accountManagement/loginWebsiteDto';
import { AccountManagementBaseController } from '../accountManagementBase.controller';
import { LoginService } from './login.service';
import { Response } from 'express';
import { OpResult } from 'src/models/response/OpResult';
import { serverResponses } from 'src/static/ServerResponses';
import { ServerRes } from 'src/models/response/ServerRes';

export class LoginController extends AccountManagementBaseController {
  @Inject(LoginService)
  private readonly loginService: LoginService;
  
  @Post("/login")
  async register(@Body() loginWebsiteDto: LoginWebsiteDto, @Res() res: Response): Promise<Response> {
    const loginValidationResult = await this.loginService.isLoginValid(loginWebsiteDto.username, loginWebsiteDto.password);
    
    if (loginValidationResult === OpResult.SUCCESS) {
      const sessionId = await this.loginService.login(loginWebsiteDto.username);
      return res.status(HttpStatus.OK).json({sessionId: sessionId});
    }
    
    const serverResponse: ServerRes = serverResponses[loginValidationResult]
    return res.status(serverResponse.status).json({ message: serverResponse.message});
  }
}
