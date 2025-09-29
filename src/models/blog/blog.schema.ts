import { z } from 'zod';

// Create Blog Schema
export const createBlogSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  thumbnail: z.url('Thumbnail must be a valid URL'),
  description: z
    .string()
    .min(100, 'Description must be at least 100 characters'),
  tags: z.array(z.string()).nonempty('At least one tag is required'),
  userId: z.number().int().positive('User ID must be a positive integer'),
  category: z.enum([
    'TECHNOLOGY',
    'PROGRAMMING',
    'LIFESTYLE',
    'TRAVEL',
    'FOOD',
    'EDUCATION',
    'BUSINESS',
  ]),
});

// Update Blog Schema
export const updateBlogSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').optional(),
  thumbnail: z.url('Thumbnail must be a valid URL').optional(),
  description: z
    .string()
    .min(10, 'Description must be at least 100 characters')
    .optional(),
  tags: z.array(z.string()).optional(),
  category: z
    .enum([
      'TECHNOLOGY',
      'PROGRAMMING',
      'LIFESTYLE',
      'TRAVEL',
      'FOOD',
      'EDUCATION',
      'BUSINESS',
    ])
    .optional(),
});
