import { NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Request, next: NextFunction) {
    next();
  }
}
