import { Get, Param, Inject, Res, NotFoundException } from '@nestjs/common';
import { AccountManagementBaseController } from '../accountManagementBase.controller';
import { LogoutService } from './logout.service';
import { Response } from 'express';
import { OpResult } from 'src/models/OpResult';

export class LogoutController extends AccountManagementBaseController {
  @Inject(LogoutService)
  private readonly logoutService: LogoutService;

  @Get("/logout/:sessionId")
  async logout(@Param('sessionId') sessionId: string, @Res() res: Response): Promise<Response> {
    const logoutValidityResult = await this.logoutService.canLogout(sessionId);

    if (logoutValidityResult === OpResult.SessionNotFound) {
      return res.status(404).json({message: 'session not found'});
    }

    await this.logoutService.logout(sessionId);
    return res.status(200).json();
  }
}
