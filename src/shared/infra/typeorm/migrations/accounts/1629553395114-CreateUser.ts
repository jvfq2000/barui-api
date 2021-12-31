import { hash } from "bcrypt";
import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { v4 as uuidV4 } from "uuid";

export class CreateUser1629553395114 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
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
            name: "last_name",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "identifier",
            type: "varchar",
            isNullable: true,
            comment: "Armazena o CPF ou CNPJ do usuário",
          },
          {
            name: "access_level",
            type: "varchar",
            default: "'cliente'",
            comment:
              "Nível de acesso do usuário: cliente, profissional, representante, administrador",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
    );

    const id = uuidV4();
    const password = await hash("admin123#@!", 8);

    await queryRunner.query(
      `INSERT INTO
        "user"(id, name, last_name, password, email, identifier, access_level)
        VALUES('${id}', 'João Admin', 'Farias Quintal', '${password}', 'joao.quintal@ji.dev.br', '14633971603', 'administrador')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
