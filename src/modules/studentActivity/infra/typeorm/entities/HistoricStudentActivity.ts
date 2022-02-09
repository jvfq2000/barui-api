import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "@modules/account/infra/typeorm/entities/User";

import { StudentActivity } from "./StudentActivity";

@Entity("historic_student_activity")
class HistoricStudentActivity {
  @PrimaryColumn()
  id: string;

  @Column()
  action: string;

  @Column()
  field: string;

  @Column()
  before: string;

  @Column()
  later: string;

  @Column({ name: "user_id" })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "student_activity_id" })
  studentActivityId: string;

  @ManyToOne(() => StudentActivity)
  @JoinColumn({ name: "student_activity_id" })
  studentActivity: StudentActivity;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { HistoricStudentActivity };
