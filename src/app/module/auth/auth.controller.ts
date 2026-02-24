import { AuthServices } from '@/module/auth/auth.services';
import catchAsync from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthServices.createUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'User created successfully',
      data: result,
    });
  }
);

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthServices.credentialsLogin(
      req.body.providerId,
      req.body.password
    );

    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie('refreshToken', result.resfreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'User logged in successfully',
      data: result,
    });
  }
);

export const AuthController = {
  createUser,
  credentialsLogin,
};
