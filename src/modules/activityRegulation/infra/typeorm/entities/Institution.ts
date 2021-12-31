import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { City } from "@modules/territory/infra/typeorm/entities/City";

@Entity("institution")
class Institution {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: "city_id" })
  cityId: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: "city_id" })
  city: City;

  @Column({ name: "is_active" })
  isActive: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Institution };
