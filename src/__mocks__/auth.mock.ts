import { LoginDto } from './../users/dto/login.dto';
import { RegisterDto } from '../users/dto/register.dto';

export const registerDtoStub = (): RegisterDto => {
  return {
    name: 'John Doe',
    email: 'john.doe@test.io',
    password: 'pass123',
  };
};

export const loginDtoStub = (): LoginDto => {
  return {
    email: 'john.doe@test.io',
    password: 'pass123',
  };
};

export const authServiceMock = {
  signPayload: jest.fn().mockResolvedValue('accessToken'),
  validateUser: jest.fn().mockImplementation((payload) => {
    const user = {
      id: 'newObjectId',
      ...registerDtoStub(),
    };
    if (payload.email === user.email) {
      return user;
    }
    return null;
  }),
};
