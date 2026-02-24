import prisma from '@/config/prisma';
import { Prisma } from '@prisma/generated/client';

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

export const PostServices = {
  createPost,
};
