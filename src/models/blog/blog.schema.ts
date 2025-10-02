import { z } from 'zod';

// Create Blog Schema
export const createBlogSchema = z.object({
  title: z.string().min(1, 'Title must be at least 10 characters'),
  thumbnail: z.url('Thumbnail must be a valid URL'),
  description: z
    .string()
    .min(1, 'Description must be at least 100 characters'),
  tags: z.array(z.string()).nonempty('At least one tag is required'),
  userId: z.number().int().positive('User ID must be a positive integer'),
  category: z.enum([
    'Technology',
    'Web_Development',
    'Programming',
    'Lifestyle',
    'Travel',
    'Photography',
    'Food',
    'Education',
    'Business',
    'Other',
  ]),
  content: z.string().min(1, 'Content must be at least 100 characters'),
  status: z.enum(['draft', 'published']).default('published'),
});

// Update Blog Schema
export const updateBlogSchema = z.object({
  title: z.string().min(1, 'Title must be at least 10 characters').optional(),
  thumbnail: z.url('Thumbnail must be a valid URL').optional(),
  description: z
    .string()
    .min(1, 'Description must be at least 100 characters')
    .optional(),
  tags: z.array(z.string()).optional(),
  category: z
    .enum([
      'Technology',
      'Web_Development',
      'Programming',
      'Lifestyle',
      'Travel',
      'Photography',
      'Food',
      'Education',
      'Business',
      'Other',
    ])
    .optional(),
  content: z.string().min(1, 'Content must be at least 100 characters').optional(),
});
