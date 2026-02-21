import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env').toString() });

export const ENV = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDE_NAME,
    API_KEY: process.env.CLOUDE_API_KEY,
    API_SECRET: process.env.CLOUDE_API_SECRET,
  },
  BCRYPT_SALT: process.env.SALT as string,
};
