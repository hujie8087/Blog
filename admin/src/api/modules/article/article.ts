import http from "@/api";
import { ARTICLE } from "@/api/config/servicePort";
import { ResPage, ResultData } from "@/api/interface";
import { Article } from "@/api/interface/article";

/**
 * @name 文章管理模块
 */

// * 新增文章
export const addArticle = (params: Article.Article) => {
  return http.post(ARTICLE, params);
};

// 查询文章列表
export const getArticleList = (params: Article.ReqArticleParams) => {
  return http.get<ResPage<Article.Article[]>>(ARTICLE, params);
};

// 查询文章详情
export const getArticleById = (id: string) => {
  return http.get<Article.Article>(`${ARTICLE}/${id}`);
};

// 修改文章
export const updateArticle = (params: Article.Article) => {
  return http.put<ResultData>(ARTICLE, params);
};

// 删除文章
export const delArticle = (id: number) => {
  return http.delete<ResultData>(`${ARTICLE}/${id}`);
};
