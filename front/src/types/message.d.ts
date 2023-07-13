export interface MessageType {
  _id: string;
  name: string;
  cityName: string;
  clientIp?: string;
  iconNo?: number;
  content: string;
  createDate: string;
  token?: string;
  replyId?: string;
  replyRootId?: string;
  replyList?: MessageType[];
  replyNum?: number;
  replyName?: string;
}

export interface CreateMessage {
  name: string;
  content: string;
  token?: string;
}

export interface PageType {
  pageNum: number;
  pageSize: number;
}
