import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Website Management')
@Controller("websiteManagement")
export class WebsiteManagementBaseController {
}
