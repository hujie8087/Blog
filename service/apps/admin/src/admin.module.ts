import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { MessagesController } from './messages/messages.controller';
import { MessagesModule } from './messages/messages.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { ArticleTagsModule } from './article-tags/article-tags.module';

@Module({
  imports: [
    DbModule,
    UsersModule,
    ArticlesModule,
    MessagesModule,
    MulterModule.register({
      dest: 'uploads',
    }),
    AuthModule,
    ArticleTagsModule,
  ],
  controllers: [AdminController, MessagesController],
  providers: [AdminService],
})
export class AdminModule {}
