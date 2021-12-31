import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCourse1640635133585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "course",
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
            name: "number_periods",
            type: "integer",
          },
          {
            name: "institution_id",
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
            name: "FKInstitutionCourse",
            referencedTableName: "institution",
            referencedColumnNames: ["id"],
            columnNames: ["institution_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("course");
  }
}
