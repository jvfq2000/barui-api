import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterChartCreateInForcFrom1642114018132
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "chart",
      new TableColumn({
        name: "in_force_from",
        type: "varchar",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("chart", "in_force_from");
  }
}
