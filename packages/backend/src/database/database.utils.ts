import * as _ from 'lodash';
import { isNil } from 'lodash';
import { SelectQueryBuilder, Brackets, ObjectLiteral } from 'typeorm';
import { Pagination } from './database.dto';

export enum Expression {
  AND,
  OR,
}

type Where<T> =
  | string
  | Brackets
  | ObjectLiteral
  | ObjectLiteral[]
  | ((qb: SelectQueryBuilder<T>) => string);

export function addCondition<T>(
  qb: SelectQueryBuilder<T>,
  where: Where<T>,
  parameters?: ObjectLiteral,
  expression: Expression = Expression.AND,
): SelectQueryBuilder<T> {
  let nqb = qb;
  if (qb.expressionMap.wheres.length === 0) {
    nqb = qb.where(where, parameters);
  } else if (expression === Expression.OR) {
    nqb = qb.orWhere(where, parameters);
  } else {
    nqb = qb.andWhere(where, parameters);
  }
  return nqb;
}

export function addPagination<T>(
  qb: SelectQueryBuilder<T>,
  pagination?: Pagination,
): SelectQueryBuilder<T> {
  let nqb = qb;

  if (!isNil(pagination?.skip)) {
    nqb = nqb.skip(pagination.skip);
  }

  if (!isNil(pagination?.take)) {
    nqb = nqb.take(pagination.take);
  }

  return nqb;
}
