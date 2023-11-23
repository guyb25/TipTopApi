import { Body, Post, Inject, Res } from '@nestjs/common';
import { RegisterWebsiteDto } from 'src/models/dtos/accountManagement/registerWebsiteDto';
import { AccountManagementBaseController } from '../accountManagementBase.controller';
import { RegisterService } from './register.service';
import { Response } from 'express';
import { OpResult } from 'src/models/response/OpResult';
import { serverResponses } from 'src/static/ServerResponses';
import { ServerRes } from 'src/models/response/ServerRes';

export class RegisterController extends AccountManagementBaseController {
  @Inject(RegisterService)
  private readonly registerService: RegisterService;

  @Post("/register")
  async register(@Body() registerWebsiteDto: RegisterWebsiteDto, @Res() res: Response): Promise<Response> {
    const formValidationResult = await this.registerService.isRegistrationFormValid(registerWebsiteDto);
    
    if (formValidationResult === OpResult.SUCCESS) {
      await this.registerService.register(registerWebsiteDto);
    }
    
    const serverResponse: ServerRes = serverResponses[formValidationResult];
    return res.status(serverResponse.status).json({ message: serverResponse.message});
  }
}
