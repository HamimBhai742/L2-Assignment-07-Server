import { z } from 'zod';

export const createProjectSchema = z.object({
  userId: z.number(),
  title: z.string(),
  thumbnail: z.url(),
  description: z
    .string()
    .min(200, { message: 'Description must be at least 200 characters' }),
  features: z.string(),
  technologies: z.array(z.string()),
  status: z.enum(['completed', 'in_progress', 'planned']),
  githubUrl: z.url().optional(),
  liveUrl: z.url().optional(),
  category: z.enum(['web', 'api', 'mobile', 'other']),
  startDate: z.string(),
  endDate: z.string().optional(),
});

export const updateProjectSchema = z.object({
  title: z.string().optional(),
  thumbnail: z.url().optional(),
  description: z
    .string()
    .min(200, { message: 'Description must be at least 200 characters' })
    .optional(),
  technologies: z.array(z.string()).optional(),
  features: z.string().optional(),
  status: z.enum(['completed', 'in_progress', 'planned']).optional(),
  githubUrl: z.url().optional(),
  liveUrl: z.url().optional(),
  category: z.enum(['web', 'api', 'mobile', 'other']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
