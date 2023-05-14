export interface ArticleType {
  id?: number;
  title: string;
  articleCover: string;
  articleTag?: string;
  commentNum?: number;
  content: string;
  summary: string;
  createDate: string;
  articleReadNum?: number;
  sort: number;
  token: string;
  status: number;
}

export interface PageType {
  pageNum: number;
  pageSize: number;
}

export interface articleTagType {
  id: number;
  title: string;
}
