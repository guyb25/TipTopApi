import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Account Management')
@Controller("accountManagement")
export class AccountManagementBaseController {
}
