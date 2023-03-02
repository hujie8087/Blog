import { JwtService } from '@nestjs/jwt';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponse } from 'src/interface/response.interface';
import { User } from 'src/interface/user.interface';
import { encript } from 'src/utils/encription';
import { UserService } from '../user/user.service';

const logger = new Logger('auth.service');

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  private response: IResponse;
  // 验证用户账号密码方法
  private async validateUser(user: User) {
    const phone: string = user.phone;
    const password: string = user.password;
    return await this.userService
      .findUserByPhone(phone)
      .then((res) => {
        if (res.length > 0) {
          return res[0];
        } else {
          this.response = {
            code: 500,
            message: '该用户未注册',
          };
          throw this.response;
        }
      })
      .then((dbUser: User) => {
        const pass = encript(password, dbUser.salt);
        if (pass === dbUser.password) {
          this.response = {
            code: 200,
            message: {
              userId: dbUser._id,
            },
          };
          return this.response;
        } else {
          this.response = {
            code: 200,
            message: '用户密码错误',
          };
          throw this.response;
        }
      })
      .catch((err) => {
        return this.response;
      });
  }
  private async createToken(user: User) {
    return await this.jwtService.sign(user);
  }
  // 用户登录方法
  public async login(user: User) {
    return await this.validateUser(user)
      .then(async (res: IResponse) => {
        if (res.code !== 200) {
          this.response = res;
          throw this.response;
        }
        this.response = {
          code: 200,
          message: {
            token: await this.createToken(user),
            userId: res.message.userId,
          },
        };
        return this.response;
      })
      .catch((err) => {
        return err;
      });
  }
  //  用户注册方法
  public async create(user: User) {
    return await this.userService
      .findUserByPhone(user.phone)
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
  // 用户修改方法
  public async alter(user: User) {
    return this.userService.findUserByPhone(user.phone).then(async () => {
      return await this.userModel
        .findOneAndUpdate({ phone: user.phone }, user, {}, () => {
          logger.log(`用户${user.phone}密码修改成功`);
        })
        .then(() => {
          console.log(111);
          return (this.response = { code: 200, message: '用户密码修改成功！' });
        })
        .catch((err) => {
          console.log(222);
          return err;
        });
    });
  }
}
