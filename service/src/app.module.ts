import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { HelloModule } from './modules/hello/hello.module';
import { ArticleModule } from './modules/article/article.module';
import { MongooseModule } from '@nestjs/mongoose';
<<<<<<< HEAD
// import { UsersModule } from './modules/users/users.module';
import { UploadModule } from './modules/upload/upload.module';
// import { AuthModule } from './modules/auth/auth.module';
=======
import { Log4jsModule } from '@nestx-log4js/core';
>>>>>>> bdced18c1edcaefa6ed37d61c85b3114429a0d99

// 装饰器
@Module({
  imports: [
    HelloModule,
    ArticleModule,
    Log4jsModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/blog'),
    // UsersModule,
    UploadModule,
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
