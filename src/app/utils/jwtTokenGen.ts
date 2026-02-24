import { ENV } from '@/config/env';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export const jwtTokenGen = (payload: { userId: string; username: string }) => {
  const { userId, username } = payload;

  const jwtSecret = ENV.JWT.SECRET as Secret;

  const accessOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: ENV.JWT.ACCESS_EXPIRES_IN as SignOptions['expiresIn'],
  };

  const refreshOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: ENV.JWT.REFRESH_EXPIRES_IN as SignOptions['expiresIn'],
  };

  const accessToken = jwt.sign({ userId, username }, jwtSecret, accessOptions);

  const refreshToken = jwt.sign(
    { userId, username },
    jwtSecret,
    refreshOptions
  );

  return {
    accessToken,
    refreshToken,
  };
};
