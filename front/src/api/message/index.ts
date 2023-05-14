// import request from 'utils/http'
import { CreateMessage, MessageType, PageType } from '@/types/message';
import { ResList } from '@/types/axios';
import request from '@/utils/http/index';
// api枚举
enum Api {
  getMessageList = '/message',
  getMessageDetail = '/message',
  postMessage = '/message',
  getMessageTag = '/message-tag/dict',
  getHotMessage = '/message/hot',
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

export const getHotMessage = () => {
  return request<MessageType[]>({
    url: Api.getHotMessage,
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
