import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserUpdateOldAccessLevels1640973558190
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        UPDATE "user"
          SET access_level = 'aluno'
          WHERE email != 'joao.quintal@ji.dev.br'
        ;
      `,
    );

    await queryRunner.query(
      `
        UPDATE "user"
          SET access_level = 'administrador geral'
          WHERE email = 'joao.quintal@ji.dev.br'
        ;
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
