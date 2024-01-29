import { TimeLine } from '@libs/db/models/timeLine.model';
import { Injectable } from '@nestjs/common';
import { IResponse } from 'libs/interface/response.interface';
import { Model } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import dayjs from 'dayjs';

@Injectable()
export class TimelineService {
  constructor(@InjectModel(TimeLine) private timeLineModel: Model<TimeLine>) {}
  private response: IResponse;

  async create(timeLine: TimeLine) {
    const createTimeLine = new this.timeLineModel({
      ...timeLine,
    });
    await createTimeLine.save();
    this.response = { code: 200, data: '', msg: '添加时间轴成功' };
    return this.response;
  }
  async findAll(query) {
    const { pageNum, pageSize, ...params } = query;
    if (params.title) {
      params.title = { $regex: params.title, $options: 'i' };
    }
    const total = await this.timeLineModel.countDocuments({
      ...params,
      isDel: false,
    });
    const data = await this.timeLineModel.find(
      { ...params, isDel: false },
      { __v: 0, isDel: 0 },
    );
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
  async findOne(id: string) {
    return await this.timeLineModel
      .findOne({ _id: id, isDel: false })
      .then(async () => {
        const data = await this.timeLineModel.findOne(
          { _id: id, isDel: false },
          { __v: 0, isDel: 0 },
        );
        this.response = {
          code: 200,
          msg: '时间轴详情',
          data,
        };
        return this.response;
      })
      .catch(() => {
        this.response = { code: 400, data: '', msg: '时间轴不存在' };
        return this.response;
      });
  }
  async update(id: string, timeLine: TimeLine) {
    return await this.timeLineModel
      .updateOne({ _id: id }, timeLine)
      .then(() => {
        this.response = { code: 200, data: '', msg: '更新时间轴成功' };
        return this.response;
      })
      .catch((err) => {
        this.response = { code: 400, data: '', msg: err.message };
        return this.response;
      });
  }
  async remove(id: string) {
    return await this.timeLineModel
      .updateOne({ _id: id }, { isDel: true })
      .then(() => {
        this.response = { code: 200, data: '', msg: '删除时间轴成功' };
        return this.response;
      })
      .catch((err) => {
        this.response = { code: 400, data: '', msg: err.message };
        return this.response;
      });
  }
}
