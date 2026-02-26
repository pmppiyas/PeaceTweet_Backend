import prisma from '@/config/prisma';

const toggleLike = async (
  userId: string,
  targetId: string,
  type: 'POST' | 'COMMENT'
) => {
  const whereCondition =
    type === 'POST'
      ? {
          userId_postId: {
            userId: userId,
            postId: targetId,
          },
        }
      : {
          userId_commentId: {
            userId: userId,
            commentId: targetId,
          },
        };

  const isExist = await prisma.like.findUnique({
    where: whereCondition,
  });

  if (isExist) {
    await prisma.like.delete({
      where: whereCondition,
    });
    return { isLike: false, message: 'Like removed' };
  } else {
    const data =
      type === 'POST'
        ? { userId, postId: targetId }
        : {
            userId,
            commentId: targetId,
          };
    await prisma.like.create({
      data,
    });
    return { isLiked: true, message: 'Liked successfully' };
  }
};

export const LikeServices = {
  toggleLike,
};
