import { ENV } from '@/config/env';
import prisma from '@/config/prisma';
import { CreateUserPayload } from '@/module/auth/auth.interface';
import { generateUserName } from '@/utils/generateUserName';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

const createUser = async (payload: CreateUserPayload) => {
  const userName = generateUserName(
    payload.profile?.firstName || 'user',
    payload.profile?.lastName
  );

  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(ENV.BCRYPT_SALT)
  );

  let email: string | undefined;
  let phoneNumber: string | undefined;

  const { contactInfo, profilePicture, ...restProfile } = payload.profile || {};

  if (contactInfo) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(contactInfo);

    if (isEmail) email = contactInfo;
    else phoneNumber = contactInfo;
  }

  const profileData = restProfile
    ? (Object.fromEntries(
        Object.entries(restProfile).filter(([_, v]) => v !== undefined)
      ) as Prisma.ProfileCreateWithoutUserInput)
    : undefined;

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        username: userName,
        password: hashedPassword,
        profile: profileData
          ? {
              create: {
                ...profileData,
                profilePicture,
                ...(email && { email }),
                ...(phoneNumber && { phoneNumber }),
              },
            }
          : undefined,
        authProviders: {
          create: {
            provider: 'CREDENTIALS',
            providerId: userName,
          },
        },
      },
      select: {
        profile: true,
        username: true,
      },
    });
    return user;
  });

  return result;
};

export const AuthServices = {
  createUser,
};
