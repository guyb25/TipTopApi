import { Body, Post, Inject, Res } from '@nestjs/common';
import { RegisterWebsiteDto } from 'src/endpoints/dtos/accountManagement/registerWebsiteDto';
import { AccountManagementBaseController } from '../accountManagementBase.controller';
import { RegisterService } from './register.service';
import { Response } from 'express';
import { OpResult } from 'src/models/OpResult';

export class RegisterController extends AccountManagementBaseController {
  @Inject(RegisterService)
  private readonly registerService: RegisterService;

  @Post("/register")
  async register(@Body() registerWebsiteDto: RegisterWebsiteDto, @Res() res: Response): Promise<Response> {
    const formValidationResult = await this.registerService.isRegistrationFormValid(registerWebsiteDto);

    const resultMapping = {
      [OpResult.EmailTaken] : { statusCode: 409, message: "The email is already taken" },
      [OpResult.UserTaken] : { statusCode: 409, message: "The username is already taken" }
    }
    
    if (formValidationResult === OpResult.Success) {
      await this.registerService.register(registerWebsiteDto);
      return res.status(200).json()
    }
    
    const responseObj = resultMapping[formValidationResult]
    return res.status(responseObj.statusCode).json({ message: responseObj.message});
  }
}
