import { Injectable } from '@nestjs/common';
import { Vote } from 'src/dataAccess/votesDb/vote.schema';
import { ServersDbService } from 'src/dataAccess/serversDb/serversDb.service';
import { VotesDbService } from 'src/dataAccess/votesDb/votesDb.service';
import { OpResult } from 'src/models/OpResult';

@Injectable()
export class VoteService {
  constructor(private readonly serversDbService: ServersDbService, private readonly votesDbService: VotesDbService) {
  }

  async canVote(userIp: string, websiteId: string): Promise<OpResult> {
    if (!this.serversDbService.isValidId(websiteId)) {
      return OpResult.InvalidId;
    }

    if (!await this.serversDbService.websiteExists(websiteId)) {
      return OpResult.WebsiteNotExist;
    }

    if (await this.votesDbService.didVoteToday(userIp)) {
      return OpResult.VotedToday;
    }

    return OpResult.Success;
  }

  async vote(websiteId: string, userIp: string): Promise<void> {
    await this.serversDbService.incrementWebsiteVotes(websiteId);
    await this.votesDbService.insertVote(new Vote(userIp, new Date(), websiteId));
  }
}