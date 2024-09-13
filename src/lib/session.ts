import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import session from 'express-session';

import { db } from './db';
import { env } from './env';

const sessionStore = new PrismaSessionStore(db, {
  checkPeriod: 2 * 60 * 1000, // ms
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

const sessionExpress = session({
  store: sessionStore,
  secret: env('APP_SECRET_KEY'),
  name: 'session_web',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 1,
  },
});

export { sessionExpress };
