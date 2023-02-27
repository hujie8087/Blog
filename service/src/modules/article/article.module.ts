import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleSchema } from './schemas/article.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'article', schema: ArticleSchema, collection: 'articles' },
    ]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
