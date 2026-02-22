import { AppError } from '@/utils/appError';
import { verifyToken } from '@/utils/verifyToken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const checkAuth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken =
        req.headers.authorization?.split(' ')[1] || req.cookies['accessToken'];

      if (!accessToken) {
        throw new AppError(
          StatusCodes.UNAUTHORIZED,
          'Unauthorized: No access token provided'
        );
      }

      const decoded = verifyToken(accessToken);

      console.log('Decoded token:', decoded);
    } catch (error) {
      next(error);
    }
  };
};
