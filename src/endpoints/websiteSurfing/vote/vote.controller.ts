import { Get, Inject, Param, Res, Ip } from '@nestjs/common';
import { SurfingBaseController } from '../surfingBase.controller';
import { VoteService } from './vote.service';
import { Response } from 'express';
import { OpResult } from 'src/models/OpResult';

export class VoteController extends SurfingBaseController {
    @Inject(VoteService)
    private readonly voteService: VoteService;

    @Get("/vote/:websiteId")
    async register(@Param('websiteId') websiteId: string, @Ip() ip: string, @Res() res: Response): Promise<Response> {
        const validationResult = await this.voteService.canVote(ip, websiteId);

        const resultMapping = {
            [OpResult.VotedToday] : { statusCode: 403, message: "This IP address has already voted today" },
            [OpResult.WebsiteNotExist] : { statusCode: 404, message: "The website doesn't exist" },
            [OpResult.InvalidId] : { statusCode: 400, message: "Website id is invalid" },
          }

        if (validationResult == OpResult.Success) {
            await this.voteService.vote(websiteId, ip);
            return res.status(200).json();
        }

        const responseObj = resultMapping[validationResult];
        return res.status(responseObj.statusCode).json({ message: responseObj.message});
    }
}
