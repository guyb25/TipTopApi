import { Body, Delete, HttpStatus, Inject, Res } from '@nestjs/common';
import { AccountManagementBaseController } from '../accountManagementBase.controller';
import { AccountTerminationDto } from 'src/models/dtos/accountManagement/accountTerminationDto';
import { TerminateService } from './terminate.service';
import { Response } from 'express';
import { OpResult } from 'src/models/response/OpResult';
import { serverResponses } from 'src/static/ServerResponses';
import { ServerRes } from 'src/models/response/ServerRes';

export class TerminateController extends AccountManagementBaseController {
  @Inject(TerminateService)
  private readonly terminateService: TerminateService;

  @Delete("/terminate")
  async terminate(@Body() terminateAccountDto: AccountTerminationDto, @Res() res: Response): Promise<Response> {
    const validationResult = await this.terminateService.isTerminationFormValid(terminateAccountDto);

    if (validationResult == OpResult.SUCCESS) {
      await this.terminateService.terminate(terminateAccountDto);
      return res.status(HttpStatus.OK).json();
    }

    const serverResponse: ServerRes = serverResponses[validationResult];
    return res.status(serverResponse.status).json({ message: serverResponse.message});
  }
}
