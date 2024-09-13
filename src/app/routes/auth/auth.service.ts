import axios from 'axios';
import jwt from 'jsonwebtoken';

import { db, env } from '../../../lib';
import { OauthProfile } from './auth.types';

export const getOauthProfile = async (code: string) => {
  const { data } = await axios.post('https://oauth2.googleapis.com/token', {
    client_id: env('GOOGLE_CLIENT_ID'),
    client_secret: env('GOOGLE_CLIENT_SECRET'),
    code,
    redirect_uri: env('GOOGLE_CALLBACK_URL'),
    grant_type: 'authorization_code',
  });

  const { access_token: accessToken } = data;

  const { data: profile } = await axios.get(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return profile as OauthProfile;
};

export const signUserAccount = async (profile: OauthProfile) => {
  const findAccount = await db.account.findFirst({
    where: {
      oauthId: profile.sub,
    },
  });

  if (findAccount) {
    const generateToken = jwt.sign(
      {
        sub: findAccount.userId,
      },
      env('APP_SECRET_KEY'),
      {
        expiresIn: '1d',
      },
    );
    return generateToken;
  }

  const createUserAccount = await db.$transaction(async (tx) => {
    const createUser = await tx.user.create({
      data: {
        name: profile.name,
        email: profile.email,
        onBoarding: true,
        avatarUrl: profile.picture,
      },
    });

    const createAccount = await tx.account.create({
      data: {
        userId: createUser.id,
        oauthProvider: 'google',
        oauthId: profile.sub,
      },
    });

    return { createUser, createAccount };
  });

  const generateToken = jwt.sign(
    {
      sub: createUserAccount.createUser.id,
    },
    env('APP_SECRET_KEY'),
    {
      expiresIn: '1d',
    },
  );
  return generateToken;
};
