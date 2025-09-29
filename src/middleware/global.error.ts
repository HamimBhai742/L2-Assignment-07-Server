import { NextFunction, Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';
export const globalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  const errSource: any = [];
  console.log(err.name);

  if (err.name === 'PrismaClientValidationError') {
    statusCode = httpStatusCode.BAD_REQUEST;
    message = 'Prisma Client Validation Error';

    const fieldMatch = err.message.match(/Argument `(.*?)` is missing/);
    if (fieldMatch) {
      errSource.push({
        path: fieldMatch[1],
        message: `The field "${fieldMatch[1]}" is required.`,
      });
    } else {
      errSource.push({
        path: null,
        message: err.message,
      });
    }
  }

  if (err.name === 'ZodError') {
    statusCode = httpStatusCode.BAD_REQUEST;
    message = 'Zod Validation Error';

    err.issues.forEach((issue: any) => {
      errSource.push({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      });
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    errSource,
  });
};
