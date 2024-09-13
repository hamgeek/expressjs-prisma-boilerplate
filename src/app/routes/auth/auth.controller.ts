import { NextFunction, Request, Response, Router } from 'express';

import { env } from '../../../lib';
import { isAuthentication } from '../../middleware';
import { GoogleCallbackQuerySchema } from './auth.contracts';
import { getOauthProfile, signUserAccount } from './auth.service';

const router = Router();

router.get(
  '/me',
  isAuthentication,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.responseFormatter({
        status: 200,
        data: req.user,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.get('/google', (req: Request, res: Response, next: NextFunction) => {
  try {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${env('GOOGLE_CLIENT_ID')}&redirect_uri=${env('GOOGLE_CALLBACK_URL')}&response_type=code&scope=profile email`;
    res.redirect(url);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/google/callback',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = GoogleCallbackQuerySchema.parse(req.query);

      const profile = await getOauthProfile(code);

      const token = await signUserAccount(profile);

      if (!req.session.auth_token) {
        req.session.auth_token = token;
      }

      res.responseFormatter({
        status: 200,
        data: token,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
