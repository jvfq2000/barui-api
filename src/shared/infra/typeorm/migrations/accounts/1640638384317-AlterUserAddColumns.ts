import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AlterUserAddColumns1640638384317 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("user", [
      new TableColumn({
        name: "telephone",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "initial_semester",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "registration",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "course_id",
        type: "uuid",
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKey(
      "user",
      new TableForeignKey({
        name: "FKCourseUser",
        referencedTableName: "course",
        referencedColumnNames: ["id"],
        columnNames: ["course_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("user", "FKCourseUser");

    await queryRunner.dropColumns("user", [
      "telephone",
      "initial_semester",
      "registration",
      "course_id",
    ]);
  }
}
