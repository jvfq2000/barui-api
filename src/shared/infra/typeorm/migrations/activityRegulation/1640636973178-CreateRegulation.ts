import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRegulation1640636973178 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "regulation",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "file",
            type: "varchar",
          },
          {
            name: "year",
            type: "integer",
          },
          {
            name: "course_id",
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
            name: "FKCourseRegulation",
            referencedTableName: "course",
            referencedColumnNames: ["id"],
            columnNames: ["course_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("regulation");
  }
}
