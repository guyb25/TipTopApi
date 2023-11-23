import { Injectable } from '@nestjs/common';
import { SessionManagerService } from 'src/dataAccess/sessionManager/sessionManager.service';
import { OpResult } from 'src/models/response/OpResult';

@Injectable()
export class LogoutService {

  constructor(private readonly sessionManagerService: SessionManagerService) {
    this.sessionManagerService = sessionManagerService;
  }

  async canLogout(sessionKey: string): Promise<OpResult> {
    if (await this.sessionManagerService.getSession(sessionKey) === null) {
      return OpResult.SESSION_NOT_FOUND;
    }

    return OpResult.SUCCESS;
  }

  async logout(sessionKey: string): Promise<void> {
    await this.sessionManagerService.endSession(sessionKey);
  }
}