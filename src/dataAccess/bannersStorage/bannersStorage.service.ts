export interface BannersStorageService {
    SaveBanner(img: Buffer, name: string): Promise<void>
}