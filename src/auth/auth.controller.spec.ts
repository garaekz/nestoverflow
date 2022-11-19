import { authServiceMock, registerDtoStub, loginDtoStub } from './../__mocks__/auth.mock';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { createMock } from '@golevelup/ts-jest';
import { UsersService } from '../users/users.service';
import { userServiceMock } from '../__mocks__/user.mock';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import {
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

const mockUser = { id: 'newObjectId', ...registerDtoStub() };

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        { provide: JwtService, useValue: createMock<JwtService>() },
        {
          provide: UsersService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
    jwtService = module.get(JwtService);
    usersService = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const dto = registerDtoStub();
      expect(await controller.register(dto)).toStrictEqual({
        user: mockUser,
        access_token: 'accessToken',
      });
      expect(usersService.create).toBeCalledWith(dto);
      expect(authService.signPayload).toBeCalledWith({ email: mockUser.email });
    });

    it('should not register a user with an existing email', async () => {
      const dto = registerDtoStub();
      expect(
        controller.register({ ...dto, email: 'same@mail.test' }),
      ).rejects.toThrow(BadRequestException);
      expect(
        controller.register({ ...dto, email: 'same@mail.test' }),
      ).rejects.toThrow('User already exists');
      expect(usersService.create).toBeCalledWith(dto);
    });

    it('should not register a user with an invalid email', async () => {
      const dto = registerDtoStub();
      expect(controller.register({ ...dto, email: 'invalid' })).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(controller.register({ ...dto, email: 'invalid' })).rejects.toThrow(
        'Internal Server Error',
      );
      expect(usersService.create).toBeCalledWith(dto);
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const dto = loginDtoStub();
      expect(await controller.login(dto)).toStrictEqual({
        status: 'success',
        access_token: 'accessToken',
      });
      expect(usersService.findByLoginData).toBeCalledWith(dto);
      expect(authService.signPayload).toBeCalledWith({ email: mockUser.email });
    });
  });
});
