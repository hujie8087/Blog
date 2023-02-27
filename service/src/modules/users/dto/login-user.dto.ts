import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: '用户名称', example: '用户名称' })
  @IsString()
  userName: string;
  @ApiProperty({ description: '用户密码', example: '用户密码' })
  @IsString()
  password: string;
  @ApiProperty({ description: '验证码', example: '1234' })
  @IsString()
  code: string;
}
