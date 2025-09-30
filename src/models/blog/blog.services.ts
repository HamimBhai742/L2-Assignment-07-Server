import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma.db';

const createBlog = async (payload: Prisma.BlogCreateInput) => {
  const blog = await prisma.blog.create({
    data: payload,
  });
  return blog;
};

const getAllBlogs = async (
  filter: any,
  page: number,
  limit: number,
  search: string,
  sortBy: string,
  sortOrder: 'asc' | 'desc'
) => {
  const where: any = {
    AND: [
      search && {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
      filter && filter,
    ].filter(Boolean),
  };
  const blogs = await prisma.blog.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.blog.count({
    where,
  });

  return {
    blogs,
    metadata: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getMyBlogs = async (
  userId: number,
  filter: any,
  page: number,
  limit: number,
  search: string,
  sortBy: string,
  sortOrder: 'asc' | 'desc'
) => {
  const where: any = {
    AND: [
      { userId },
      search && {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
      filter && filter,
    ].filter(Boolean),
  };

  const myBlogs = await prisma.blog.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.project.count({
    where,
  });

  return {
    myBlogs,
    metadata: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const updateBlog = async (id: number, payload: Prisma.BlogUpdateInput) => {
  const blog = await prisma.blog.update({
    where: {
      id,
    },
    data: payload,
  });
  return blog;
};

const deleteBlog = async (id: number) => {
  const blog = await prisma.blog.delete({
    where: {
      id,
    },
  });
  return blog;
};



export const blogServices = {
  createBlog,
  getAllBlogs,
  getMyBlogs,
  updateBlog,
  deleteBlog,
};
