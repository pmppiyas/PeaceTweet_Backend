import prisma from '@/config/prisma';
import { IJwtPayload } from '@/interfaces';
import { AppError } from '@/utils/appError';
import { Profile } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const updateUser = async (payload: Partial<Profile>, user: IJwtPayload) => {
  const userRecord = await prisma.user.findUnique({
    where: {
      id: user.userId,
      username: user.username,
    },
    select: {
      profile: true,
    },
  });

  if (!userRecord) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User not found');
  }

  const updatedData = { ...payload };

  if (updatedData.firstName)
    updatedData.firstName = updatedData.firstName.trim();
  if (updatedData.lastName) updatedData.lastName = updatedData.lastName.trim();

  const updatedUser = await prisma.user.update({
    where: {
      username: user.username,
    },
    data: {
      profile: {
        update: {
          ...updatedData,
        },
      },
    },
    select: {
      profile: true,
    },
  });

  return updatedUser;
};

export const UserServices = {
  updateUser,
};
