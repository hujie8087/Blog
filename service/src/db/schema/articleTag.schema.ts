import { SchemaFactory } from '@nestjs/mongoose';
import { ArticleTag } from 'src/interface/articleTag.interface';

export const ArticleTagSchema = SchemaFactory.createForClass(ArticleTag);
