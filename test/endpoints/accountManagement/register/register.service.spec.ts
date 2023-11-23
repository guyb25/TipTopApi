import { Test, TestingModule } from '@nestjs/testing';
import { ServersDbService } from 'src/dataAccess/serversDb/serversDb.service';
import { RegisterService } from 'src/endpoints/accountManagement/register/register.service';
import { registerWebsiteDtoStub } from './commonDtoStub';
import { OpResult } from 'src/models/response/OpResult';

describe('register.service', () => {
    let registerService: RegisterService
    let serversDbService: ServersDbService
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
          RegisterService,
            {
                provide: ServersDbService,
                useValue: {
                    isEmailTaken: jest.fn(),
                    isUsernameTaken: jest.fn(),
                    insertWebsite: jest.fn(),
                },
            },
        ],
        }).compile()

        registerService = module.get<RegisterService>(RegisterService)
        serversDbService = module.get<ServersDbService>(ServersDbService)
    });

    it('isRegistrationFormValid should return email taken when email is taken', async () => {
      // Arrange
      serversDbService.isEmailTaken = jest.fn().mockReturnValue(true)
      serversDbService.isUsernameTaken = jest.fn().mockReturnValue(false)

      // Act
      const res = await registerService.isRegistrationFormValid(registerWebsiteDtoStub)

      // Assert
      expect(res).toBe(OpResult.EMAIL_TAKEN)
    })

    it('isRegistrationFormValid should return username taken when username is taken', async () => {
      // Arrange
      serversDbService.isEmailTaken = jest.fn().mockReturnValue(false)
      serversDbService.isUsernameTaken = jest.fn().mockReturnValue(true)

      // Act
      const res = await registerService.isRegistrationFormValid(registerWebsiteDtoStub)

      // Assert
      expect(res).toBe(OpResult.USER_TAKEN)
    })

    it('isRegistrationFormValid should return success when the form is valid', async () => {
      // Arrange
      serversDbService.isEmailTaken = jest.fn().mockReturnValue(false)
      serversDbService.isUsernameTaken = jest.fn().mockReturnValue(false)

      // Act
      const res = await registerService.isRegistrationFormValid(registerWebsiteDtoStub)

      // Assert
      expect(res).toBe(OpResult.SUCCESS)
    })
});