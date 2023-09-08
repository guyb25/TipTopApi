import { Module } from '@nestjs/common';
import { GetWebsiteController } from './getWebsite/getWebsite.controller';
import { GetWebsitesController } from './getWebsites/getWebsites.controller';

@Module({
  imports: [],
  controllers: [GetWebsiteController, GetWebsitesController],
  providers: [],
})
export class surfingModule {}