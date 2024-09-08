import { type NextFunction, Response } from 'express';
import mongoose from 'mongoose';

export const handleError = (error: unknown, res: Response, next: NextFunction) => {
  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json(error);
  }

  return next(error);
};
