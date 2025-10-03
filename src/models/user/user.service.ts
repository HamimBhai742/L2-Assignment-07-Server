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

const getAbout = async () => {
  const user = await prisma.user.findFirst({
    select: {
      name: true,
      email: true,
      phone: true,
      address: true,
      picture: true,
      bio: true,
      githubUrl: true,
      linkedInUrl: true,
      facebookUrl: true,
      profession: true,
      skills: true,
      website: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
};

const getUser = async () => {
  const user = await prisma.user.findFirst({
    select: {
      name: true,
      picture: true,
      profession: true,
      skills: true,
      bio: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
};

export const userService = {
  updateProfile,
  getMyProfile,
  getAbout,
  getUser,
};
