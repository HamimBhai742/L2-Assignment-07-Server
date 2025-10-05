import { Response } from 'express';
import { env } from '../config/env';

interface TokenInfo {
  accessToken?: string;
}
export const setCookies = (res: Response, tokenInfo: TokenInfo) => {
  if (tokenInfo?.accessToken) {
    res.cookie('accessToken', tokenInfo.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
  }
};
