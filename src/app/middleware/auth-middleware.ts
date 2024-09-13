import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { db, env } from '../../lib';

const isAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session.auth_token) {
    res.responseFormatter({
      status: 401,
    });
    return;
  }

  const verifyToken = jwt.verify(req.session.auth_token, env('APP_SECRET_KEY'));

  if (!verifyToken) {
    res.responseFormatter({
      status: 401,
    });
    return;
  }

  try {
    const getUserInfo = await db.user.findUniqueOrThrow({
      where: {
        id: verifyToken.sub as string,
      },
    });

    req.user = getUserInfo;
    next();
  } catch (error) {
    next(error);
  }
};

export { isAuthentication };
