import cookie from 'js-cookie';

import { isServerSide } from './utils';

export const setCookie = (key: string, value: string) => {
  if (!isServerSide()) {
    cookie.set(key, value, {
      expires: 4,
      path: '/',
      sameSite: 'Lax',
    });
  }
};

export const removeCookie = (key: string, res?: any) => {
  if (!isServerSide()) {    
    cookie.remove(key, {
      expires: 0,
    });
  } else if (res) {
    res.setHeader('Set-Cookie', [
      `${key}=deleted; Max-Age=0`,
    ]);
  }
};

export const getCookie = (key: string, req: any) => {
  return !isServerSide()
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

const getCookieFromBrowser = (key: string) => {
  return cookie.get(key);
};

const getCookieFromServer = (key: string, req: any) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find((c: string) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};