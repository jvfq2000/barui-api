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
import { Activity } from "@modules/activityRegulation/infra/typeorm/entities/Activity";

@Entity("student_activity")
class StudentActivity {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  hours: number;

  @Column({ name: "is_certified" })
  isCertified: boolean;

  @Column()
  justification: string;

  @Column({ name: "approved_hours" })
  approvedHours: number;

  @Column({ name: "coordinator_visa" })
  coordinatorVisa: boolean;

  @Column()
  file: string;

  @Column({ name: "user_id" })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "activity_id" })
  activityId: string;

  @ManyToOne(() => Activity)
  @JoinColumn({ name: "activity_id" })
  activity: Activity;

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

export { StudentActivity };
