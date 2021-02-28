import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ConnectedAccount } from "./ConnectedAccount";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar", nullable: true })
  token: string;

  @Column({ type: "varchar" })
  code: string;

  @OneToMany(
    () => ConnectedAccount,
    (connectedAccount) => connectedAccount.user
  )
  connectedAccounts: Array<ConnectedAccount>;
}
