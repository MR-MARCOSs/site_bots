import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import { ApiError } from '../helpers/api-errors';

export const errorMiddleware: ErrorRequestHandler = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : 'Internal Server Error';
  res.status(statusCode).json({ message });
  return
};
