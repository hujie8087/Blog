import { MongooseModule } from '@nestjs/mongoose';
import { Global, Module } from '@nestjs/common';
import { UserSchema } from './schema/user.schema';
import { MenuSchema } from './schema/menu.schema';
import { CountersSchema } from './schema/counters.schema';

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
