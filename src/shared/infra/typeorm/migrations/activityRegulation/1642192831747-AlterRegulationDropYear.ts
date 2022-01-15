import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterRegulationDropYear1642192831747
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("regulation", "year");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
