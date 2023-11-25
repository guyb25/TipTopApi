import { Inject, Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import { BannersStorageService } from '../bannersStorage.service'

@Injectable()
export class FsBannersStorageService implements BannersStorageService {
    @Inject('BANNERS_DIR')
    private readonly bannersDir: string

    async SaveBanner(img: Buffer, name: string) {
        // Ensure directory exists, create if it doesn't
        if (!fs.existsSync(this.bannersDir)) {
            fs.mkdirSync(this.bannersDir, { recursive: true });
        }

        // Save banner
        const bannerPath = path.join(this.bannersDir, name)
        fs.writeFileSync(bannerPath, img)
    }
}