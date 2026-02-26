import { IJwtPayload } from '@/interfaces';
import { CommentServices } from '@/module/comment/comment.services';
import catchAsync from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const addComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await CommentServices.addComment(
      req.user as IJwtPayload,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Comment added successfully',
      data: result,
    });
  }
);

const deleteComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await CommentServices.deleteComment(
      req.user as IJwtPayload,
      req.params.id as string
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Comment added successfully',
      data: result,
    });
  }
);

const editComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await CommentServices.editComment(
      req.user as IJwtPayload,
      req.params.id as string,
      req.body.content as string
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Comment added successfully',
      data: result,
    });
  }
);

export const CommentController = {
  addComment,
  deleteComment,
  editComment,
};
