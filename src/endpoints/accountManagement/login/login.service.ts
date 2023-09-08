import { Injectable } from '@nestjs/common';
import { SessionManagerService } from 'src/dataAccess/sessionManager/sessionManager.service';

@Injectable()
export class LoginService {

  constructor(private readonly sessionManagerService: SessionManagerService) {
    this.sessionManagerService = sessionManagerService;
  }

  async login(username : string) : Promise<string> {
        return await this.sessionManagerService.createSession(username);
  }
}