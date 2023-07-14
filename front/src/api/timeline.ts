// import request from 'utils/http'
import { TimeLineType } from '@/types/timeLine';
import request from '@/utils/http/index';
import { PageType } from '@/types/article';
// api枚举
enum Api {
  getTimeLineList = '/timeline',
}

/**
 * 文章
 */
export const accountTimeLine = (page: PageType) => {
  //   const query = { sort: '-time', limit: page.pageSize, page: page.pageNum };
  return request<TimeLineType[]>({
    url: `${Api.getTimeLineList}?query={sort:-time,limit:${page.pageSize},page:${page.pageNum}}`,
    method: 'get',
  });
};
