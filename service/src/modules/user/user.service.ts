import { IResponse } from './../../interface/response.interface';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interface/user.interface';

const logger = new Logger('user.service');

@Injectable()
export class UserService {
  private response: IResponse;
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
  ) {}

  public async create(user: User) {
    return await this.findUserByPhone(user.phone)
      .then((res) => {
        if (res.length > 0) {
          this.response = { code: 500, message: '当前手机号已注册！' };
          throw this.response;
        }
      })
      .then(async () => {
        try {
          const createUser = new this.userModel(user);
          await createUser.save();
          this.response = { code: 200, message: '用户注册成功' };
          return this.response;
        } catch (error) {
          this.response = {
            code: 500,
            message: `用户注册失败，请联系管理员，错误详情：${error.message}`,
          };
          throw this.response;
        }
      })
      .catch((err) => {
        logger.log(`${user.phone}:${err.message}`);
        return this.response;
      });
  }

  private async findUserByPhone(phone: string) {
    return await this.userModel.find({ phone });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, user: User) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
