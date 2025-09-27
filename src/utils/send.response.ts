import { Response } from 'express';

interface IMetadata {
  total: number;
}
interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  metaData?: IMetadata;
}
export const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  res.status(data.statusCode).json({
    success: true,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    metaData: data.metaData,
  });
};
