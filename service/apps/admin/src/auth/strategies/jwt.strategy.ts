import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from '../../../../../libs/lib';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategyUser extends PassportStrategy(Strategy, 'userjwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const { username, status, roles, phone, avatar, nickname, email } = payload;
    return {
      username,
      status,
      roles,
      phone,
      avatar,
      nickname,
      email,
    };
  }
}
