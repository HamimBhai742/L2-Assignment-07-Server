import { Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';
export const notFound = (req: Request, res: Response) => {
  res.status(httpStatusCode.NOT_FOUND).json({ message: 'Route not found' });
};
