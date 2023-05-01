import { ReqPage } from "./index";

export namespace ArticleTag {
  export interface ArticleTag {
    id: number;
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
    id?: number;
    title: string;
    articleCover: string;
    articleTag?: string;
    commentNum?: number;
    content: string;
    summary: string;
    articleReadNum?: number;
    sort: number;
    status: number;
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
