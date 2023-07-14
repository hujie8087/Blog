import { Global, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { DbService } from './db.service';
import { User } from './models/user.model';
import { Article } from './models/article.model';
import { ArticleTag } from './models/articleTag.model';
import { Message } from './models/message.model';
import { TimeLine } from './models/timeLine.model';

const models = TypegooseModule.forFeature([
  User,
  Article,
  ArticleTag,
  Message,
  TimeLine,
]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/jaydenBlog', {}),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
