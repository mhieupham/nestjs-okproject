import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthEmailLoginDto {
  @ApiProperty({ example: '123456781234' })
  @IsNotEmpty()
  identification_number: string;

  @ApiProperty({ example: 'Hieu123456$' })
  @IsNotEmpty()
  password: string;
}
