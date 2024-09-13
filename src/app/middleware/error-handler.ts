/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AxiosError } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { HttpStatusType, logger } from '../../lib';
import { httpPrismaCode } from '../../utils';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    res.responseFormatter({
      status: 422,
      data: err.issues,
    });
    return;
  }

  if (err instanceof PrismaClientKnownRequestError) {
    logger.error(err.message);
    res.responseFormatter({
      status: httpPrismaCode(err.code) as HttpStatusType,
      msg: err.message,
    });
    return;
  }

  if (err instanceof AxiosError) {
    res.responseFormatter({
      status: 400,
      msg: 'CLIENT_REQUEST_ERROR',
    });
    return;
  }

  logger.error(err.message);

  res.responseFormatter({
    status: 500,
  });
};

export { errorHandler };
