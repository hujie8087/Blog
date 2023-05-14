// import request from 'utils/http'
import { ArticleType, PageType, articleTagType } from '@/types/article';
import { ResList } from '@/types/axios';
import request from '@/utils/http/index';
// api枚举
enum Api {
  getArticleList = '/article',
  getArticleDetail = '/article',
  getArticleTag = '/article-tag/dict',
  getHotArticle = '/article/hot',
}

/**
 * 文章
 */
export const accountArticle = (page: PageType) => {
  return request<ResList<ArticleType[]>>({
    url: Api.getArticleList,
    params: page,
    method: 'get',
  });
};

export const getArticleDetail = (id: number) => {
  return request<ArticleType>({
    url: `${Api.getArticleDetail}/${id}`,
    method: 'get',
  });
};

export const getArticleTag = () => {
  return request<articleTagType[]>({
    url: Api.getArticleTag,
    method: 'get',
  });
};

export const getHotArticle = () => {
  return request<ArticleType[]>({
    url: Api.getHotArticle,
    method: 'get',
  });
};
