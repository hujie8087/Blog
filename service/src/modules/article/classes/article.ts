import { ApiProperty } from '@nestjs/swagger';
export class Article {
  @ApiProperty({ description: '文章图片' })
  ArticleCover: string;
  @ApiProperty({ description: '文章标签' })
  ArticleTag: string;
  @ApiProperty({ description: '文章留言数量' })
  CommentNum: number;
  @ApiProperty({ description: '文章内容' })
  Content: string;
  @ApiProperty({ description: '文章创建日期' })
  CreateDate: string;
  @ApiProperty({ description: '文章描述' })
  Summary: string;
  @ApiProperty({ description: '文章标题' })
  Title: string;
  @ApiProperty({ description: 'token' })
  Token: string;
  @ApiProperty({ description: '文章阅读数量' })
  articleReadNum: number;
  @ApiProperty({ description: '文章序号' })
  order: number;
}

export class ArticleType extends Article {
  @ApiProperty({ description: '文章id' })
  _id: string;
}
