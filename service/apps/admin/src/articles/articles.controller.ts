import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuardUser } from '../auth/guards/jwt-auth.guard';
import { Article } from '@libs/db/models/article.model';

@Controller('articles')
@ApiTags('文章')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthGuardUser)
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token',
  })
  create(@Body() createArticleDto: Article) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.articlesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuardUser)
  update(@Param('id') id: string, @Body() updateArticleDto: Article) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuardUser)
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
