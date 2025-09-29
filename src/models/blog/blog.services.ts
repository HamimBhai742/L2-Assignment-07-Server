import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma.db';

const createBlog = async (payload: Prisma.BlogCreateInput) => {
  const blog = await prisma.blog.create({
    data: payload,
  });
  return blog;
};

export const blogServices = {
  createBlog,
};
