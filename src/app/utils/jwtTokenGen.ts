import { ENV } from '@/config/env';
import jwt from 'jsonwebtoken';

export const jwtTokenGen = (payload: { userId: string; username: string }) => {
  const { userId, username } = payload;
  const accessToken = jwt.sign(
    {
      userId,
      username,
    },
    ENV.JWT.SECRET as string,
    {
      algorithm: 'HS256',
      expiresIn: ENV.JWT.ACCESS_EXPIRES_IN,
    }
  );

  const resfreshToken = jwt.sign(
    {
      userId,
      username,
    },
    ENV.JWT.SECRET as string,
    {
      algorithm: 'HS256',
      expiresIn: ENV.JWT.REFRESH_EXPIRES_IN,
    }
  );

  return {
    accessToken,
    resfreshToken,
  };
};
