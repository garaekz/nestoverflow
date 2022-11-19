import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Name of the User',
    example: 'John Doe',
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'User email',
    example: 'john.doe@mail.test',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsNotEmpty()
  readonly password: string;
}
