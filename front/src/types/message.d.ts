export interface AvatarType {
  bgColor: string;
  hatColor: string;
  faceColor: string;
  hairColor: string;
  shirtColor: string;
  hairColorRandom: boolean;
  sex: string;
  earSize: string;
  eyeType: string;
  hatType: string;
  hairType: string;
  noseType: string;
  mouthType: string;
  shirtType: string;
  glassesType: string;
  shape: string;
}
export interface MessageType {
  _id: string;
  name: string;
  cityName: string;
  clientIp?: string;
  iconNo?: number;
  content: string;
  createdAt: string;
  token?: string;
  replyId?: string;
  replyRootId?: string;
  replyList?: MessageType[];
  replyNum?: number;
  replyName?: string;
  avatar?: AvatarType;
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
