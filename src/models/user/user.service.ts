import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma.db';
import { IUser } from './user.interfaces';

const createUser = async (payload: Prisma.UserCreateInput) => {
  const user = await prisma.user.create({ data: payload });
  return user;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const userService = {
  createUser,
};
