import prisma from '@/config/prisma';
import { IPostQuery } from '@/module/post/post.interface';
import { AppError } from '@/utils/appError';
import { Prisma } from '@prisma/generated/client';
import { StatusCodes } from 'http-status-codes';
import { ta } from 'zod/locales';

const createPost = async (postData: Prisma.PostCreateInput, userId: string) => {
  const tagConnectOrCreate =
    postData.tags?.map((tag: string) => ({
      where: { name: tag },
      create: { name: tag },
    })) ?? [];

  const result = await prisma.post.create({
    data: {
      header: postData.header,
      content: postData.content,
      user: {
        connect: { id: userId },
      },
      tags: {
        connectOrCreate: tagConnectOrCreate,
      },
    },
    include: {
      tags: true,
    },
  });

  return result;
};

const allPosts = async (query: IPostQuery) => {
  const { tags, search } = query;

  const andConditions: Prisma.PostWhereInput[] = [];

  if (search) {
    andConditions.push({
      OR: [
        { header: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        {
          user: {
            profile: {
              firstName: { contains: search, mode: 'insensitive' },
            },
          },
        },
      ],
    });
  }

  if (tags && tags.length > 0) {
    andConditions.push({
      tags: {
        some: {
          name: {
            in: tags,
            mode: 'insensitive',
          },
        },
      },
    });
  }

  const whereCondition: Prisma.PostWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const posts = await prisma.post.findMany({
    where: whereCondition,
    include: {
      tags: true,
      user: {
        select: {
          id: true,
          username: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
              profilePicture: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return posts;
};

const myPosts = async (userId: string) => {
  const posts = await prisma.post.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return posts;
};

const getPostByUserName = async (username: string) => {
  const isExist = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!isExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const posts = await prisma.post.findMany({
    where: {
      user: {
        username,
      },
    },
  });

  return posts;
};

export const PostServices = {
  createPost,
  myPosts,
  allPosts,
  getPostByUserName,
};
