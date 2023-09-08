import { Injectable } from '@nestjs/common';
import { SessionManagerService } from 'src/dataAccess/sessionManager/sessionManager.service';

@Injectable()
export class LogoutService {

  constructor(private readonly sessionManagerService: SessionManagerService) {
    this.sessionManagerService = sessionManagerService;
  }

  async logout(sessionKey : string) : Promise<void> {
    await this.sessionManagerService.endSession(sessionKey);
  }
}