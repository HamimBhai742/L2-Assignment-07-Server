import { NextFunction, Request, Response } from "express";
import { createAsyncFn } from "../../utils/craete.async.fn";
import { userService } from "./user.service";

const createUser=createAsyncFn(async (req:Request, res:Response, next:NextFunction) => {
  const user = await userService.createUser(req.body);
  res.send(user);
});