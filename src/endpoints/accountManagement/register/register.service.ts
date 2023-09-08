import { Injectable, Res } from '@nestjs/common';
import { ServersDbService } from 'src/dataAccess/serversDb/serversDb.service';
import { RegisterWebsiteDto } from 'src/endpoints/dtos/accountManagement/registerWebsiteDto';
import { Result } from 'src/models/OperationResult';

@Injectable()
export class RegisterService {
  constructor(private readonly serversDbService: ServersDbService) {
    this.serversDbService = serversDbService;
  }

  async isRegistrationFormValid(registerWebsiteDto: RegisterWebsiteDto): Promise<Result> {
    if (await this.serversDbService.isEmailTaken(registerWebsiteDto.email)) {
      return Result.EmailTaken;
    }

    if (await this.serversDbService.isUsernameTaken(registerWebsiteDto.username)) {
      return Result.UserTaken;
    }

    return Result.Success;
  }

  async register(registerWebsiteDto: RegisterWebsiteDto): Promise<void> {
    await this.serversDbService.registerWebsite(registerWebsiteDto);
  }
}