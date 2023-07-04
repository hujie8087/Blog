import { ApiProperty } from '@nestjs/swagger';
import { Prop, modelOptions } from '@typegoose/typegoose';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Message {
  @Prop({ required: true })
  @ApiProperty({ description: '留言id' })
  readonly id: number;
  @Prop({ default: '' })
  @ApiProperty({ description: '留言城市', example: '长沙' })
  @IsString()
  cityName: string;
  @Prop({ default: '' })
  @ApiProperty({ description: '留言姓名', example: '留言姓名' })
  @IsNotEmpty({ message: '请填写留言内容' })
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
  @Prop({ default: '' })
  @ApiProperty({ description: '留言头像', example: '0' })
  @IsInt()
  iconNo: number;
  @Prop({ default: '' })
  @ApiProperty({ description: 'token' })
  token: string;
}
