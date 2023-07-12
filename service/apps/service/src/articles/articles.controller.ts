import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('articles')
@ApiTags('文章')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('hotArticles')
  hotArticles() {
    return this.articlesService.getHotArticles();
  }

  @Get()
  findAll(@Query() query: any) {
    return this.articlesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }
}
