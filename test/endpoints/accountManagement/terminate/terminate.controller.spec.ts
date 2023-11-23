import { Test, TestingModule } from '@nestjs/testing'
import { TerminateController } from 'src/endpoints/accountManagement/terminate/terminate.controller'
import { TerminateService } from 'src/endpoints/accountManagement/terminate/terminate.service'
import { OpResult } from 'src/models/response/OpResult'
import { terminateAccountDtoStub } from './terminateAccountDtoStub'
import { responseMock } from 'test/endpoints/responseMock'
import { serverResponses } from 'src/static/ServerResponses'

describe('logout.controller', () => {
  let terminateController: TerminateController
  let terminateServiceStub: TerminateService

  beforeEach(async () => {
    const module : TestingModule = await Test.createTestingModule({
      controllers: [TerminateController],
      providers: [
        {
          provide: TerminateService,
          useValue: {
            isTerminationFormValid: jest.fn(),
            terminate: jest.fn(),
          }
        }
      ],
    }).compile()

    terminateController = module.get(TerminateController)
    terminateServiceStub = module.get(TerminateService)
  })

  it('should return user doesnt exist when user doesnt exist, and not terminate the user', async () => {
    // Arrange
    terminateServiceStub.isTerminationFormValid = jest.fn().mockReturnValue(OpResult.USER_NOT_EXIST)

    // Act
    await terminateController.terminate(terminateAccountDtoStub, responseMock)

    // Assert
    expect(terminateServiceStub.terminate).not.toHaveBeenCalled()
    expect(responseMock.status).toHaveBeenCalledWith(serverResponses.userNotExist.status)
    expect(responseMock.json).toHaveBeenCalledWith({ message: serverResponses.userNotExist.message })
  })

  it('should not terminate user if the user login session is invalid', async () => {
    // Arrange
    terminateServiceStub.isTerminationFormValid = jest.fn().mockReturnValue(OpResult.SESSION_NOT_FOUND)

    // Act
    await terminateController.terminate(terminateAccountDtoStub, responseMock)

    // Assert
    expect(terminateServiceStub.terminate).not.toHaveBeenCalled()
    expect(responseMock.status).toHaveBeenCalledWith(serverResponses.sessionNotFound.status)
    expect(responseMock.json).toHaveBeenCalledWith({ message: serverResponses.sessionNotFound.message })
  })

  it('should terminate user if the user exists and its login session is valid', async () => {
    // Arrange
    terminateServiceStub.isTerminationFormValid = jest.fn().mockReturnValue(OpResult.SUCCESS)

    // Act
    await terminateController.terminate(terminateAccountDtoStub, responseMock)

    // Assert
    expect(terminateServiceStub.terminate).toHaveBeenCalledWith(terminateAccountDtoStub)
    expect(responseMock.status).toHaveBeenCalledWith(serverResponses.success.status)
  })
})
