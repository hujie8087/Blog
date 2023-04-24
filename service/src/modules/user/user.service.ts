import { User } from 'src/interface/user.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedisService } from 'nestjs-redis/dist';
import { IResponse } from 'src/interface/response.interface';

@Injectable()
export class UserService {
  public client;
  private response: IResponse;
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
    private readonly redisService: RedisService,
  ) {
    this.getClient();
  }
  async getClient() {
    this.client = await this.redisService.getClient();
  }

  async set(key: string, value: any, seconds?: number) {
    value = JSON.stringify(value);
    if (!this.client) {
      await this.getClient();
    }
    if (!seconds) {
      return await this.client.set(key, value);
    } else {
      return await this.client.set(key, value, 'EX', seconds);
    }
  }
  //获取值的方法
  async get(key: string) {
    if (!this.client) {
      return await this.getClient();
    }
    const data = await this.client.get(key);
    if (!data) return;
    return JSON.parse(data);
  }
  public async getUserList(map, page) {
    const total = await this.userModel.countDocuments({ ...map, isDel: 0 });
    return await this.userModel
      .find({ ...map, isDel: 0 }, { _id: 0, __v: 0 })
      .skip(page.pageNum ? (page.pageNum - 1) * page.pageSize : 0)
      .limit(page.pageSize)
      .then((res) => {
        this.response = {
          code: 200,
          msg: '用户列表',
          data: {
            list: res,
            total: total,
            pageNum: page.pageNum,
            pageSize: page.pageSize,
          },
        };
        return this.response;
      });
  }

  public async findUserByUsername(username: string) {
    return await this.userModel.find({ username });
  }
}
