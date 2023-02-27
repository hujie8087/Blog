import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article, CreateArticle } from './classes/article';

@ApiTags('文章接口')
@Controller('article')
export class ArticleController {
  // 构造函数，注入服务类
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: '文章列表' })
  @Get()
  async findAll(): Promise<Article[]> {
    const articles = await this.articleService.findAll();
    return articles;
  }

  @Post()
  @ApiOperation({ summary: '新建文章' })
  async create(@Body() createArticleDto: CreateArticle): Promise<string> {
    await this.articleService.create(createArticleDto);

    return {
      code: 200,
      message: '添加文章成功',
    };
  }

  @Put()
  @ApiOperation({ summary: '修改文章' })
  async update(@Body() article: Article): Promise<string> {
    await this.articleService.update(article);
    return '编辑文章成功';
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: '获取文章详情' })
  async detail(@Param() { id }): Promise<Article | string> {
    return await this.articleService.findOne(id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: '删除文章' })
  async remove(@Param() { id }): Promise<string> {
    await this.articleService.delete(id);
    return '删除文章成功';
  }
}
