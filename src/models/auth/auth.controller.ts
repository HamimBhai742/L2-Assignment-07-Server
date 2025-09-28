import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/craete.async.fn';
import passport from 'passport';
import { AppError } from '../../error/coustom.error';
import httpStatusCode from 'http-status-codes';
import { createUserToken } from '../../utils/create.user.token';
import { setCookies } from '../../utils/set.cookies';
import { sendResponse } from '../../utils/send.response';
import { authServices } from './auth.services';

const loginWithEmailAndPass = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', async (err: any, user: any, info: any) => {
      if (err) {
        return next(new AppError(err, httpStatusCode.UNAUTHORIZED));
      }
      if (!user) {
        return next(new AppError(info.message, httpStatusCode.NOT_FOUND));
      }

      //create token
      const userToken = createUserToken(user);

      //set cookie
      setCookies(res, userToken);

      sendResponse(res, {
        statusCode: httpStatusCode.OK,
        success: true,
        message: 'User logged in successfully',
        data: userToken,
      });
    })(req, res, next);
  }
);

const verifyUser = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'User logged in',
      data: req.user,
    });
  }
);

const getMe = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authServices.getMe();
    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Get me',
      data: user,
    });
  }
);

const logout = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: false,
      // sameSite: 'none',
    });

    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'User logged out successfully',
      data: null,
    });
  }
);

export const authController = {
  loginWithEmailAndPass,
  getMe,
  verifyUser,
  logout,
};
