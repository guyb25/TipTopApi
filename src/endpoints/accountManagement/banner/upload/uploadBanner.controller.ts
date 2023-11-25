import { Body, HttpStatus, Inject, Post, Res, UploadedFile } from '@nestjs/common';
import { AccountManagementBaseController } from '../../accountManagementBase.controller';
import { Response } from 'express';
import { OpResult } from 'src/models/response/OpResult';
import { serverResponses } from 'src/static/ServerResponses';
import { ServerRes } from 'src/models/response/ServerRes';
import { UploadBannerService } from './uploadBanner.service';
import { UploadBannerDto } from 'src/models/dtos/accountManagement/bannerUploadDto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common/decorators';

export class UploadBannerController extends AccountManagementBaseController {
  @Inject(UploadBannerService)
  private readonly uploadBannerService: UploadBannerService;
  
  @ApiConsumes('multipart/form-data')
  @Post("/banner/upload")
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        sessionKey: { type: 'string' },
        websiteId: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async upload(@Body() uploadBannerDto: UploadBannerDto, @UploadedFile() banner: Express.Multer.File, @Res() res: Response): Promise<Response> {
    const loginValidationResult = await this.uploadBannerService.isRequestValid(uploadBannerDto, banner);
    
    if (loginValidationResult === OpResult.SUCCESS) {
      const fileType = banner.mimetype.split('/').pop()
      await this.uploadBannerService.upload(banner, `${uploadBannerDto.websiteId}.${fileType}`);
      return res.status(HttpStatus.OK).json();
    }
    
    const serverResponse: ServerRes = serverResponses[loginValidationResult]
    return res.status(serverResponse.status).json({ message: serverResponse.message})
  }
}