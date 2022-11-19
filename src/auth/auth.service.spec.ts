import { authServiceMock } from './../__mocks__/auth.mock';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: UsersService, useValue: createMock<UsersService>() },
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
});
