import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateHistoricStudentActivity1643931605080
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "historic_student_activity",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "action",
            type: "varchar",
          },
          {
            name: "field",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "before",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "later",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "student_activity_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKUserHistoricStudentActivity",
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKStudentActivityHistoricStudentActivity",
            referencedTableName: "student_activity",
            referencedColumnNames: ["id"],
            columnNames: ["student_activity_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("historic_student_activity");
  }
}
