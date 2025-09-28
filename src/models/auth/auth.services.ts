import { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../../config/prisma.db';
const getMe = async () => {
  const user = await prisma.user.findUnique({
    where: { id: 1 },
    select: { name: true, picture: true },
  });
  return user;
};

export const authServices = {
  getMe,
};
