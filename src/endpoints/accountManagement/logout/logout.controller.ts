import { Get, Param, Inject, Res, NotFoundException } from '@nestjs/common';
import { AccountManagementBaseController } from '../accountManagementBase.controller';
import { LogoutService } from './logout.service';
import { Response } from 'express';
import { OpResult } from 'src/models/response/OpResult';
import { serverResponses } from 'src/static/ServerResponses';
import { ServerRes } from 'src/models/response/ServerRes';

export class LogoutController extends AccountManagementBaseController {
  @Inject(LogoutService)
  private readonly logoutService: LogoutService;

  @Get("/logout/:sessionId")
  async logout(@Param('sessionId') sessionId: string, @Res() res: Response): Promise<Response> {
    const logoutValidityResult = await this.logoutService.canLogout(sessionId);

    if (logoutValidityResult === OpResult.SUCCESS) {
      await this.logoutService.logout(sessionId);
    }
    
    const serverResponse: ServerRes = serverResponses[logoutValidityResult]
    return res.status(serverResponse.status).json({ message: serverResponse.message});
  }
}
