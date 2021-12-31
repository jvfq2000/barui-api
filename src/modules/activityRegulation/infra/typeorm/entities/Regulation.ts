import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Course } from "./Course";

@Entity("regulation")
class Regulation {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  file: string;

  @Column()
  year: number;

  @Column({ name: "course_id" })
  courseId: string;

  @ManyToOne(() => Course)
  @JoinColumn({ name: "course_id" })
  course: Course;

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

export { Regulation };
