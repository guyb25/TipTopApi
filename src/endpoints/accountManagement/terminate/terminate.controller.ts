import { Body, Delete, Inject, Res } from '@nestjs/common';
import { AccountManagementBaseController } from '../accountManagementBase.controller';
import { AccountTerminationDto } from 'src/endpoints/dtos/accountManagement/accountTerminationDto';
import { TerminateService } from './terminate.service';
import { Response } from 'express';
import { OpResult } from 'src/models/OpResult';

export class TerminateController extends AccountManagementBaseController {
  @Inject(TerminateService)
  private readonly terminateService: TerminateService;

  @Delete("/terminate")
  async terminate(@Body() terminateAccountDto: AccountTerminationDto, @Res() res: Response): Promise<Response> {
    const validationResult = await this.terminateService.isTerminationFormValid(terminateAccountDto);
    
    const resultMapping = {
      [OpResult.UserNotExist] : { statusCode: 404, message: "The user doesn't exist" },
      [OpResult.SessionNotFound] : { statusCode: 404, message: "Session not found" }
    }

    if (validationResult == OpResult.Success) {
      await this.terminateService.terminate(terminateAccountDto);
      return res.status(200).json();
    }

    const responseObj = resultMapping[validationResult];
    return res.status(responseObj.statusCode).json({ message: responseObj.message});
  }
}
