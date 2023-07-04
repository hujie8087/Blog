import { ApiProperty } from '@nestjs/swagger';
import { Prop, Ref, modelOptions } from '@typegoose/typegoose';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ArticleTag } from './articleTag.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Article {
  @Prop({ default: '' })
  @ApiProperty({ description: '文章图片', example: '文章图片' })
  @IsString()
  articleCover: string;
  @Prop([ArticleTag])
  @ApiProperty({ description: '文章关联标签', example: '文章关联标签' })
  articleTag: Ref<ArticleTag>[];
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
  @Prop({ default: true })
  @ApiProperty({ description: '是否删除', example: 0 })
  @IsBoolean()
  isDel: boolean;
  @Prop({ default: 0 })
  @ApiProperty({ description: '文章状态', example: 0 })
  @IsInt()
  status: number;
  @Prop({ default: '' })
  @ApiProperty({ description: 'token' })
  token: string;
}
