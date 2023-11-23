import { Get, Inject, Param, Res, Ip } from '@nestjs/common';
import { SurfingBaseController } from '../surfingBase.controller';
import { VoteService } from './vote.service';
import { Response } from 'express';
import { OpResult } from 'src/models/response/OpResult';
import { serverResponses } from 'src/static/ServerResponses';
import { ServerRes } from 'src/models/response/ServerRes';

export class VoteController extends SurfingBaseController {
    @Inject(VoteService)
    private readonly voteService: VoteService;

    @Get("/vote/:websiteId")
    async vote(@Param('websiteId') websiteId: string, @Ip() ip: string, @Res() res: Response): Promise<Response> {
        const validationResult = await this.voteService.canVote(ip, websiteId);

        if (validationResult == OpResult.SUCCESS) {
            await this.voteService.vote(websiteId, ip);
        }

        const serverResponse: ServerRes = serverResponses[validationResult]
        return res.status(serverResponse.status).json({ message: serverResponse.message});
    }
}
