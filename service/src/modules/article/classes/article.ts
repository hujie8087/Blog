import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateArticle {
  @ApiProperty({ description: '文章图片', example: '文章图片' })
  @IsString()
  ArticleCover: string;
  @ApiProperty({ description: '文章标签', example: '文章标签' })
  @IsString()
  ArticleTag: string;
  @ApiProperty({ description: '文章留言数量', example: 0 })
  @IsInt()
  CommentNum: number;
  @ApiProperty({ description: '文章内容', example: '文章内容' })
  @IsString()
  @IsNotEmpty({ message: '请填写文章内容' })
  Content: string;
  @ApiProperty({ description: '文章描述', example: '文章描述' })
  @IsString()
  Summary: string;
  @ApiProperty({ description: '文章标题', example: '文章标题' })
  @IsNotEmpty({ message: '请填写文章标题' })
  @IsString()
  Title: string;
  @ApiProperty({ description: '文章阅读数量', example: 0 })
  @IsInt()
  articleReadNum: number;
  @ApiProperty({ description: '文章序号', example: 0 })
  @IsInt()
  order: number;
}

export class Article extends CreateArticle {
  @ApiProperty({ description: '文章id' })
  _id: string;
  @ApiProperty({ description: 'token' })
  Token: string;
  @ApiProperty({ description: '文章创建日期' })
  CreateDate: string;
  @ApiProperty({ description: '文章更新日期' })
  UpdateDate: string;
}
