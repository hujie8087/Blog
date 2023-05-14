import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from 'src/interface/article.interface';

@ApiTags('文章接口')
@Controller('article')
export class ArticleController {
  // 构造函数，注入服务类
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: '热门文章' })
  @Get('/hot')
  async findHotArticle() {
    return await this.articleService.getHotArticle();
  }

  @ApiOperation({ summary: '文章列表' })
  @Get()
  async findAll(@Query() query) {
    const page = {
      pageNum: Number(query.pageNum),
      pageSize: Number(query.pageSize),
    };
    const params = JSON.parse(JSON.stringify(query));
    return await this.articleService.findAll(params, page);
  }

  @Post()
  @ApiOperation({ summary: '新建文章' })
  async create(@Body() createArticleDto: Article) {
    return await this.articleService.create(createArticleDto);
  }

  @Put()
  @ApiOperation({ summary: '修改文章' })
  async update(@Body() article: Article) {
    return await this.articleService.update(article);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: '获取文章详情' })
  async detail(@Param() { id }) {
    return await this.articleService.findOne(id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: '删除文章' })
  async remove(@Param() { id }) {
    return await this.articleService.delete(id);
  }
}
