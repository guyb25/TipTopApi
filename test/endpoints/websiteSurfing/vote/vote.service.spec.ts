import { Test, TestingModule } from '@nestjs/testing';
import { ServersDbService } from 'src/dataAccess/serversDb/serversDb.service';
import { VotesDbService } from 'src/dataAccess/votesDb/votesDb.service';
import { VoteService } from 'src/endpoints/websiteSurfing/vote/vote.service';
import { OpResult } from 'src/models/response/OpResult';

describe('vote.service', () => {
    let voteService: VoteService
    let serversDbService: ServersDbService
    let votesDbService: VotesDbService
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            VoteService,
            {
                provide: ServersDbService,
                useValue: {
                    isValidId: jest.fn(),
                    websiteExists: jest.fn(),
                    incrementWebsiteVotes: jest.fn(),
                    insertVote: jest.fn()
                },
            },
            {
                provide: VotesDbService,
                useValue: {
                    didVoteToday: jest.fn()
                }
            }
        ],
        }).compile()

        voteService = module.get<VoteService>(VoteService)
        serversDbService = module.get<ServersDbService>(ServersDbService)
        votesDbService = module.get<VotesDbService>(VotesDbService)
    });

    it('canVote should return InvalidId when id is not valid', async () => {
        // Arrange
        serversDbService.isValidId = jest.fn().mockReturnValue(false)
        serversDbService.websiteExists = jest.fn().mockReturnValue(true)
        votesDbService.didVoteToday = jest.fn().mockReturnValue(false)

        // Act
        const canVote = await voteService.canVote('ip', 'id')

        // Assert
        expect(canVote).toBe(OpResult.INVALID_WEBSITE_ID)
    });

    it('canVote should return websiteNotExist when website doesnt exist', async () => {
        // Arrange
        serversDbService.isValidId = jest.fn().mockReturnValue(true)
        serversDbService.websiteExists = jest.fn().mockReturnValue(false)
        votesDbService.didVoteToday = jest.fn().mockReturnValue(false)

        // Act
        const canVote = await voteService.canVote('ip', 'id')

        // Assert
        expect(canVote).toBe(OpResult.WEBSITE_NOT_EXIST)
    });

    it('canVote should return votedToday when the user has already voted today', async () => {
        // Arrange
        serversDbService.isValidId = jest.fn().mockReturnValue(true)
        serversDbService.websiteExists = jest.fn().mockReturnValue(true)
        votesDbService.didVoteToday = jest.fn().mockReturnValue(true)

        // Act
        const canVote = await voteService.canVote('ip', 'id')

        // Assert
        expect(canVote).toBe(OpResult.IP_VOTED_TODAY)
    });

    it('canVote should return success when the user has all valid parameters', async () => {
        // Arrange
        serversDbService.isValidId = jest.fn().mockReturnValue(true)
        serversDbService.websiteExists = jest.fn().mockReturnValue(true)
        votesDbService.didVoteToday = jest.fn().mockReturnValue(false)

        // Act
        const canVote = await voteService.canVote('ip', 'id')

        // Assert
        expect(canVote).toBe(OpResult.SUCCESS)
    });
});