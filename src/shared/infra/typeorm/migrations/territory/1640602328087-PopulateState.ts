import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

export class PopulateState1640602328087 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        INSERT INTO
          "state" (id, name, acronym)
        VALUES
          ('${uuidV4()}', 'Acre', 'AC'),
          ('${uuidV4()}', 'Alagoas', 'AL'),
          ('${uuidV4()}', 'Amazonas', 'AM'),
          ('${uuidV4()}', 'Amapá', 'AP'),
          ('${uuidV4()}', 'Bahia', 'BA'),
          ('${uuidV4()}', 'Ceará', 'CE'),
          ('${uuidV4()}', 'Distrito Federal', 'DF'),
          ('${uuidV4()}', 'Espírito Santo', 'ES'),
          ('${uuidV4()}', 'Goiás', 'GO'),
          ('${uuidV4()}', 'Maranhão', 'MA'),
          ('${uuidV4()}', 'Minas Gerais', 'MG'),
          ('${uuidV4()}', 'Mato Grosso do Sul', 'MS'),
          ('${uuidV4()}', 'Mato Grosso', 'MT'),
          ('${uuidV4()}', 'Pará', 'PA'),
          ('${uuidV4()}', 'Paraíba', 'PB'),
          ('${uuidV4()}', 'Pernambuco', 'PE'),
          ('${uuidV4()}', 'Piauí', 'PI'),
          ('${uuidV4()}', 'Paraná', 'PR'),
          ('${uuidV4()}', 'Rio de Janeiro', 'RJ'),
          ('${uuidV4()}', 'Rio Grande do Norte', 'RN'),
          ('${uuidV4()}', 'Rondônia', 'RO'),
          ('${uuidV4()}', 'Roraima', 'RR'),
          ('${uuidV4()}', 'Rio Grande do Sul', 'RS'),
          ('${uuidV4()}', 'Santa Catarina', 'SC'),
          ('${uuidV4()}', 'Sergipe', 'SE'),
          ('${uuidV4()}', 'São Paulo', 'SP'),
          ('${uuidV4()}', 'Tocantins', 'TO')
        ;
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM "state"');
  }
}
