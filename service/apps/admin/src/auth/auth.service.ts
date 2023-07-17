import { Injectable } from '@nestjs/common';
import { cryptoString } from '../../../../libs/lib';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '@libs/db/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const data = await this.usersService.findOneByName(username);

    const user = JSON.parse(JSON.stringify(data || {}));

    password = cryptoString(password);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // 登录
  login(user: LoginUserDto) {
    const payload = {
      username: user.username,
      password: user.password,
    };
    const result = this.validateUser(user.username, user.password);
    if (result) {
      return {
        data: {
          access_token: this.jwtService.sign(payload),
          code: 200,
        },
      };
    } else {
      return {
        data: {
          code: 400,
          msg: '用户名或密码错误',
        },
      };
    }
  }

  // 登出
  async logout() {
    return {
      message: 'ok',
    };
  }
}
