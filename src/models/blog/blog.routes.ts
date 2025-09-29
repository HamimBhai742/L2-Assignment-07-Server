import { Router } from 'express';
import { blogController } from './blog.controller';
import { checkAuth } from '../../middleware/jwt.verify';
import { validateRequest } from '../../middleware/validation.sachem';
import { createBlogSchema } from './blog.schema';

const router = Router();

router.post(
  '/create',
  checkAuth('ADMIN'),
  validateRequest(createBlogSchema),
  blogController.createBlog
);
router.get('/', blogController.getAllBlogs);

export const blogRouter = router;
