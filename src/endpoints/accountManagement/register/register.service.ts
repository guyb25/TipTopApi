import { Injectable, Res } from '@nestjs/common';
import { ServersDbService } from 'src/dataAccess/serversDb/serversDb.service';
import { RegisterWebsiteDto } from 'src/endpoints/dtos/accountManagement/registerWebsiteDto';
import { OpResult } from 'src/models/OpResult';

@Injectable()
export class RegisterService {
  constructor(private readonly serversDbService: ServersDbService) {
  }

  async isRegistrationFormValid(registerWebsiteDto: RegisterWebsiteDto): Promise<OpResult> {
    if (await this.serversDbService.isEmailTaken(registerWebsiteDto.email)) {
      return OpResult.EmailTaken;
    }

    if (await this.serversDbService.isUsernameTaken(registerWebsiteDto.username)) {
      return OpResult.UserTaken;
    }

    return OpResult.Success;
  }

  async register(registerWebsiteDto: RegisterWebsiteDto): Promise<void> {
    await this.serversDbService.registerWebsite(registerWebsiteDto);
  }
}