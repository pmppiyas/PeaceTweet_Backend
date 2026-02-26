import { LikeServices } from '@/module/like/like.services';
import catchAsync from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const toggleLike = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { targetId, type } = req.body;

    const result = await LikeServices.toggleLike(
      req.user?.userId,
      targetId,
      type
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Like toggle successfully',
      data: result,
    });
  }
);

export const LikeController = {
  toggleLike,
};
