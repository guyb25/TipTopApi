import { Test, TestingModule } from '@nestjs/testing';
import { SessionManagerService } from 'src/dataAccess/sessionManager/sessionManager.service';
import { LogoutService } from 'src/endpoints/accountManagement/logout/logout.service';
import { OpResult } from 'src/models/response/OpResult';

describe('logout.service', () => {
    let logoutService: LogoutService
    let sessionManagerService: SessionManagerService
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            LogoutService,
            {
                provide: SessionManagerService,
                useValue: {
                    getSession: jest.fn(),
                    endSession: jest.fn(),
                },
            },
        ],
        }).compile()

        logoutService = module.get<LogoutService>(LogoutService)
        sessionManagerService = module.get<SessionManagerService>(SessionManagerService)
    })

    it('canLogout should return SESSION_NOT_FOUND if session is null', async () => {
        // Arrange
        sessionManagerService.getSession = jest.fn().mockReturnValue(null)

        // Act
        const res = await logoutService.canLogout('session-key')

        // Assert
        expect(res).toBe(OpResult.SESSION_NOT_FOUND)
    })

    it('canLogout should return SUCCESS if session isnt null', async () => {
        // Arrange
        sessionManagerService.getSession = jest.fn().mockReturnValue('session')

        // Act
        const res = await logoutService.canLogout('session-key')

        // Assert
        expect(res).toBe(OpResult.SUCCESS)
    })
})