/**
 * Ensures that each request has its own MikroORM context
 * */

import { CustomRequest } from '@app/core/types/http.types';
import { MikroORM, RequestContext } from '@mikro-orm/core';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class MikroOrmRequestContextMiddleware implements NestMiddleware {
  constructor(private readonly orm: MikroORM) {}
  use(req: CustomRequest, res: Response, next: NextFunction): void {
    RequestContext.create(this.orm.em, next);
  }
}
