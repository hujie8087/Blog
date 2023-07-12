import { ReqPage } from "./index";

export namespace ArticleTag {
  export interface ArticleTag {
    _id: string;
    title: string;
    sort: number;
    status: number;
    remark: string;
  }
  export interface ReqArticleTagParams {
    params: {
      title?: string;
      status?: number;
    };
    page: ReqPage;
  }
  export interface ArticleTagDict {
    id: number;
    title: string;
  }
}

export namespace Article {
  export interface Article {
    _id: string;
    title: string;
    articleCover: string;
    articleTag?: string;
    commentNum?: number;
    content: string;
    summary: string;
    articleReadNum?: number;
    sort: number;
    status: number;
    createdAt: string;
  }
  export interface CreateArticle {
    title: string;
    articleCover: string;
    articleTag: string;
    content: string;
    summary: string;
    sort: number;
    status: number;
  }
  export interface ReqArticleParams {
    params: {
      title?: string;
      status?: number;
      articleTag?: string;
      content?: string;
    };
    page: ReqPage;
  }
}
