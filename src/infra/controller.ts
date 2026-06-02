import * as cookie from 'cookie';
import type { Response } from 'express';

import authenticationModel from '../models/authentication.model.js';

async function setSessionCookie(sessionToken: string, response: Response) {
  const setCookie = cookie.serialize('session_id', sessionToken, {
    path: '/',
    maxAge: authenticationModel.EXPIRATION_IN_MILLISECONDS,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  });

  response.setHeader('Set-cookie', setCookie);
}

const controller = {
  setSessionCookie,
};

export default controller;
