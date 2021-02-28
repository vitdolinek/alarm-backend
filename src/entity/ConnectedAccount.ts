import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class ConnectedAccount {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.connectedAccounts)
  user: User;

  @Column({ type: "int" })
  playerId: number;

  @Column({ type: "varchar" })
  playerName: string;

  @Column({ type: "varchar" })
  verificationCode: string;

  @Column({ type: "boolean" })
  verified: boolean;
}
