import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateActivity1640636040831 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "activity",
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
            name: "max_hours",
            type: "integer",
          },
          {
            name: "min_hours",
            type: "integer",
          },
          {
            name: "chart_id",
            type: "uuid",
          },
          {
            name: "category_id",
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
            name: "FKChartActivity",
            referencedTableName: "chart",
            referencedColumnNames: ["id"],
            columnNames: ["chart_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKCategoryActivity",
            referencedTableName: "activity_category",
            referencedColumnNames: ["id"],
            columnNames: ["category_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("activity");
  }
}
