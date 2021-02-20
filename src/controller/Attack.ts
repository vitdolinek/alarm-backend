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
      time: body.time,
    });

    response.status(201).send();
  } catch (e) {
    response.status(400).send({ error: e });
  }
};
