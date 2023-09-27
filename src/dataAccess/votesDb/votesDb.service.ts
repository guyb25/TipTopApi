import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vote } from './vote.schema';

@Injectable()
export class VotesDbService {
  constructor(@InjectModel('Vote') private readonly VoteModel: Model<Vote>) {}

  async insertVote(vote: Vote): Promise<void> {
    const voteModel = new this.VoteModel(vote);
    await voteModel.save();
  }

  async didVoteToday(ip: string): Promise<boolean> {
    const todayMidnight = new Date().setHours(0, 0, 0, 0);
    return (
      (await this.VoteModel.exists({
        ip: ip,
        time: { $gte: todayMidnight },
      })) !== null
    );
  }
}
