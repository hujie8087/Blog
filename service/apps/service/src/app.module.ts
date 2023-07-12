import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { DbModule } from '@libs/db';
import { MulterModule } from '@nestjs/platform-express';
import { ArticleTagsModule } from './article-tags/article-tags.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    DbModule,
    ArticlesModule,
    MulterModule.register({
      dest: 'uploads',
    }),
    ArticleTagsModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
