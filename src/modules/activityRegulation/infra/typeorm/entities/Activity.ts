import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { ActivityCategory } from "./ActivityCategory";
import { Chart } from "./Chart";

@Entity("activity")
class Activity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: "max_hours" })
  maxHours: number;

  @Column({ name: "min_hours" })
  minHours: number;

  @Column({ name: "chart_id" })
  chartId: string;

  @ManyToOne(() => Chart)
  @JoinColumn({ name: "chart_id" })
  chart: Chart;

  @Column({ name: "category_id" })
  categoryId: string;

  @ManyToOne(() => ActivityCategory)
  @JoinColumn({ name: "category_id" })
  category: ActivityCategory;

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

export { Activity };
