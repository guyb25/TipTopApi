import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { LoginWebsiteDto } from 'src/DTOs/Administration/LoginWebsiteDto';
import { AdministrationBaseController } from '../administrationBase.controller';

export class LoginController extends AdministrationBaseController {
  @Post("/login")
  register(@Body() loginWebsiteDto: LoginWebsiteDto): string {
    return loginWebsiteDto.name;
  }
}
