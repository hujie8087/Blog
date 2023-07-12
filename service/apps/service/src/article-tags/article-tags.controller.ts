import { Controller, Get } from '@nestjs/common';
import { ArticleTagsService } from './article-tags.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('article-tags')
@ApiTags('文章标签')
export class ArticleTagsController {
  constructor(private readonly articleTagsService: ArticleTagsService) {}

  @Get()
  findAll() {
    return this.articleTagsService.findAll();
  }
}
