import { Router } from "express";
import asyncHandler from "express-async-handler";
import { createAttackLog } from "../controller/Attack";

const attackRouter = Router();

attackRouter.post("/", asyncHandler(createAttackLog));

export default attackRouter;
