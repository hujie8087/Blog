import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleTag } from 'src/interface/articleTag.interface';
import { ArticleTagService } from './article-tag.service';

@ApiTags('文章标签接口')
@Controller('article-tag')
export class ArticleTagController {
  constructor(private readonly articleTagService: ArticleTagService) {}

  @ApiOperation({ summary: '文章标签字典' })
  @Get('dict')
  getDict() {
    return this.articleTagService.getArticleTagDict();
  }

  @ApiOperation({ summary: '新建文章标签' })
  @Post()
  addArticleTag(@Body() articleTagDto: ArticleTag) {
    return this.articleTagService.addArticleTag(articleTagDto);
  }

  @ApiOperation({ summary: '文章标签列表' })
  @Get()
  findAll(@Query() query) {
    const page = {
      pageNum: Number(query.pageNum),
      pageSize: Number(query.pageSize),
    };
    const param = JSON.parse(JSON.stringify(query));
    delete param.pageNum;
    delete param.pageSize;
    return this.articleTagService.getArticleTagList(param, page);
  }

  @ApiOperation({ summary: '文章标签详情' })
  @Get(':id')
  findArticleTagById(@Param() { id }) {
    return this.articleTagService.getArticleTagById(+id);
  }

  @ApiOperation({ summary: '删除文章标签' })
  @Delete(':id')
  deleteArticleTag(@Param() id) {
    return this.articleTagService.delArticleTag(+id);
  }

  @ApiOperation({ summary: '修改文章标签' })
  @Put()
  updateArticleTag(@Body() articleTagDto: ArticleTag) {
    return this.articleTagService.updateArticleTag(articleTagDto);
  }
}
