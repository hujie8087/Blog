import { NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { addSalt, encript } from 'src/utils/encription';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Request, next: NextFunction) {
    let userPassword = req.body['password'];
    if (userPassword) {
      const salt = addSalt();
      userPassword = encript(userPassword, salt);
      req.body['password'] = userPassword;
      req.body['salt'] = salt;
    }
    next();
  }
}
