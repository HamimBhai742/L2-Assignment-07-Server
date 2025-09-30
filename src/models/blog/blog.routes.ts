import { Router } from 'express';
import { blogController } from './blog.controller';
import { checkAuth } from '../../middleware/jwt.verify';
import { validateRequest } from '../../middleware/validation.sachem';
import { createBlogSchema, updateBlogSchema } from './blog.schema';

const router = Router();

router.post(
  '/create',
  checkAuth('ADMIN'),
  validateRequest(createBlogSchema),
  blogController.createBlog
);
router.get('/', blogController.getAllBlogs);
router.get('/my-blogs', checkAuth('ADMIN'), blogController.getMyBlogs);
router.put(
  '/update/:id',
  checkAuth('ADMIN'),
  validateRequest(updateBlogSchema),
  blogController.updateBlog
);

router.delete(
  '/delete/:id',
  checkAuth('ADMIN'),
  blogController.deleteBlog
);

export const blogRouter = router;
