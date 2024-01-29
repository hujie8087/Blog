import { ApiProperty } from '@nestjs/swagger';
import { Prop, modelOptions } from '@typegoose/typegoose';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @Prop({ required: true })
  @ApiProperty({
    description: '账号',
    example: 'jayden',
  })
  readonly username: string;

  @Prop({ required: true })
  @ApiProperty({
    description: '用户密码',
    example: '123456',
  })
  readonly password: string;

  @Prop({ default: '' })
  @ApiProperty({
    description: '手机号码',
    example: '13888888888',
  })
  readonly phone: string;

  @Prop({ required: true })
  @ApiProperty({ description: '昵称', example: '昵称' })
  readonly nickname: string;

  @Prop({ default: '' })
  @ApiProperty({ description: '微信', example: '微信号' })
  readonly wechat: string;

  @Prop({ default: '' })
  @ApiProperty({ description: '邮箱', example: '123@163.com' })
  readonly email: string;

  @Prop({ default: '' })
  @ApiProperty({ description: 'QQ', example: '12345678' })
  readonly qq: string;

  @Prop({ default: '' })
  @ApiProperty({ description: '出生日期', example: '2000-01-01' })
  readonly birthday: string;

  @Prop({ default: 0 })
  @ApiProperty({ description: '性别', example: 0 })
  readonly sex: number;

  @Prop({ default: '' })
  @ApiProperty({
    description: '说明',
    example: '说明',
  })
  readonly desc: string;

  @Prop({ default: '' })
  @ApiProperty({
    description: '头像',
    example: '头像',
  })
  readonly avatar: string;

  @Prop({ type: () => [String], default: [] })
  @ApiProperty({
    description: '角色',
    example: '角色',
  })
  readonly roles: string[];
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  avatar: string;

  @ApiProperty()
  roles: string[];

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  @IsBoolean()
  status: boolean;
}

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
