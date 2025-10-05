import { z } from 'zod';

export const updateUserZodSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  phone: z.string().optional(),
  picture: z.url('Invalid URL').optional(),
  bio: z.string().optional(),
  address: z.string().optional(),
  skills: z.array(z.string()).optional(),
  website: z.url('Invalid website URL').optional(),
  githubUrl: z.url('Invalid GitHub URL').optional(),
  linkedInUrl: z.url('Invalid LinkedIn URL').optional(),
  facebookUrl: z.url('Invalid Facebook URL').optional(),
  profession: z
    .enum([
      'digital_marketer',
      'full_stack_developer',
      'front_end_developer',
      'back_end_developer',
      'mobile_developer',
      'ui_ux_designer',
      'product_designer',
      'data_analyst',
      'data_engineer',
    ])
    .optional(),
    experience: z.string().optional()
});
