import { Response } from 'express';
import { OpResult } from 'src/models/response/OpResult';
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from 'src/endpoints/accountManagement/register/register.controller';
import { RegisterService } from 'src/endpoints/accountManagement/register/register.service';
import { serverResponses } from 'src/static/ServerResponses';
import { registerWebsiteDtoStub } from './commonDtoStub';

describe('register.controller', () => {
  let registerController: RegisterController;
  let registerServiceStub: RegisterService;

  const responseMock = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any as Response;

  beforeEach(async () => {
    const module : TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [
        {
          provide: RegisterService,
          useValue: {
            isRegistrationFormValid: jest.fn(),
            register: jest.fn(),
          }
        }
      ],
    }).compile()

    registerController = module.get(RegisterController)
    registerServiceStub = module.get(RegisterService)
  });

  it('should return email taken when email is taken and not register website', async () => {
    // Arrange
    registerServiceStub.isRegistrationFormValid = jest.fn().mockReturnValue(OpResult.EMAIL_TAKEN)

    // Act
    await registerController.register(registerWebsiteDtoStub, responseMock)

    // Assert
    expect(registerServiceStub.register).not.toHaveBeenCalled()
    expect(responseMock.status).toHaveBeenCalledWith(serverResponses.emailTaken.status)
    expect(responseMock.json).toHaveBeenCalledWith({ message: serverResponses.emailTaken.message})
  })

  it('should return username taken when username is taken and not register website', async () => {
    // Arrange
    registerServiceStub.isRegistrationFormValid = jest.fn().mockReturnValue(OpResult.USER_TAKEN)

    // Act
    await registerController.register(registerWebsiteDtoStub, responseMock)

    // Assert
    expect(registerServiceStub.register).not.toHaveBeenCalled()
    expect(responseMock.status).toHaveBeenCalledWith(serverResponses.userTaken.status)
    expect(responseMock.json).toHaveBeenCalledWith({ message: serverResponses.userTaken.message})
  })

  it('should return 200 when the registration form is valid and register the website', async () => {
    // Arrange
    registerServiceStub.isRegistrationFormValid = jest.fn().mockReturnValue(OpResult.SUCCESS)

    // Act
    await registerController.register(registerWebsiteDtoStub, responseMock)

    // Assert
    expect(registerServiceStub.register).toHaveBeenCalledWith(registerWebsiteDtoStub)
    expect(responseMock.status).toHaveBeenCalledWith(serverResponses.success.status)
  })
});
