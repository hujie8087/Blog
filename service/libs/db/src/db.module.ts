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
    TypegooseModule.forRoot(
      'mongodb://blog:jayden080716@120.24.47.159:27017/blog',
      {},
    ),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
