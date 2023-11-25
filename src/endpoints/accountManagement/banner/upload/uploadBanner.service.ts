import { Inject, Injectable } from '@nestjs/common';
import { ServersDbService } from 'src/dataAccess/serversDb/serversDb.service';
import { SessionManagerService } from 'src/dataAccess/sessionManager/sessionManager.service';
import { OpResult } from 'src/models/response/OpResult';
import { UploadBannerDto } from 'src/models/dtos/accountManagement/bannerUploadDto';
import { BannersStorageService } from 'src/dataAccess/bannersStorage/bannersStorage.service';

@Injectable()
export class UploadBannerService {
    @Inject(SessionManagerService)
    private readonly sessionManagerService: SessionManagerService

    @Inject(ServersDbService)
    private readonly serversDbService: ServersDbService

    @Inject('BannersStorage')
    private readonly bannerStorage: BannersStorageService

    async isRequestValid(uploadBannerDto: UploadBannerDto, banner: Express.Multer.File): Promise<OpResult> {
        const username = await this.sessionManagerService.getSession(uploadBannerDto.sessionKey)
        
        if (username === null) {
            return OpResult.SESSION_NOT_FOUND
        }

        const website = await this.serversDbService.getWebsiteById(uploadBannerDto.websiteId)

        if (website === undefined || website.username !== username) {
            return OpResult.INVALID_WEBSITE_ID
        }

        if (!['image/jpeg', 'image/png'].includes(banner.mimetype)) {
            return OpResult.INVALID_FILE_TYPE_IMAGE
        }

        return OpResult.SUCCESS
    }

    async upload(banner: Express.Multer.File, name: string): Promise<void> {
        await this.bannerStorage.SaveBanner(banner.buffer, name)
    }
}