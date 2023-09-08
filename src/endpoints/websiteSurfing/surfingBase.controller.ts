import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Website Surfing')
@Controller("surfing")
export class SurfingBaseController {
}
