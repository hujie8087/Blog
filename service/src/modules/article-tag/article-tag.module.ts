import { Module } from '@nestjs/common';
import { ArticleTagController } from './article-tag.controller';
import { ArticleTagService } from './article-tag.service';

@Module({
  controllers: [ArticleTagController],
  providers: [ArticleTagService],
})
export class ArticleTagModule {}
