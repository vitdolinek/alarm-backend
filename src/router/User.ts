import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { UserController } from "../controller/User";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/signup", expressAsyncHandler(userController.create));
userRouter.post("/login", expressAsyncHandler(userController.login));
userRouter.put("/token", expressAsyncHandler(userController.setToken));

export default userRouter;
