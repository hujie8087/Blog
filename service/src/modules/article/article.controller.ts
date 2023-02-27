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
import { Article, ArticleType } from './classes/article';

interface ArticleResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}

@ApiTags('文章接口')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: '文章列表' })
  @Get()
  async findAll(): Promise<ArticleResponse<Article[]>> {
    const articles = await this.articleService.findAll();
    return {
      code: 200,
      data: articles,
      message: 'Success',
    };
  }

  @Post()
  @ApiOperation({ summary: '新建文章' })
  async create(@Body() createArticleDto: Article): Promise<ArticleResponse> {
    await this.articleService.create(createArticleDto);

    return {
      code: 200,
      message: '添加文章成功',
    };
  }

  @Put()
  @ApiOperation({ summary: '修改文章' })
  async update(@Body() article: ArticleType): Promise<ArticleResponse> {
    await this.articleService.update(article);
    return {
      code: 200,
      message: '编辑文章成功',
    };
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: '获取文章详情' })
  async detail(@Param() { id }): Promise<ArticleResponse<Article>> {
    return {
      code: 200,
      data: await this.articleService.findOne(id),
      message: 'Success',
    };
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: '删除文章' })
  async remove(@Param() { id }): Promise<ArticleResponse> {
    await this.articleService.delete(id);
    return {
      code: 200,
      message: '删除文章成功',
    };
  }
}
