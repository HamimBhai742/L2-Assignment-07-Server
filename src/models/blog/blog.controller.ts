import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/craete.async.fn';
import { blogServices } from './blog.services';
import { sendResponse } from '../../utils/send.response';
import httpStatusCode from 'http-status-codes';
import { excludeFiled } from '../../utils/constain';
import { JwtPayload } from 'jsonwebtoken';

const createBlog = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const blog = await blogServices.createBlog(req.body);
    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Blog created successfully',
      data: blog,
    });
  }
);

const getAllBlogs = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'desc';
    const search = req.query.search || '';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const filter = req.query || '';
    for (const f of excludeFiled) {
      delete filter[f];
    }

    const data = await blogServices.getAllBlogs(
      filter,
      page,
      limit,
      search as string,
      sortBy as string,
      sortOrder as 'asc' | 'desc'
    );
    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Blogs fetched successfully',
      data: data.blogs,
      metaData: data.metadata,
    });
  }
);

const getMyBlogs = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'desc';
    const search = req.query.search || '';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const filter = req.query || '';

    for (const f of excludeFiled) {
      delete filter[f];
    }
    const data = await blogServices.getMyBlogs(
      userId,
      filter,
      page,
      limit,
      search as string,
      sortBy as string,
      sortOrder as 'asc' | 'desc'
    );
    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Projects fetched successfully',
      data: data.myBlogs,
      metaData: data.metadata,
    });
  }
);

const updateBlog = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const blog = await blogServices.updateBlog(id, req.body);
    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Blog updated successfully',
      data: blog,
    });
  }
);

const deleteBlog = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const blog = await blogServices.deleteBlog(id);
    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Blog deleted successfully',
      data: blog,
    });
  }
);

export const blogController = {
  createBlog,
  getAllBlogs,
  getMyBlogs,
  updateBlog,
  deleteBlog,
};
