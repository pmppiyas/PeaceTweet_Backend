import { Prisma } from '@prisma/client';

const createUser = async (payload: Prisma.$UserPayload) => {
  return 'Ok';
};

export const AuthServices = {
  createUser,
};
