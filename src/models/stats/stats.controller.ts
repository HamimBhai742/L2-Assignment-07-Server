import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/craete.async.fn';
import { statsServices } from './stats.services';
import { sendResponse } from '../../utils/send.response';
import httpStatusCode from 'http-status-codes';
const stats = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await statsServices.stats();
    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Stats fetched successfully',
      data: data,
    });
  }
);
export const statsController = {
  stats,
};
