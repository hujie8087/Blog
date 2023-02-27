import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from './common/middleware/response.middleware';
import { httpFilter } from './common/middleware/filter.middleware';
/*
 * NestExpressApplication 静态文件类型推断
 *
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // swagger配置
  const swaggerOptions = new DocumentBuilder()
    .setTitle('jaydenBlog Api document')
    .setDescription('接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document);
  // 设置全局验证管道
  app.useGlobalPipes(new ValidationPipe());
  // 全局设置session
  app.use(
    session({
      secret: 'jaydenBlog',
      rolling: true,
      name: 'blog.session',
      cookie: { maxAge: 60000 },
    }),
  );
  // 全局响应拦截器
  app.useGlobalInterceptors(new Response());
  // 全局异常拦截器
  app.useGlobalFilters(new httpFilter());
  // 配置文件静态访问路径，prefix增加文件前缀
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/images',
  });
  //
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
