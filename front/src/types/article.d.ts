export interface ArticleType {
  _id: string;
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
  status?: number;
}

export interface PageType {
  pageNum: number;
  pageSize: number;
}

export interface articleTagType {
  value: number;
  label: string;
}
