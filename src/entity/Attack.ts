import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attack {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "int" })
  movementId: number;

  @Column({ type: "varchar" })
  market: string;

  @Column({ type: "int" })
  playerId: number;

  @Column({ type: "varchar" })
  attacker: string;

  @Column({ type: "varchar" })
  city: string;

  @Column({ type: "varchar" })
  time: string;
}
