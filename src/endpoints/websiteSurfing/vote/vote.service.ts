import { Injectable } from '@nestjs/common';
import { Vote } from 'src/dataAccess/votesDb/vote.schema';
import { ServersDbService } from 'src/dataAccess/serversDb/serversDb.service';
import { VotesDbService } from 'src/dataAccess/votesDb/votesDb.service';
import { OpResult } from 'src/models/response/OpResult';

@Injectable()
export class VoteService {
  constructor(private readonly serversDbService: ServersDbService, private readonly votesDbService: VotesDbService) {
  }

  async canVote(userIp: string, websiteId: string): Promise<OpResult> {
    if (!this.serversDbService.isValidId(websiteId)) {
      return OpResult.INVALID_WEBSITE_ID;
    }

    if (!await this.serversDbService.websiteExists(websiteId)) {
      return OpResult.WEBSITE_NOT_EXIST;
    }

    if (await this.votesDbService.didVoteToday(userIp)) {
      return OpResult.IP_VOTED_TODAY;
    }

    return OpResult.SUCCESS;
  }

  async vote(websiteId: string, userIp: string): Promise<void> {
    await this.serversDbService.incrementWebsiteVotes(websiteId);
    await this.votesDbService.insertVote(new Vote(userIp, new Date(), websiteId));
  }
}