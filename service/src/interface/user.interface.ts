import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  @ApiProperty({
    description: '用户手机',
    example: '13888888888',
  })
  readonly username: string;

  @Prop({ required: true })
  @ApiProperty({
    description: '用户密码',
    example: '123456',
  })
  readonly password: string;

  @Prop({ required: true })
  @ApiProperty({ description: '昵称', example: '昵称' })
  readonly nickname: string;

  @Prop({ default: '' })
  @ApiProperty({ description: '微信', example: '微信号' })
  readonly wechat: string;

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

  @Prop()
  readonly salt?: string;

  @Prop()
  readonly captcha?: string;

  @Prop()
  readonly captchaId?: string;
}
