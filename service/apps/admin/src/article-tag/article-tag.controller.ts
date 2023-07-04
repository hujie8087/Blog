import { ArticleTag } from '@libs/db/models/articleTag.model';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { JwtAuthGuardUser } from '../auth/guards/jwt-auth.guard';

@Crud({
  model: ArticleTag,
})
@Controller('article-tag')
@ApiTags('文章标签')
@UseGuards(JwtAuthGuardUser)
export class ArticleTagController {
  constructor(@InjectModel(ArticleTag) private readonly model) {}
}
