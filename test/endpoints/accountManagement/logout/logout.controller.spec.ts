import { Test, TestingModule } from '@nestjs/testing'
import { LogoutController } from 'src/endpoints/accountManagement/logout/logout.controller'
import { LogoutService } from 'src/endpoints/accountManagement/logout/logout.service'
import { OpResult } from 'src/models/response/OpResult'
import { serverResponses } from 'src/static/ServerResponses'
import { responseMock } from 'test/endpoints/responseMock'

describe('logout.controller', () => {
  let logoutController: LogoutController
  let logoutServiceStub: LogoutService

  beforeEach(async () => {
    const module : TestingModule = await Test.createTestingModule({
      controllers: [LogoutController],
      providers: [
        {
          provide: LogoutService,
          useValue: {
            canLogout: jest.fn(),
            logout: jest.fn(),
          }
        }
      ],
    }).compile()

    logoutController = module.get(LogoutController)
    logoutServiceStub = module.get(LogoutService)
  })

  it('should return session not found when session is not found and not logout', async () => {
    // Arrange
    logoutServiceStub.canLogout = jest.fn().mockReturnValue(OpResult.SESSION_NOT_FOUND)

    // Act
    await logoutController.logout('session-id', responseMock)

    // Assert
    expect(logoutServiceStub.logout).not.toHaveBeenCalled()
    expect(responseMock.status).toHaveBeenCalledWith(serverResponses.sessionNotFound.status)
    expect(responseMock.json).toHaveBeenCalledWith({ message: serverResponses.sessionNotFound.message })
  })

  it('should logout when the session exists and return OK', async () => {
    // Arrange
    logoutServiceStub.canLogout = jest.fn().mockReturnValue(OpResult.SUCCESS)

    // Act
    await logoutController.logout('session-id', responseMock)

    // Assert
    expect(responseMock.status).toHaveBeenCalledWith(serverResponses.success.status)
    expect(responseMock.json).toHaveBeenCalled()
  })
})
