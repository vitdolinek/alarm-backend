import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AttackRepository } from "../repository/Attack";

export const createAttackLog = async (
  { body }: Request,
  response: Response
) => {
  const attackRepository = getCustomRepository(AttackRepository);

  try {
    await attackRepository.save({
      attacker: body.attacker,
      city: body.city,
      market: body.market,
      playerId: body.playerId,
      movementId: body.movementId,
      timezone: body.timezone,
      time: body.time,
    });

    response.status(201).send();
  } catch (e) {
    response.status(400).send({ error: e });
  }
};

export const getLog = async ({ params }: Request, response: Response) => {
  const attackRepository = getCustomRepository(AttackRepository);

  try {
    const log = await attackRepository.findByIdAndMarket(
      parseInt(params.playerId, 10),
      params.market
    );

    response.status(200).json(log);
  } catch (e) {
    response.status(400).send({ error: e });
  }
};
