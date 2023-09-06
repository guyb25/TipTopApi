import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { LogoutWebsiteDto } from 'src/DTOs/Administration/LogoutWebsiteDto';
import { AdministrationBaseController } from '../administrationBase.controller';

export class LogoutController extends AdministrationBaseController {
  @Post("/logout")
  register(@Body() loginWebsiteDto: LogoutWebsiteDto): string {
    return loginWebsiteDto.name;
  }
}
