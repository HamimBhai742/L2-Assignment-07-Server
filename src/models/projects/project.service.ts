import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma.db';

const createNewProject = async (payload: Prisma.ProjectCreateInput) => {
  const projects = await prisma.project.create({
    data: payload,
  });
  return projects;
};

const getAllProjects = async (
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
  const projects = await prisma.project.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.project.count({
    where,
  });
  return {
    projects,
    metadata: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const projectServices = {
  createNewProject,
  getAllProjects,
};
