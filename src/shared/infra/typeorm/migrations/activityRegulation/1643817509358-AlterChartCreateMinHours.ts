import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterChartCreateMinHours1643817509358
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "chart",
      new TableColumn({
        name: "min_hours",
        type: "integer",
        default: 120,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("chart", "min_hours");
  }
}
