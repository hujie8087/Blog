import { RedisModuleOptions } from 'nestjs-redis/dist';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { HelloModule } from './modules/hello/hello.module';
import { ArticleModule } from './modules/article/article.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Log4jsModule } from '@nestx-log4js/core';
import { DbModule } from './db/db.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MenuModule } from './modules/menu/menu.module';
// import { RedisModule } from 'nestjs-redis';
import { RoleModule } from './modules/role/role.module';
import { ArticleTagModule } from './modules/article-tag/article-tag.module';
import { UploadModule } from './modules/upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MessageModule } from './modules/message/message.module';

// const options: RedisModuleOptions = {
//   port: 6379,
//   name: 'jayden',
//   host: '127.0.0.1',
// };
// 装饰器
@Module({
  imports: [
    HelloModule,
    ArticleModule,
    Log4jsModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/blog'),
    DbModule,
    UserModule,
    AuthModule,
    // RedisModule.register(options),
    MenuModule,
    RoleModule,
    ArticleTagModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist/images'),
      serveRoot: '/static',
    }),
    MessageModule,
    // AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'hello', method: RequestMethod.POST }) //exclude 排除
      .forRoutes('hello');
  }
}
