import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma.db';
import bcryptjs from 'bcryptjs';
import { env } from '../../config/env';
import { AppError } from '../../error/coustom.error';
import httpStatusCode from 'http-status-codes';
const createUser = async (payload: Prisma.UserCreateInput) => {
  if (!payload) {
    throw new AppError(
      'Create user data is required',
      httpStatusCode.BAD_REQUEST
    );
  }
  const { password, ...reset } = payload;
  const hashedPassword = await bcryptjs.hash(password, env.BCRYPTJS_SALT);
  const user = await prisma.user.create({
    data: {
      ...reset,
      password: hashedPassword,
    },
  });
  return user;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const userService = {
  createUser,
};
