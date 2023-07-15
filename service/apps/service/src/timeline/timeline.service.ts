import { TimeLine } from '@libs/db/models/timeLine.model';
import { Injectable } from '@nestjs/common';
import { IResponse } from 'libs/interface/response.interface';
import { Model } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class TimelineService {
  constructor(@InjectModel(TimeLine) private TimeLine: Model<TimeLine>) {}
  private response: IResponse;
  async findAll(query) {
    const { pageNum, pageSize, ...params } = query;
    const data = await this.TimeLine.find(
      { isDel: false, ...params },
      { __v: 0, isDel: 0 },
    )
      .sort({ time: -1 })
      .skip(pageNum ? (pageNum - 1) * pageSize : 0)
      .limit(pageSize);
    const total = await this.TimeLine.countDocuments({
      isDel: false,
      ...params,
    });
    this.response = {
      code: 200,
      msg: '时间轴列表',
      data: {
        list: data,
        total,
        pageNum: +pageNum,
        pageSize: +pageSize,
      },
    };
    return this.response;
  }
}
