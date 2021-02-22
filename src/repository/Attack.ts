import { EntityRepository, Repository } from "typeorm";
import { Attack } from "../entity/Attack";

@EntityRepository(Attack)
export class AttackRepository extends Repository<Attack> {
  findByIdAndMarket = (id: number, market: string) => {
    return this.find({
      where: { playerId: id, market },
      order: { time: "DESC" },
    });
  };
}
