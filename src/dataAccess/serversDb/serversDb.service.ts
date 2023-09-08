import { Injectable } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { RegisterWebsiteDto } from 'src/endpoints/dtos/accountManagement/registerWebsiteDto';
import { Website } from './schemas/website.schema';
import { Model } from 'mongoose';

@Injectable()
export class ServersDbService {
    constructor(@InjectModel('Website') private readonly WebsiteModel: Model<Website>) {
    }

    async isUsernameTaken(username: string): Promise<boolean> {
        return await this.WebsiteModel.findOne({ username: username}) !== null;
    }

    async isEmailTaken(email: string): Promise<boolean> {
        return await this.WebsiteModel.findOne({ email: email}) !== null;
    }

    async registerWebsite(registerWebsiteDto : RegisterWebsiteDto): Promise<void> {
        const websiteProps = new Website(
            registerWebsiteDto.name,
            registerWebsiteDto.username,
            registerWebsiteDto.password,
            registerWebsiteDto.category,
            registerWebsiteDto.tags,
            registerWebsiteDto.description,
            registerWebsiteDto.email,
            registerWebsiteDto.link,
            0
            );

        const newWebsite = new this.WebsiteModel(websiteProps);
        await newWebsite.save();
    }
}