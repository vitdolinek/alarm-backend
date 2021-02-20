import { Router } from "express";
import asyncHandler from "express-async-handler";
import { createAttackLog, getLog } from "../controller/Attack";

const attackRouter = Router();

attackRouter.post("/", asyncHandler(createAttackLog));
attackRouter.get("/:market/:playerId", asyncHandler(getLog));

export default attackRouter;
