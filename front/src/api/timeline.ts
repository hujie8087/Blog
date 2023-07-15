// import request from 'utils/http'
import { TimeLineType } from '@/types/timeLine';
import request from '@/utils/http/index';
import { PageType } from '@/types/article';
import { ResList } from '@/types/axios';
// api枚举
enum Api {
  getTimeLineList = '/timeline',
}

/**
 * 文章
 */
export const accountTimeLine = (page: PageType) => {
  return request<ResList<TimeLineType[]>>({
    url: Api.getTimeLineList,
    params: page,
    method: 'get',
  });
};
