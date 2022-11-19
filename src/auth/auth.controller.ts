import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from '../users/dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { RegisterDto } from '../users/dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.userService.findByLoginData(dto);

    const payload = {
      sub: user._id,
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);
    return { status: 'success', access_token: token };
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.userService.create(dto);

    const payload = {
      sub: user._id,
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);
    return {
      user,
      access_token: token,
    };
  }
}
