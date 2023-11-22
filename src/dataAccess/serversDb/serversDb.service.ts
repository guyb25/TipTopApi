import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Website } from './website.schema';

@Injectable()
export class ServersDbService {
  constructor(
    @InjectModel('Website') private readonly WebsiteModel: Model<Website>,
  ) {}

  async isUsernameTaken(username: string): Promise<boolean> {
    return (await this.WebsiteModel.findOne({ username: username })) !== null;
  }

  async isEmailTaken(email: string): Promise<boolean> {
    return (await this.WebsiteModel.findOne({ email: email })) !== null;
  }

  async doesUserMatchPassword(
    username: string,
    password: string,
  ): Promise<boolean> {
    return (
      (await this.WebsiteModel.findOne({ username: username })).password ===
      password
    );
  }

  async insertWebsite(website: Website): Promise<void> {
    const websiteModel = new this.WebsiteModel(website);
    await websiteModel.save();
  }

  async getWebsitesWithName(name: string): Promise<Website[]> {
    return await this.WebsiteModel.find({ name: name });
  }

  async deleteWebsite(username: string): Promise<void> {
    await this.WebsiteModel.deleteOne({ username: username });
  }

  async getWebsiteById(id: string): Promise<Website> {
    return await this.WebsiteModel.findById(id);
  }

  async websiteExists(id: string): Promise<boolean> {
    return (await this.WebsiteModel.exists({ _id: id })) !== null;
  }

  async incrementWebsiteVotes(id: string): Promise<void> {
    await this.WebsiteModel.updateOne({ _id: id }, { $inc: { votes: 1 } });
  }

  async filterWebsites(filter: any, skip: number, limit: number): Promise<Website[]> {
    return await this.WebsiteModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ votes: -1})
  }

  isValidId(id: string): boolean {
    return isValidObjectId(id);
  }
}
