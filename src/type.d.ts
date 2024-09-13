import 'express-session';

import { User } from '@prisma/client';

import { ParamResponseFormatter } from './lib/response-formatter';

declare module 'express-session' {
  interface SessionData {
    auth_token?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
    interface Response {
      responseFormatter?: (params: ParamResponseFormatter) => void;
    }
  }
}
