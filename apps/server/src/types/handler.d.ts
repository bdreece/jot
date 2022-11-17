import type { PathParams } from 'express-serve-static-core';
import type { RequestHandler } from 'express';
import type { Response } from '@app/models';

export type Handler<TData, TError = any> = RequestHandler<
  PathParams,
  Response<TData, TError>
>;
