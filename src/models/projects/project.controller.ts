import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/craete.async.fn';
import { projectServices } from './project.service';
import { sendResponse } from '../../utils/send.response';
import httpStatusCode from 'http-status-codes';
import { excludeFiled } from '../../utils/constain';
import { JwtPayload } from 'jsonwebtoken';

const createNewProject = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const project = await projectServices.createNewProject(req.body);
    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  }
);

const getAllProjects = createAsyncFn(
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

    const data = await projectServices.getAllProjects(
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
      data: data.projects,
      metaData: data.metadata,
    });
  }
);

const getMyProjects = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const projects = await projectServices.getMyProjects(userId);
    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Projects fetched successfully',
      data: projects,
    });
  }
);

export const projectController = {
  createNewProject,
  getAllProjects,
getMyProjects
};
