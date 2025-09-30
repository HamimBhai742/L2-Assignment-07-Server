import 'dotenv/config';
export const env = {
  SERVER_PORT: Number(process.env.SERVER_PORT),
  BCRYPTJS_SALT: Number(process.env.BCRYPTJS_SALT),
  ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
  EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
  NODE_ENV: process.env.NODE_ENV as string,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
};
