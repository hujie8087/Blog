import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { HelloModule } from './modules/hello/hello.module';
import { ArticleModule } from './modules/article/article.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { UsersModule } from './modules/users/users.module';
import { UploadModule } from './modules/upload/upload.module';
// import { AuthModule } from './modules/auth/auth.module';

// 装饰器
@Module({
  imports: [
    HelloModule,
    ArticleModule,
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
