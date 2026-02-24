import prisma from '@/config/prisma';
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

      req.user = { ...decoded } as { userId: string; username: string };

      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: { id: true, username: true },
      });

      if (!user) {
        throw new AppError(
          StatusCodes.UNAUTHORIZED,
          'Unauthorized: Invalid token'
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
