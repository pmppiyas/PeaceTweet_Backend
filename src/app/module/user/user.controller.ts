import { IJwtPayload } from '@/interfaces';
import { UserServices } from '@/module/user/user.services';
import catchAsync from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.updateUser(
      req.body,
      req.user as IJwtPayload
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'User updated successfully',
      data: result,
    });
  }
);

export const UserController = {
  updateUser,
};
