import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma.db';

const createNewProject = async (payload: Prisma.ProjectCreateInput) => {
  const projects = await prisma.project.create({
    data: payload,
  });
  return projects;
};

//get for all
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

//get my projects
const getMyProjects = async (userId: number) => {
  const projects = await prisma.project.findMany({
    where: {
      userId,
    },
  });
  return projects;
}

const updateProject = async (id: number, payload: Prisma.ProjectUpdateInput) => {
  const projects = await prisma.project.update({
    where: {
      id,
    },
    data: payload,
  });
  return projects;
};

const deleteProject = async (id: number) => {
  const projects = await prisma.project.delete({
    where: {
      id,
    },
  });
  return projects;
};

export const projectServices = {
  createNewProject,
  getAllProjects,
  getMyProjects,
  updateProject,
  deleteProject,
};
