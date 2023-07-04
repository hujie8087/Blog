import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { ArticleTagController } from './article-tag/article-tag.controller';
import { ArticleTagModule } from './article-tag/article-tag.module';
import { MessagesController } from './messages/messages.controller';
import { MessagesModule } from './messages/messages.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DbModule,
    UsersModule,
    ArticlesModule,
    ArticleTagModule,
    MessagesModule,
    MulterModule.register({
      dest: 'uploads',
    }),
    AuthModule,
  ],
  controllers: [AdminController, ArticleTagController, MessagesController],
  providers: [AdminService],
})
export class AdminModule {}
