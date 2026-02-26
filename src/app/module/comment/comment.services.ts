import prisma from '@/config/prisma';
import { IJwtPayload } from '@/interfaces';
import { ICommentPayload } from '@/module/comment/comment.interface';
import { AppError } from '@/utils/appError';
import { StatusCodes } from 'http-status-codes';

const addComment = async (user: IJwtPayload, payload: ICommentPayload) => {
  const userExist = await prisma.user.findUnique({
    where: {
      id: user.userId,
      username: user.username,
    },
  });

  if (!userExist) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User not found');
  }

  const postExist = await prisma.post.findUnique({
    where: {
      id: payload.postId,
    },
  });

  if (!postExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Post not found');
  }

  return await prisma.comment.create({
    data: {
      content: payload.content,
      postId: payload.postId,
      userId: user.userId,
    },
  });
};

export const CommentServices = {
  addComment,
};
