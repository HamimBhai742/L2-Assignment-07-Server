import { Server } from 'http';
import { app } from './app';
import { prisma } from './config/prisma.db';
import { env } from './config/env';

let server: Server;
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};

const startServer = () => {
  try {
    connectDB();
    server = app.listen(env.SERVER_PORT, () => {
      console.log(`Server is running on port ${env.SERVER_PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer()


