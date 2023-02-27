import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名称', example: '用户名称' })
  @IsString()
  userName: string;
  @ApiProperty({ description: '用户密码', example: '用户密码' })
  @IsString()
  password: string;
  @ApiProperty({ description: '用户年龄', example: '用户年龄' })
  @IsString()
  gender: string;
  @ApiProperty({ description: '用户年龄', example: 0 })
  @IsInt()
  age: number;
  @ApiProperty({ description: '用户手机号码', example: '用户手机号码' })
  @IsString()
  phone: string;
  @ApiProperty({ description: '用户邮箱', example: '用户邮箱' })
  @IsString()
  email: string;
  @ApiProperty({
    description: '用户状态,1:启用,2:禁用,3:冻结,4删除',
    example: '1',
  })
  @IsNotEmpty({ message: '请选择用户状态' })
  @IsString()
  userStatus: string;
  @ApiProperty({
    description: '用户权限，super:超级管理员，admin:管理员，user:普通用户',
    example: ['user'],
  })
  userRole: string[];
}
