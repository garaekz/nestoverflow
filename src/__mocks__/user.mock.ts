import { LoginDto } from './../users/dto/login.dto';
import { RegisterDto } from '../users/dto/register.dto';
import { registerDtoStub } from './auth.mock';
import {
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

const user = {
  id: 'newObjectId',
  ...registerDtoStub(),
};

export const userServiceMock = {
  create: jest.fn((dto: RegisterDto) => {
    if (dto.email === user.email) {
      return user;
    }
    if (dto.email === 'same@mail.test') {
      return Promise.reject(new BadRequestException('User already exists'));
    }
    return Promise.reject(new InternalServerErrorException());
  }),
  findByLoginData: jest.fn((dto: LoginDto) => {
    if (dto.email === user.email) {
      return user;
    }
    return null;
  }),
  findByPayload: jest.fn((payload: any) => {
    if (payload.email === user.email) {
      return user;
    }
    return null;
  }),
};
