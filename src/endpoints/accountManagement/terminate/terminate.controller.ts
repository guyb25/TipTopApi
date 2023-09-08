import { Body, Delete } from '@nestjs/common';
import { AccountManagementBaseController } from '../accountManagementBase.controller';
import { AccountTerminationDto } from 'src/endpoints/dtos/accountManagement/accountTerminationDto';

export class TerminateController extends AccountManagementBaseController {
  @Delete("/terminate")
  register(@Body() loginWebsiteDto: AccountTerminationDto): string {
    return loginWebsiteDto.name;
  }
}
