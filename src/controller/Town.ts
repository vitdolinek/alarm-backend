import { Request, Response } from "express";
import { townIdToPlayer } from "../utils/Towns";

export const getPlayerForTownId = async (
  { params }: Request,
  response: Response
) => {
  const player = await townIdToPlayer(params.townId, params.market);

  response.status(200).send(player);
};
