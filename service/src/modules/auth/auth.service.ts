import { JwtService } from '@nestjs/jwt';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponse } from 'src/interface/response.interface';
import { User } from 'src/interface/user.interface';
import { encript } from 'src/utils/encription';
import { UserService } from '../user/user.service';

const svgCaptcha = require('svg-captcha');
const logger = new Logger('auth.service');

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  private response: IResponse;
  private pointer = 0;
  private captchas = {};
  // 验证用户账号密码方法
  private async validateUser(user: User) {
    const username: string = user.username;
    const password: string = user.password;
    const captcha: string = user.captcha;
    const captchaId: string = user.captchaId;
    if (!captcha) {
      return (this.response = {
        code: 500,
        data: '',
        msg: '请输入验证码',
      });
    } else if (captcha !== this.captchas[captchaId]) {
      return (this.response = {
        code: 500,
        data: '',
        msg: '验证码不正确',
      });
    } else {
      return await this.userService
        .findUserByUsername(username)
        .then((res) => {
          if (res.length > 0) {
            return res[0];
          } else {
            throw '该用户未注册';
          }
        })
        .then((dbUser: User) => {
          const pass = encript(password, dbUser.salt);
          if (pass === dbUser.password) {
            this.response = {
              code: 200,
              data: {
                userId: dbUser._id,
              },
              msg: '用户ID',
            };
            return this.response;
          } else {
            throw '用户密码错误';
          }
        })
        .catch((err) => {
          this.response = {
            code: 500,
            data: '',
            msg: err,
          };
          return this.response;
        });
    }
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
          data: {
            access_token: await this.createToken(user),
          },
          msg: '登录成功',
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
      .findUserByUsername(user.username)
      .then((res) => {
        if (res.length > 0) {
          this.response = { code: 500, data: '', msg: '当前手机号已注册！' };
          throw this.response;
        }
      })
      .then(async () => {
        try {
          const createUser = new this.userModel(user);
          await createUser.save();
          this.response = { code: 200, data: '', msg: '用户注册成功' };
          return this.response;
        } catch (error) {
          this.response = {
            code: 500,
            data: '',
            msg: `用户注册失败，请联系管理员，错误详情：${error.message}`,
          };
          throw this.response;
        }
      })
      .catch((err) => {
        logger.log(`${user.username}:${err.message}`);
        return this.response;
      });
  }
  // 用户修改方法
  public async alter(user: User) {
    return this.userService.findUserByUsername(user.username).then(async () => {
      return await this.userModel
        .findOneAndUpdate({ username: user.username }, user, {}, () => {
          logger.log(`用户${user.username}密码修改成功`);
        })
        .then(() => {
          return (this.response = {
            code: 200,
            data: '',
            msg: '用户密码修改成功！',
          });
        })
        .catch((err) => {
          console.log(222);
          return err;
        });
    });
  }
  // 获取登录验证码
  public async createCaptcha(id?: string) {
    if (id && id !== '-1') {
      delete this.captchas[id];
      console.log('删除id' + id);
    }
    const c = svgCaptcha.create({
      width: 120, // 图片宽
      height: 40, //图片长
      color: true,
    });
    this.captchas[this.pointer] = c.text;
    this.response = {
      code: 0,
      msg: '获取验证码成功',
      data: {
        id: this.pointer++,
        img: c.data,
      },
    };
    return this.response;
  }
}
