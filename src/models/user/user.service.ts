import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma.db';

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
};
