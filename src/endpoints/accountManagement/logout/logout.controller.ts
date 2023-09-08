import { Get, Param, Inject, UseFilters, Res, NotFoundException } from '@nestjs/common';
import { AccountManagementBaseController } from '../accountManagementBase.controller';
import { LogoutService } from './logout.service';
import { Response } from 'express';

export class LogoutController extends AccountManagementBaseController {
  @Inject(LogoutService)
  private readonly logoutService: LogoutService;

  @Get("/logout/:sessionId")
  async register(@Param('sessionId') sessionId: string, @Res() res: Response): Promise<Response> {
    try {
      await this.logoutService.logout(sessionId);
    }

    catch (e) {
      if (e instanceof NotFoundException) {
        return res.status(404).json({ message: e.message});
      }
    }

    return res.status(200).json();
  }
}
