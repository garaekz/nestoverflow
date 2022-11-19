import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signPayload(payload: any) {
    return this.jwtService.sign(payload);
  }

  async validateUser(payload: any) {
    return await this.usersService.findByPayload(payload);
  }
}
