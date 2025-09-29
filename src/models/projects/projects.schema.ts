import { z } from 'zod';

export const createProjectSchema = z.object({
  userId: z.number(),
  title: z.string(),
  thumbnail: z.url(),
  description: z.string(),
  technologies: z.array(z.string()),
  status: z.enum(['completed', 'in_progress', 'planned']),
  githubUrl: z.url(),
  liveUrl: z.url(),
  category: z.enum(['web', 'api', 'mobile', 'other']),
  startDate: z.string(),
  endDate: z.string().optional(),
});
