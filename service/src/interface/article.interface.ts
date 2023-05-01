import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

@Schema()
export class Article extends Document {
  @Prop({ required: true })
  @ApiProperty({ description: '文章id' })
  readonly id: number;
  @Prop({ default: '' })
  @ApiProperty({ description: '文章图片', example: '文章图片' })
  @IsString()
  articleCover: string;
  @Prop({ default: '' })
  @ApiProperty({ description: '文章标签', example: '文章标签' })
  @IsString()
  articleTag: string;
  @Prop({ default: 0 })
  @ApiProperty({ description: '文章留言数量', example: 0 })
  @IsInt()
  commentNum: number;
  @Prop({ default: '' })
  @ApiProperty({ description: '文章内容', example: '文章内容' })
  @IsString()
  @IsNotEmpty({ message: '请填写文章内容' })
  content: string;
  @Prop({ default: '' })
  @ApiProperty({ description: '文章描述', example: '文章描述' })
  @IsString()
  summary: string;
  @Prop({ default: '' })
  @ApiProperty({ description: '文章标题', example: '文章标题' })
  @IsNotEmpty({ message: '请填写文章标题' })
  @IsString()
  title: string;
  @Prop({ default: 0 })
  @ApiProperty({ description: '文章阅读数量', example: 0 })
  @IsInt()
  articleReadNum: number;
  @Prop({ default: 0 })
  @ApiProperty({ description: '文章序号', example: 0 })
  @IsInt()
  sort: number;
  @Prop({ default: 0 })
  @ApiProperty({ description: '是否删除', example: 0 })
  @IsInt()
  isDel: number;
  @Prop({ default: 0 })
  @ApiProperty({ description: '文章状态', example: 0 })
  @IsInt()
  status: number;
  @Prop({ default: new Date() })
  @ApiProperty({ description: '文章创建日期' })
  createDate: string;
  @Prop({ default: new Date() })
  @ApiProperty({ description: '文章更新日期' })
  updateDate: string;
  @Prop({ default: '' })
  @ApiProperty({ description: 'token' })
  token: string;
}
