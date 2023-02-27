import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  //  3.验证账号密码是否正确，正确->user，错误->null
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // 验证通过，生成token返回给客户端
  async login(user: any) {
    const payload = { username: user.userName, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
