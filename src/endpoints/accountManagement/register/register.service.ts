import { Injectable, Res } from '@nestjs/common';
import { ServersDbService } from 'src/dataAccess/serversDb/serversDb.service';
import { Website } from 'src/dataAccess/serversDb/website.schema';
import { RegisterWebsiteDto } from 'src/models/dtos/accountManagement/registerWebsiteDto';
import { OpResult } from 'src/models/response/OpResult';

@Injectable()
export class RegisterService {
  constructor(private readonly serversDbService: ServersDbService) {
  }

  async isRegistrationFormValid(registerWebsiteDto: RegisterWebsiteDto): Promise<OpResult> {
    if (await this.serversDbService.isEmailTaken(registerWebsiteDto.email)) {
      return OpResult.EMAIL_TAKEN;
    }

    if (await this.serversDbService.isUsernameTaken(registerWebsiteDto.username)) {
      return OpResult.USER_TAKEN;
    }

    return OpResult.SUCCESS;
  }

  async register(registerWebsiteDto: RegisterWebsiteDto): Promise<void> {
    await this.serversDbService.insertWebsite(new Website(
      registerWebsiteDto.name,
      registerWebsiteDto.username,
      registerWebsiteDto.password,
      registerWebsiteDto.category,
      registerWebsiteDto.tags,
      registerWebsiteDto.description,
      registerWebsiteDto.email,
      registerWebsiteDto.link,
      0
      ));
  }
}