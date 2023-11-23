import { Test, TestingModule } from '@nestjs/testing';
import { ServersDbService } from 'src/dataAccess/serversDb/serversDb.service';
import { SessionManagerService } from 'src/dataAccess/sessionManager/sessionManager.service';
import { TerminateService } from 'src/endpoints/accountManagement/terminate/terminate.service';
import { terminateAccountDtoStub } from './terminateAccountDtoStub';
import { OpResult } from 'src/models/response/OpResult';

describe('terminate.service', () => {
    let terminateService: TerminateService
    let serversDbService: ServersDbService
    let sessionManagerService: SessionManagerService
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            TerminateService,
            {
                provide: ServersDbService,
                useValue: {
                    isUsernameTaken: jest.fn(),
                },
            },
            {
                provide: SessionManagerService,
                useValue: {
                    getSession: jest.fn(),
                }
            }
        ],
        }).compile()

        terminateService = module.get<TerminateService>(TerminateService)
        serversDbService = module.get<ServersDbService>(ServersDbService)
        sessionManagerService = module.get<SessionManagerService>(SessionManagerService)
    });

    it('isTerminationFormValid should return USER_NOT_EXIST if the user doesnt exist', async () => {
        // Arrange
        serversDbService.isUsernameTaken = jest.fn().mockReturnValue(false)
        sessionManagerService.getSession = jest.fn().mockReturnValue(terminateAccountDtoStub.username)

        // Act
        const res = await terminateService.isTerminationFormValid(terminateAccountDtoStub)

        // Assert
        expect(res).toBe(OpResult.USER_NOT_EXIST)
    })

    it('isTerminationFormValid should return SESSION_NOT_FOUND if the session doesnt match the user', async () => {
        // Arrange
        serversDbService.isUsernameTaken = jest.fn().mockReturnValue(true)
        sessionManagerService.getSession = jest.fn().mockReturnValue('not-the-username')

        // Act
        const res = await terminateService.isTerminationFormValid(terminateAccountDtoStub)

        // Assert
        expect(res).toBe(OpResult.SESSION_NOT_FOUND)
    })

    it('isTerminationFormValid should return SUCCESS if the user exists and the session matches the user', async () => {
        // Arrange
        serversDbService.isUsernameTaken = jest.fn().mockReturnValue(true)
        sessionManagerService.getSession = jest.fn().mockReturnValue(terminateAccountDtoStub.username)

        // Act
        const res = await terminateService.isTerminationFormValid(terminateAccountDtoStub)

        // Assert
        expect(res).toBe(OpResult.SUCCESS)
    })
});