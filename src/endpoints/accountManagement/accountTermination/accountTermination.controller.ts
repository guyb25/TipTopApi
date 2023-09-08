import { Body, Delete } from '@nestjs/common';
import { AccountManagementBaseController } from '../accountManagementBase.controller';
import { AccountTerminationDto } from 'src/DTOs/accountManagement/accountTerminationDto';

export class AccountTerminationController extends AccountManagementBaseController {
  @Delete("/terminate")
  register(@Body() loginWebsiteDto: AccountTerminationDto): string {
    return loginWebsiteDto.name;
  }
}
