import { PostServices } from '@/module/post/post.services';
import catchAsync from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PostServices.createPost(
      req.body,
      req?.user?.userId as string
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Post created successfully',
      data: result,
    });
  }
);

const allPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PostServices.allPosts(req.query);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'All posts retrieved successfully',
      data: result,
    });
  }
);

const myPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PostServices.myPosts(req.user?.userId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'My posts retrieved successfully',
      data: result,
    });
  }
);

const getPostByUserName = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PostServices.getPostByUserName(
      req.params.username as string
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Posts retrieved by username successfully',
      data: result,
    });
  }
);

export const PostController = {
  createPost,
  myPosts,
  allPosts,
  getPostByUserName,
};
