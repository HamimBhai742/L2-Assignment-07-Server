export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: string;
  picture?: string;
  createdAt?: Date;
  updatedAt?: Date;
}