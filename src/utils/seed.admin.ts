import { Role } from '@prisma/client';
import { env } from '../config/env';
import { prisma } from '../config/prisma.db';
import bcryptjs from 'bcryptjs';
export const seedAdmin = async () => {
  try {
    const email = env.ADMIN_EMAIL;
    const admin = await prisma.user.findUnique({
      where: { email },
    });
    if(admin){
      console.log('Admin already exists');
      return
    }

    const password = env.ADMIN_PASSWORD;
    const hashedPassword = await bcryptjs.hash(password, env.BCRYPTJS_SALT);
    const payload={
      name:"Hamim",
      email,
      password:hashedPassword,
      role:Role.ADMIN,
      picture:"https://ibb.co.com/qLjHSvDX"
    }
    const user = await prisma.user.create({
      data:payload
    });
    console.log('Admin created successfully', user);
  } catch (error) {
    console.log(error)
  }
};
