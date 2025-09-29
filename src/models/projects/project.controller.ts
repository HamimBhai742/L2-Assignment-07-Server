import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/craete.async.fn';
import { projectServices } from './project.service';
import { sendResponse } from '../../utils/send.response';
import httpStatusCode from 'http-status-codes';

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

export const projectController = {
  createNewProject,
};
