import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/craete.async.fn';
import { JwtPayload } from 'jsonwebtoken';
import { userService } from './user.service';
import { sendResponse } from '../../utils/send.response';
import httpStatusCode from 'http-status-codes';

const getMyProfile = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const profile = await userService.getMyProfile(userId);
    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Profile fetched successfully',
      data: profile,
    });
  }
)

const updateProfile = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const payload = req.body;
    const profile = await userService.updateProfile(userId, payload);
    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Profile updated successfully',
      data: profile,
    });
  }
);

export const userController = {
  updateProfile,
  getMyProfile,
};
