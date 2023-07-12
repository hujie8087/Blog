import { Message } from '@libs/db/models/message.model';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { IResponse } from 'libs/interface/response.interface';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private messageModel: Model<Message>) {}

  private response: IResponse;
  async create(createMessageDto: Message) {
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
      .find({ ...params, isDel: false })
      .sort('sort')
      .skip(pageNum ? (pageNum - 1) * pageSize : 0)
      .limit(pageSize);
    this.response = {
      code: 200,
      msg: '文章列表',
      data: {
        list: data,
        pageNum: +pageNum,
        pageSize: +pageSize,
      },
    };
    return this.response;
  }

  findOne(id: string) {
    return `This action returns a #${id} message`;
  }

  update(id: string, updateMessageDto: Message) {
    return `This action updates a #${id} message`;
  }

  remove(id: string) {
    return `This action removes a #${id} message`;
  }
}
