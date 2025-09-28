import 'dotenv/config';
export const env = {
  SERVER_PORT: Number(process.env.SERVER_PORT),
  BCRYPTJS_SALT: Number(process.env.BCRYPTJS_SALT),
  ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
};
