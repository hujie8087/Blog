import http from "@/api";
import { ARTICLETag } from "@/api/config/servicePort";
import { ResPage, ResultData } from "@/api/interface";
import { ArticleTag } from "@/api/interface/article";

/**
 * @name 文章标签管理模块
 */

// * 新增文章标签
export const addArticleTag = (params: FormData) => {
  return http.post<ResultData>(ARTICLETag, params);
};

// 查询文章标签列表
export const getArticleTagList = (params: ArticleTag.ReqArticleTagParams) => {
  return http.get<ResPage<ArticleTag.ArticleTag[]>>(ARTICLETag, params);
};

// 查询文章标签详情
export const getArticleTagById = (id: string) => {
  return http.get<ArticleTag.ArticleTag>(`${ARTICLETag}/${id}`);
};

// 修改文章标签
export const updateArticleTag = (params: ArticleTag.ArticleTag) => {
  return http.put<ResultData>(`${ARTICLETag}/${params._id}`, params);
};

// 删除文章标签
export const delArticleTag = (id: string) => {
  return http.delete<ResultData>(`${ARTICLETag}/${id}`);
};

// 获取文章标签字典
export const getArticleTagDict = () => {
  return http.get<ArticleTag.ArticleTagDict[]>(`${ARTICLETag}/dict`);
};
