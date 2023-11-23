import { Injectable } from '@nestjs/common';
import { ServersDbService } from 'src/dataAccess/serversDb/serversDb.service';
import { SessionManagerService } from 'src/dataAccess/sessionManager/sessionManager.service';
import { AccountTerminationDto } from 'src/models/dtos/accountManagement/accountTerminationDto';
import { OpResult } from 'src/models/response/OpResult';

@Injectable()
export class TerminateService {
  constructor(private readonly serversDbService: ServersDbService, private readonly sessionManager: SessionManagerService) {
  }

  async isTerminationFormValid(terminateAccountDto: AccountTerminationDto): Promise<OpResult> {
    if (!await this.serversDbService.isUsernameTaken(terminateAccountDto.username)) {
      return OpResult.USER_NOT_EXIST;
    }

    if (await this.sessionManager.getSession(terminateAccountDto.sessionId) !== terminateAccountDto.username) {
      return OpResult.SESSION_NOT_FOUND;
    }

    return OpResult.SUCCESS;
  }

  async terminate(terminateAccountDto: AccountTerminationDto): Promise<void> {
    await this.serversDbService.deleteWebsite(terminateAccountDto.username);
    await this.sessionManager.endSession(terminateAccountDto.sessionId);
  }
}