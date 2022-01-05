import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AlterUserCreateInstitutionId1640972889451
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "institution_id",
        type: "uuid",
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "user",
      new TableForeignKey({
        name: "FKInstitutionUser",
        referencedTableName: "institution",
        referencedColumnNames: ["id"],
        columnNames: ["institution_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("user", "FKInstitutionUser");
    await queryRunner.dropColumn("user", "institution_id");
  }
}
