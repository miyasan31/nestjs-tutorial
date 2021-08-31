import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// ログを出すだけのシンプルなLoggerMiddleware
// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   // 依存先のモジュールで使用するとミドルウェアが実行される
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log('Request...');
//     next();
//   }
// }

// 単純な関数でもミドルウェアとして機能する
export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`Request...`);
  next();
}
