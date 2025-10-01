import { prisma } from '../config/prisma.db';

export const generateUniqueSlug = async (title: string) => {
  const baseSlug: string = title.toLowerCase().split(' ').join('-');
  let counter = 0;
  let slug = baseSlug;
  while (await prisma.blog.findUnique({ where: { slug } })) {
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
  return slug;
};
