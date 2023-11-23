import { Test, TestingModule } from '@nestjs/testing';
import { SessionManagerService } from 'src/dataAccess/sessionManager/sessionManager.service';
import { ServersDbService } from 'src/dataAccess/serversDb/serversDb.service';
import { LoginService } from 'src/endpoints/accountManagement/login/login.service';
import { OpResult } from 'src/models/OpResult';

describe('login.service', () => {
    let loginService: LoginService;
    let serversDbService: ServersDbService;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            LoginService,
            {
            provide: SessionManagerService,
            useValue: {
                createSession: jest.fn(),
            },
            },
            {
            provide: ServersDbService,
            useValue: {
                isUsernameTaken: jest.fn(),
                doesUserMatchPassword: jest.fn(),
            },
            },
        ],
        }).compile();

        loginService = module.get<LoginService>(LoginService);
        serversDbService = module.get<ServersDbService>(ServersDbService);
    });

    it('should return OpResult.Success when login is valid', async () => {
        // Arrange
        serversDbService.isUsernameTaken = jest.fn().mockResolvedValue(true);
        serversDbService.doesUserMatchPassword = jest.fn().mockResolvedValue(true);

        // Act
        const result = await loginService.isLoginValid('existinguser', 'correctpassword');
        
        // Assert
        expect(result).toBe(OpResult.Success);
    });
  
    it('should return OpResult.UserNotExist when username does not exist', async () => {
        // Arrange
        serversDbService.isUsernameTaken = jest.fn().mockResolvedValue(false);

        // Act
        const result = await loginService.isLoginValid('nonexistentuser', 'password');

        // Assert
        expect(result).toBe(OpResult.UserNotExist);
    });
    
    it('should return OpResult.IncorrectPassword when password is incorrect', async () => {
        // Arrange
        serversDbService.isUsernameTaken = jest.fn().mockResolvedValue(true);
        serversDbService.doesUserMatchPassword = jest.fn().mockResolvedValue(false);

        // Act
        const result = await loginService.isLoginValid('existinguser', 'wrongpassword');

        // Assert
        expect(result).toBe(OpResult.IncorrectPassword);
    });
});