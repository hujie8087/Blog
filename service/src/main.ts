import { Log4jsLogger } from '@nestx-log4js/core';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

const listenPort = 3000;
const logger = new Logger('main.ts');
/**
 *主方法
 */
const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  /**
   * 配置swagger
   */
  const swaggerOptions = new DocumentBuilder()
    .setTitle('jaydenBlog Api document')
    .setDescription('接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document);
  /**
   * 使用log4js输出日志
   */
  app.useLogger(app.get(Log4jsLogger));
  await app.listen(listenPort);
};
bootstrap().then(() => {
  logger.log(`listen in http://localhost:${listenPort}`);
});
