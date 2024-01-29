import { ApiProperty } from '@nestjs/swagger';
import { Prop, modelOptions } from '@typegoose/typegoose';
import { IsNotEmpty, IsString } from 'class-validator';

interface Avatar {
  bgColor: string;
  hatColor: string;
  faceColor: string;
  hairColor: string;
  shirtColor: string;
  hairColorRandom: boolean;
  sex: string;
  earSize: string;
  eyeType: string;
  hatType: string;
  hairType: string;
  noseType: string;
  mouthType: string;
  shirtType: string;
  glassesType: string;
  shape: string;
}
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Message {
  @Prop({ default: '' })
  @ApiProperty({ description: '留言城市', example: '长沙' })
  @IsString()
  cityName: string;
  @Prop({ default: '' })
  @ApiProperty({ description: '留言姓名', example: '留言姓名' })
  @IsNotEmpty({ message: '请填写留言姓名' })
  @IsString()
  name: string;
  @Prop({ default: '' })
  @ApiProperty({ description: '留言内容', example: '留言内容' })
  @IsString()
  @IsNotEmpty({ message: '请填写留言内容' })
  content: string;
  @Prop({ default: '' })
  @ApiProperty({ description: '留言IP', example: '留言IP' })
  @IsString()
  clientIp: string;
  @Prop({ ref: () => 'Avatar' })
  @ApiProperty({ description: '留言头像' })
  avatar: Avatar;
  @Prop({ default: '' })
  @ApiProperty({ description: 'token' })
  token: string;
  @Prop({ default: false })
  @ApiProperty({ description: '是否删除', example: false })
  isDel: boolean;
  @Prop({ default: '' })
  @ApiProperty({ description: '回复id', example: '' })
  replyId: string;
  @Prop({ default: '' })
  @ApiProperty({ description: '回复姓名', example: '' })
  replyName: string;
  @Prop({ default: '' })
  @ApiProperty({ description: '回复根id', example: '' })
  replyRootId?: string;

  replyList?: Message[];
  replyNum?: number;
  _doc?: Message;
}
