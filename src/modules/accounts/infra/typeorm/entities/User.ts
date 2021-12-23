import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("user")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  identifier: string;

  @Column({ name: "access_level" })
  accessLevel: string;

  @Column({ name: "is_active" })
  isActive: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }

  avatarUrl(): string {
    const avatar = this.avatar ?? "default_avatar.png";

    switch (process.env.DISK) {
      case "local":
        return `${process.env.API_URL}/avatar/${avatar}`;
      case "s3":
        return `${process.env.AWS_BUCKET_URL}/avatar/${avatar}`;
      default:
        return null;
    }
  }
}

export { User };
