import { NextFunction, Request, Response } from 'express';
import { AppError } from '../error/coustom.error';
import httpStatusCode from 'http-status-codes';
import { env } from '../config/env';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../config/prisma.db';
export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization || req.cookies.accessToken;
      if (!token) {
        throw new AppError(
          'Access denied. No token provided.',
          httpStatusCode.NOT_ACCEPTABLE
        );
      }
      const verifyUser = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
      if (!verifyUser) {
        throw new AppError('Unauthorized Access', httpStatusCode.UNAUTHORIZED);
      }

      if (!authRoles.includes(verifyUser.role)) {
        throw new AppError(
          'You are not authorized',
          httpStatusCode.UNAUTHORIZED
        );
      }

      if (verifyUser.role !== 'ADMIN') {
        throw new AppError(
          'You are not authorized',
          httpStatusCode.UNAUTHORIZED
        );
      }

      req.user = verifyUser;
      next();
    } catch (error) {
      next(error);
    }
  };
