/* eslint-disable no-plusplus */
import { hash } from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

export class PopulateTableUsers1639448324838 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hash("123", 8);

    for (let i = 0; i < 300; i++) {
      queryRunner.query(
        `INSERT INTO
        "user"(id, name, last_name, password, email, identifier, access_level)
        VALUES('${uuidV4()}', 'User ${i + 1}', 'Teste', '${password}', 'user${
          i + 1
        }.teste@ji.dev.br', '00000000000', 'cliente')`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
