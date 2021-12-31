import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Institution } from "./Institution";

@Entity("activity_category")
class ActivityCategory {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: "institution_id" })
  institutionId: string;

  @ManyToOne(() => Institution)
  @JoinColumn({ name: "institution_id" })
  institution: Institution;

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

export { ActivityCategory };
