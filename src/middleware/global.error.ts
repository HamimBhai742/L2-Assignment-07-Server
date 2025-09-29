import { Prisma } from '@prisma/client';
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

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // P2002 = Unique constraint failed
    if (err.code === 'P2002') {
      statusCode = httpStatusCode.BAD_REQUEST;
      message = `Duplicate value for field(s): ${err.meta?.target}`;
    }

    // P2025 = Record not found
    if (err.code === 'P2025') {
      statusCode = httpStatusCode.NOT_FOUND;
      message = 'Record not found';
    }
  }

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
