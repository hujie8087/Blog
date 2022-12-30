import { Schema } from 'mongoose';

// export type ArticleDocument = HydratedDocument<Article>;
export const ArticleSchema = new Schema({
  ArticleCover: { type: String, required: true },
  ArticleTag: { type: String, required: true },
  CommentNum: { type: Number, required: true },
  Content: { type: String, required: true },
  CreateDate: { type: String, required: true },
  Summary: { type: String, required: true },
  Title: { type: String, required: true },
  Token: { type: String, required: true },
  articleReadNum: { type: Number, required: true },
  order: { type: Number, required: true },
});
