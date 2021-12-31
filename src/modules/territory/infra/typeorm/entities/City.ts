import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "./State";

@Entity("city")
class City {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: "state_id" })
  stateId: string;

  @ManyToOne(() => State)
  @JoinColumn({ name: "state_id" })
  state: State;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { City };
