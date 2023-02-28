import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { HelloModule } from './modules/hello/hello.module';
import { ArticleModule } from './modules/article/article.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Log4jsModule } from '@nestx-log4js/core';
import { DbModule } from './db/db.module';
import { UserModule } from './modules/user/user.module';

// 装饰器
@Module({
  imports: [
    HelloModule,
    ArticleModule,
    Log4jsModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/blog'),
    DbModule,
    UserModule,
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
