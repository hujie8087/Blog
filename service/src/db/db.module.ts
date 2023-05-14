import { MongooseModule } from '@nestjs/mongoose';
import { Global, Module } from '@nestjs/common';
import { UserSchema } from './schema/user.schema';
import { MenuSchema } from './schema/menu.schema';
import { CountersSchema } from './schema/counters.schema';
import { RoleSchema } from './schema/role.schema';
import { ArticleTagSchema } from './schema/articleTag.schema';
import { ArticleSchema } from './schema/article.schema';
import { MessageSchema } from './schema/message.schema';

// 连接数据库，指定schema和集合
const MONGO_MODELS = MongooseModule.forFeature([
  {
    name: 'USER_MODEL',
    schema: UserSchema,
    collection: 'user',
  },
  {
    name: 'MENU_MODEL',
    schema: MenuSchema,
    collection: 'menu',
  },
  {
    name: 'COUNTERS_MODEL',
    schema: CountersSchema,
    collection: 'counters',
  },
  {
    name: 'ROLE_MODEL',
    schema: RoleSchema,
    collection: 'role',
  },
  {
    name: 'ARTICLE_TAG_MODEL',
    schema: ArticleTagSchema,
    collection: 'articleTag',
  },
  {
    name: 'ARTICLE_MODEL',
    schema: ArticleSchema,
    collection: 'article',
  },
  {
    name: 'MESSAGE_MODEL',
    schema: MessageSchema,
    collection: 'message',
  },
]);

@Global() // 标注为全局模块
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:21017/blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    MONGO_MODELS,
  ],
  exports: [MONGO_MODELS],
})
export class DbModule {}
