import { authServiceMock, registerDtoStub } from './../__mocks__/auth.mock';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { userServiceMock } from '../__mocks__/user.mock';

const mockUser = { id: 'newObjectId', ...registerDtoStub() };

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: UsersService,
          useValue: userServiceMock,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockImplementation(() => {
              return 'accessToken';
            }),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signPayload', () => {
    it('should sign payload', async () => {
      const payload = { email: mockUser.email };
      const accessToken = await authService.signPayload(payload);
      expect(accessToken).toEqual('accessToken');
    });
  });

  describe('validateUser', () => {
    it('should validate user', async () => {
      const payload = { email: mockUser.email };
      const user = await authService.validateUser(payload);

      expect(user).toEqual({
        id: 'newObjectId',
        ...mockUser,
      });
    });

    it('should NOT validate user', async () => {
      const invalidUser = await authService.validateUser({
        email: 'wrong@mail.test',
      });
      expect(invalidUser).toBeNull();
    });
  });
});
