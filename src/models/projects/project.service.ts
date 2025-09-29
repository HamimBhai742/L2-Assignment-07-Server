import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma.db';

const createNewProject = async (payload: Prisma.ProjectCreateInput) => {
  const projects = await prisma.project.create({
    data: payload,
  });
  return projects;
};

export const projectServices = {
  createNewProject,
};
