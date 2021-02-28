import { EntityRepository, Repository } from "typeorm";
import { ConnectedAccount } from "../entity/ConnectedAccount";
import { User } from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByEmail(email: string) {
    return this.createQueryBuilder("user")
      .leftJoinAndSelect("user.connectedAccounts", "connectedAccounts")
      .where("user.email = :email", { email })
      .getOne();
  }
}
