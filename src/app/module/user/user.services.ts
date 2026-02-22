import { CreateUserPayload } from '@/module/auth/auth.interface';

const updateUser = async (payload: Partial<CreateUserPayload>) => {
  return payload;
};

export const UserServices = {
  updateUser,
};
