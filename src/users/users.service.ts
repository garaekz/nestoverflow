import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from './dto/register.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(registerDto: RegisterDto): Promise<UserDocument> {
    const { email } = registerDto;

    const user = await this.userModel.findOne({ email });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    return this.userModel.create(registerDto);
  }

  async findByLoginData(dto: LoginDto): Promise<UserDocument> {
    const { email, password } = dto;

    const user = await this.userModel.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async findByPayload(payload: any): Promise<User> {
    const { email } = payload;

    return await this.userModel.findOne({ email });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
