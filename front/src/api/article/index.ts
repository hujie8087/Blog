// import request from 'utils/http'
import { ArticleType, PageType, articleTagType } from '@/types/article';
import { ResList } from '@/types/axios';
import request from '@/utils/http/index';
// api枚举
enum Api {
  getArticleList = '/articles',
  getArticleDetail = '/articles',
  getArticleTag = '/article-tags',
  getHotArticle = '/articles/hotArticles',
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

export const getArticleDetail = (id: string) => {
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
