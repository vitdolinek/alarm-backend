import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { getPlayerForTownId } from "../controller/Town";

const townRouter = Router();

townRouter.get(
  "/:market/:townId/player",
  expressAsyncHandler(getPlayerForTownId)
);

export default townRouter;
