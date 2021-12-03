import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
  catch(
    { name, detail }: QueryFailedError & { detail: string },
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    res.status(HttpStatus.CONFLICT).json({
      name,
      detail,
    });
  }
}

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
  catch(ex: EntityNotFoundError & { detail: string }, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    res.status(HttpStatus.NOT_FOUND).json({
      name: ex.name,
    });
  }
}
