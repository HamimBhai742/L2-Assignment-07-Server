import z from 'zod';

export const userCreateZodSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(['user', 'admin']),
  picture: z.string().optional(),
  });
