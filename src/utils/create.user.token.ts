import { Prisma } from '@prisma/client';
import { Iuser } from '../types/user.types';
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';
export const createUserToken = (user: Partial<Iuser>) => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  } as SignOptions);
  
  return {
    accessToken: token,
  };
};
