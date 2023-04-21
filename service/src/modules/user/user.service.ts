import { User } from 'src/interface/user.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedisService } from 'nestjs-redis/dist';

@Injectable()
export class UserService {
  public client;
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
    private readonly redisService: RedisService,
  ) {
    this.getClient();
  }
  async getClient() {
    this.client = await this.redisService.getClient();
  }
  public async hello() {
    return await this.set('jayden', 'hello word!');
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
  findAll() {
    return `This action returns all user`;
  }

  public async findUserByUsername(username: string) {
    return await this.userModel.find({ username });
  }
}
