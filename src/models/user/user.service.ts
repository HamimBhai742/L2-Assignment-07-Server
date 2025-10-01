import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma.db';

const getMyProfile = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

const updateProfile = async (id: number, payload: Prisma.UserUpdateInput) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return user;
};

export const userService = {
  updateProfile,
  getMyProfile,
};
