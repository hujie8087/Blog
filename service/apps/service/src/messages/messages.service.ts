import { Message } from '@libs/db/models/message.model';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { IResponse } from 'libs/interface/response.interface';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private messageModel: Model<Message>) {}

  private response: IResponse;
  async create(createMessageDto: Message) {
    if (createMessageDto.replyId) {
      const replayComment = await this.messageModel.findById(
        createMessageDto.replyId,
      );
      if (replayComment) {
        createMessageDto.replyRootId =
          replayComment.replyRootId || replayComment._id.toString();
        createMessageDto.replyName = replayComment.name;
        createMessageDto.cityName = replayComment.cityName;
      }
    }
    const createArticle = new this.messageModel({
      ...createMessageDto,
      isDel: false,
    });

    await createArticle.save();
    Logger.log(`${createMessageDto.name}留言成功`);
    this.response = { code: 200, data: '', msg: '留言成功' };
    return this.response;
  }

  async findAll(query) {
    const { pageNum, pageSize, ...params } = query;
    const data = await this.messageModel
      .find({ ...params, isDel: false, replyId: '' })
      .sort('-createdAt')
      .skip(pageNum ? (pageNum - 1) * pageSize : 0)
      .limit(pageSize);
    const total = await this.messageModel.countDocuments({
      ...params,
      isDel: false,
      replyId: '',
    });
    const result = await Promise.all(
      data.map(async (item) => {
        const replyList = await this.messageModel
          .find({
            replyRootId: item._id,
            isDel: false,
          })
          .limit(2);
        const replyNum = await this.messageModel.countDocuments({
          replyRootId: item._id,
          isDel: false,
        });
        return { ...item._doc, replyList, replyNum };
      }),
    );

    this.response = {
      code: 200,
      msg: '留言列表',
      data: {
        list: result,
        total,
        pageNum: +pageNum,
        pageSize: +pageSize,
      },
    };
    return this.response;
  }

  async getAllComment(id: string, query) {
    const { pageNum, pageSize } = query;
    const replyList = await this.messageModel
      .find({
        replyRootId: id,
        isDel: false,
      })
      .skip(pageNum ? (pageNum - 1) * pageSize : 0)
      .limit(pageSize);
    this.response = {
      code: 200,
      msg: '留言列表',
      data: {
        list: replyList,
      },
    };
    return this.response;
  }
}
