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

@Entity("course")
class Course {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: "number_periods" })
  numberPeriods: number;

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

export { Course };
