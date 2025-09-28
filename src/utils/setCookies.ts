import { Response } from 'express';

interface TokenInfo {
  accessToken?: string;
}
export const setCookies = (res: Response, tokenInfo: TokenInfo) => {
  if (tokenInfo?.accessToken) {
    res.cookie('accessToken', tokenInfo.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
    });
  }
};
