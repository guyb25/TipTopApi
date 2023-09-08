import { Body, Post} from '@nestjs/common';
import { RegisterWebsiteDto } from 'src/DTOs/accountManagement/registerWebsiteDto';
import { AccountManagementBaseController } from '../accountManagementBase.controller';

export class RegisterController extends AccountManagementBaseController {
  @Post("/register")
  register(@Body() registerWebsiteDto: RegisterWebsiteDto): string {
    return registerWebsiteDto.name;
  }
}
