import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User email',
    example: 'john.doe@mail.test',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: '123456',
  })
  @IsNotEmpty()
  readonly password: string;
}
