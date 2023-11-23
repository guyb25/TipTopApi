import { Response } from 'express';
import { LoginController } from 'src/endpoints/accountManagement/login/login.controller';
import { LoginWebsiteDto } from 'src/endpoints/dtos/accountManagement/loginWebsiteDto';
import { OpResult } from 'src/models/OpResult';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from 'src/endpoints/accountManagement/login/login.service';

describe('login.controller', () => {
  let controller: LoginController;
  let loginServiceStub;

  const loginWebsiteDto : LoginWebsiteDto = {
    username: 'testuser',
    password: 'testpassword',
  };

  const responseMock = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any as Response;

  beforeEach(async () => {
    loginServiceStub = {
      isLoginValid: jest.fn(),
      login: jest.fn(),
    };

    const module : TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: LoginService,
          useValue: loginServiceStub
        }
      ],
    }).compile();

    controller = module.get(LoginController);
  });

  it('should return a session ID on successful login with status 200', async () => {
    // Arrange
    const expectedSessionId = 'adifjsdf';
    loginServiceStub.isLoginValid = jest.fn().mockResolvedValue(OpResult.Success);
    loginServiceStub.login = jest.fn().mockResolvedValue(expectedSessionId);

    // Act
    await controller.register(loginWebsiteDto, responseMock);

    // Assert
    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(responseMock.json).toHaveBeenCalledWith({sessionId: expectedSessionId});
  });

  it('should return user not exist with status code 404 on non-existent user', async () => {
    // Arrange
    const expectedResponse = "The username doesn't exist";
    loginServiceStub.isLoginValid = jest
      .fn()
      .mockResolvedValue(OpResult.UserNotExist);

    // Act
    await controller.register(loginWebsiteDto, responseMock);

    // Assert
    expect(responseMock.status).toHaveBeenCalledWith(404);
    expect(responseMock.json).toHaveBeenCalledWith({message: expectedResponse});
  });

  it('should return 401 and message on incorrect username/password', async () => {
    // Arrange
    const expectedResponse = "Incorrect username or password";
    loginServiceStub.isLoginValid = jest.fn().mockResolvedValue(OpResult.IncorrectPassword);

    // Act
    await controller.register(loginWebsiteDto, responseMock);

    // Assert
    expect(responseMock.status).toHaveBeenCalledWith(401);
    expect(responseMock.json).toHaveBeenCalledWith({ message: expectedResponse});
  });
});
