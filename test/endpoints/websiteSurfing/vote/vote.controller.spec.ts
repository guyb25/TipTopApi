import { Test, TestingModule } from '@nestjs/testing';
import { VoteController } from 'src/endpoints/websiteSurfing/vote/vote.controller';
import { VoteService } from 'src/endpoints/websiteSurfing/vote/vote.service';
import { OpResult } from 'src/models/response/OpResult';
import { serverResponses } from 'src/static/ServerResponses';
import { responseMock } from 'test/endpoints/responseMock';

describe('vote.controller', () => {
    let voteController: VoteController
    let voteServiceStub: VoteService

    beforeEach(async () => {
        const module : TestingModule = await Test.createTestingModule({
        controllers: [VoteController],
        providers: [
            {
                provide: VoteService,
                useValue: {
                    canVote: jest.fn(),
                    vote: jest.fn()
                }
            }
        ],
        }).compile();

        voteController = module.get(VoteController);
        voteServiceStub = module.get(VoteService)
    });

    it('should return VotedToday when ip has already voted today', async () => {
        // Arrange
        voteServiceStub.canVote = jest.fn().mockReturnValue(OpResult.IP_VOTED_TODAY)

        // Act
        await voteController.vote('id', 'ip', responseMock)

        // Assert
        expect(responseMock.status).toHaveBeenCalledWith(serverResponses.ipVotedToday.status)
        expect(responseMock.json).toHaveBeenCalledWith({ message: serverResponses.ipVotedToday.message })
    })

    it('should return WebsiteNotExist when the website doesnt exist', async () => {
        // Arrange
        voteServiceStub.canVote = jest.fn().mockReturnValue(OpResult.WEBSITE_NOT_EXIST)

        // Act
        await voteController.vote('id', 'ip', responseMock)

        // Assert
        expect(responseMock.status).toHaveBeenCalledWith(serverResponses.websiteNotExist.status )
        expect(responseMock.json).toHaveBeenCalledWith({ message: serverResponses.websiteNotExist.message })
    })

    it('should return InvalidId when the website id is invalid', async () => {
        // Arrange
        voteServiceStub.canVote = jest.fn().mockReturnValue(OpResult.INVALID_WEBSITE_ID)

        // Act
        await voteController.vote('id', 'ip', responseMock)

        // Assert
        expect(responseMock.status).toHaveBeenCalledWith(serverResponses.invalidWebsiteId.status)
        expect(responseMock.json).toHaveBeenCalledWith({ message: serverResponses.invalidWebsiteId.message })
    })

    it('should return success when the website can be voted for', async () => {
        // Arrange
        const id = 'id'
        const ip = 'ip'
        voteServiceStub.canVote = jest.fn().mockReturnValue(OpResult.SUCCESS)

        // Act
        await voteController.vote(id, ip, responseMock)

        // Assert
        expect(voteServiceStub.vote).toHaveBeenCalledWith(id, ip)
        expect(responseMock.status).toHaveBeenCalledWith(serverResponses.success.status)
    })
});
