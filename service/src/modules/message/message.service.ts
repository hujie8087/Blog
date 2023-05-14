import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counters } from 'src/interface/Counters.interface';
import { Message } from 'src/interface/message.interface';
import { IResponse } from 'src/interface/response.interface';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('MESSAGE_MODEL')
    private readonly messageModel: Model<Message>,
    @InjectModel('COUNTERS_MODEL')
    private readonly countersModel: Model<Counters>,
  ) {}
  //   private response: IResponse;

  public async create(body: Message) {
    console.log(body);

    // const sequenceDocument = await this.countersModel.findOneAndUpdate(
    //   { name: 'messageId' },
    //   { $inc: { sequence_value: 1 } },
    // );

    // const createArticle = new this.messageModel({
    //   ...body,
    //   id: sequenceDocument.sequence_value,
    // });
    // await createArticle.save();
    // Logger.log(`${body.name}留言成功`);
    // this.response = { code: 200, data: '', msg: '留言成功' };
    // return this.response;
  }
}
