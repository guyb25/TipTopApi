import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { RegisterWebsiteDto } from 'src/DTOs/Administration/RegisterWebsiteDto';
import { AdministrationBaseController } from '../administrationBase.controller';

export class RegisterController extends AdministrationBaseController {
  @Post("/register")
  register(@Body() registerWebsiteDto: RegisterWebsiteDto): string {
    return registerWebsiteDto.name;
  }
}
