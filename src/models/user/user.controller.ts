import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/craete.async.fn';
import { userService } from './user.service';
import { sendResponse } from '../../utils/send.response';
import httpStatusCode from 'http-status-codes';

const createUser = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.createUser(req.body);
    sendResponse(res, {
      statusCode: httpStatusCode.CREATED,
      success: true,
      message: 'User created successfully',
      data: user,
    });
  }
);

export const userController = {
  createUser,
};
