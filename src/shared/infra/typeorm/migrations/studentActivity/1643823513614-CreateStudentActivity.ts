import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStudentActivity1643823513614 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "student_activity",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "hours",
            type: "integer",
          },
          {
            name: "semester",
            type: "varchar",
          },
          {
            name: "is_certified",
            type: "boolean",
          },
          {
            name: "justification",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "approved_hours",
            type: "integer",
            isNullable: true,
          },
          {
            name: "file",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "activity_id",
            type: "uuid",
          },
          {
            name: "is_active",
            type: "boolean",
            default: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKUserStudentActivity",
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKActivityStudentActivity",
            referencedTableName: "activity",
            referencedColumnNames: ["id"],
            columnNames: ["activity_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("student_activity");
  }
}
