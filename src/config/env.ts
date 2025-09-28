import 'dotenv/config';
export const env = {
  SERVER_PORT: Number(process.env.SERVER_PORT),
  BCRYPTJS_SALT: Number(process.env.BCRYPTJS_SALT),
};
