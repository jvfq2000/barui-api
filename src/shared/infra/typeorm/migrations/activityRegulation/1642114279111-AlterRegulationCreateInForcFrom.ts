import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterRegulationCreateInForcFrom1642114279111
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "regulation",
      new TableColumn({
        name: "in_force_from",
        type: "varchar",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("regulation", "in_force_from");
  }
}
