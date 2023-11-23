import { Response } from 'express';
import { Test, TestingModule } from '@nestjs/testing';
import { VoteController } from 'src/endpoints/websiteSurfing/vote/vote.controller';
import { VoteService } from 'src/endpoints/websiteSurfing/vote/vote.service';
import { OpResult } from 'src/models/OpResult';

describe('vote.controller', () => {
    let voteController: VoteController
    let voteServiceStub: VoteService
    
    const responseMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as any as Response;

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
        voteServiceStub.canVote = jest.fn().mockReturnValue(OpResult.VotedToday)

        // Act
        await voteController.vote('id', 'ip', responseMock)

        // Assert
        expect(responseMock.status).toHaveBeenCalledWith(403)
        expect(responseMock.json).toHaveBeenCalledWith({ message: "This IP address has already voted today" })
    })

    it('should return WebsiteNotExist when the website doesnt exist', async () => {
        // Arrange
        voteServiceStub.canVote = jest.fn().mockReturnValue(OpResult.WebsiteNotExist)

        // Act
        await voteController.vote('id', 'ip', responseMock)

        // Assert
        expect(responseMock.status).toHaveBeenCalledWith(404)
        expect(responseMock.json).toHaveBeenCalledWith({ message: "The website doesn't exist" })
    })

    it('should return InvalidId when the website id is invalid', async () => {
        // Arrange
        voteServiceStub.canVote = jest.fn().mockReturnValue(OpResult.InvalidId)

        // Act
        await voteController.vote('id', 'ip', responseMock)

        // Assert
        expect(responseMock.status).toHaveBeenCalledWith(400)
        expect(responseMock.json).toHaveBeenCalledWith({ message: "Website id is invalid" })
    })

    it('should return success when the website can be voted for', async () => {
        // Arrange
        const id = 'id'
        const ip = 'ip'
        voteServiceStub.canVote = jest.fn().mockReturnValue(OpResult.Success)

        // Act
        await voteController.vote(id, ip, responseMock)

        // Assert
        expect(voteServiceStub.vote).toHaveBeenCalledWith(id, ip)
        expect(responseMock.status).toHaveBeenCalledWith(200)
    })
});
