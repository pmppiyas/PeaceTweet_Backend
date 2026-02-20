import { Prisma } from '@prisma/client';

const createUser = async (payload: Prisma.UserCreateInput) => {
  console.log(payload);
  return 'Ok';
};

export const AuthServices = {
  createUser,
};
