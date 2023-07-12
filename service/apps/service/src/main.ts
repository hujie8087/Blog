import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 开启静态文件托管
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  });
  const options = new DocumentBuilder()
    .setTitle('博客-前端页面接口')
    .setDescription('供前端页面使用的服务端接口')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-front', app, document);
  await app.listen(3001);
}
bootstrap();
