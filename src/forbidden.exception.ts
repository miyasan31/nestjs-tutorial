import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'ページが見つかりませんでした',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

// https://docs.nestjs.com/exception-filters#built-in-http-exceptions
