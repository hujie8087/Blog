import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ArticleTagsService } from './article-tags.service';
import { ArticleTag } from '@libs/db/models/articleTag.model';

@Controller('article-tags')
export class ArticleTagsController {
  constructor(private readonly articleTagsService: ArticleTagsService) {}

  @Get('dict')
  getArticleTagDict() {
    return this.articleTagsService.getArticleTagDict();
  }

  @Post()
  create(@Body() createArticleTag: ArticleTag) {
    return this.articleTagsService.create(createArticleTag);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.articleTagsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleTagsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArticleTagDto: ArticleTag) {
    return this.articleTagsService.update(id, updateArticleTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleTagsService.remove(id);
  }
}
