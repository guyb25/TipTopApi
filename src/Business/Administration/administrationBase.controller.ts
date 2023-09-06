import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Administration')
@Controller("administration")
export class AdministrationBaseController {
}
