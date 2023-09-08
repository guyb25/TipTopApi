import { Injectable } from '@nestjs/common';
import { ServersDbService } from 'src/dataAccess/serversDb/serversDb.service';
import { SessionManagerService } from 'src/dataAccess/sessionManager/sessionManager.service';
import { OpResult } from 'src/models/OpResult';

@Injectable()
export class LoginService {
  constructor(private readonly sessionManagerService: SessionManagerService, private readonly serversDbService: ServersDbService) {
  }

  async isLoginValid(username: string, password: string): Promise<OpResult> {
    if (!await this.serversDbService.isUsernameTaken(username)) {
      return OpResult.UserNotExist;
    }

    if (!await this.serversDbService.doesUserMatchPassword(username, password)) {
      return OpResult.IncorrectPassword;
    }

    return OpResult.Success;
  }

  async login(username: string) : Promise<string> {
    return await this.sessionManagerService.createSession(username);
  }
}