import { ENV } from '@/config/env';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyToken = (token: string) => {
  return jwt.verify(token, ENV.JWT.SECRET) as JwtPayload;
};
