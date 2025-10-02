import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma.db';
import { generateUniqueSlug } from '../../utils/generate.unique.slug';

const createBlog = async (payload: Prisma.BlogCreateInput) => {
  const slug = await generateUniqueSlug(payload.title);
  payload.slug = slug;
  console.log(slug);
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
      { status: 'published' },
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

const getBlog = async (slug: string) => {
  return await prisma.$transaction(async (tx) => {
    await tx.blog.update({
      where: {
        slug,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    return await tx.blog.findUnique({
      where: {
        slug,
      },
    });
  });
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

  const total = await prisma.blog.count({
    where,
  });
  console.log(myBlogs);
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

const getMyBlog = async (id: number, userId: number) => {
  const myBlog = await prisma.blog.findUnique({
    where: {
      id,
      userId,
    },
  });
  return myBlog;
};

const updateBlog = async (id: number, payload: Prisma.BlogUpdateInput) => {
  if (payload?.title) {
    const slug = await generateUniqueSlug(payload.title as string);
    payload.slug = slug;
  }
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
  getBlog,
  getMyBlogs,
  getMyBlog,
  updateBlog,
  deleteBlog,
};
