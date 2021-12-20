import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { WrongPasswordException } from './auth.types';

@Catch(WrongPasswordException)
export class WrongPasswordFilter implements ExceptionFilter {
  catch({ name, message }: WrongPasswordException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    res.status(HttpStatus.PRECONDITION_FAILED).json({
      name,
      detail: message,
    });
  }
}
