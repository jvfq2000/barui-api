import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserCreateIsAdmin1638215326800 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "is_active",
        type: "boolean",
        default: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("user", "is_active");
  }
}
