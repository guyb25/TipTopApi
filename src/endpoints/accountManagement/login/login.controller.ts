import { Body, Inject, Post, Res } from '@nestjs/common';
import { LoginWebsiteDto } from 'src/dtos/accountManagement/loginWebsiteDto';
import { AccountManagementBaseController } from '../accountManagementBase.controller';
import { LoginService } from './login.service';
import { Response } from 'express';
import { OpResult } from 'src/models/OpResult';

export class LoginController extends AccountManagementBaseController {
  @Inject(LoginService)
  private readonly loginService: LoginService;
  
  @Post("/login")
  async register(@Body() loginWebsiteDto: LoginWebsiteDto, @Res() res: Response): Promise<Response> {
    const loginValidationResult = await this.loginService.isLoginValid(loginWebsiteDto.username, loginWebsiteDto.password);

    const resultMapping = {
      [OpResult.UserNotExist] : { statusCode: 404, message: "The username doesn't exist" },
      [OpResult.IncorrectPassword] : { statusCode: 401, message: "Incorrect username or password" }
    }
    
    if (loginValidationResult === OpResult.Success) {
      const sessionId = await this.loginService.login(loginWebsiteDto.username);
      return res.status(200).json({sessionId: sessionId});
    }
    
    const responseObj = resultMapping[loginValidationResult]
    return res.status(responseObj.statusCode).json({ message: responseObj.message});
  }
}
