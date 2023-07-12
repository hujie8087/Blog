// import request from 'utils/http'
import { CreateMessage, MessageType, PageType } from '@/types/message';
import { ResList } from '@/types/axios';
import request from '@/utils/http/index';
// api枚举
enum Api {
  getMessageList = '/messages',
  getMessageDetail = '/messages',
  postMessage = '/messages',
  getCityName = 'https://restapi.amap.com/v3/ip?ip=114.247.50.2&key=63accee3b61b553cc4cd4252f2a3b7e4',
}

/**
 * 文章
 */
export const accountMessage = (page: PageType) => {
  return request<ResList<MessageType[]>>({
    url: Api.getMessageList,
    params: page,
    method: 'get',
  });
};

export const getMessageDetail = (id: number) => {
  return request<MessageType>({
    url: `${Api.getMessageDetail}/${id}`,
    method: 'get',
  });
};

export const postMessage = (param: CreateMessage) => {
  return request({
    url: Api.postMessage,
    method: 'post',
    data: param,
  });
};

export const getCityName = () => {
  return request({
    url: Api.postMessage,
    method: 'get',
  });
};
