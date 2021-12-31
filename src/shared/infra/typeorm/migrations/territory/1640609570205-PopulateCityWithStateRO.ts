import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "RO";

export class PopulateCityWithStateRO1640609570205
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
        INSERT INTO
          "city" (id, name, state_id)
        VALUES
          ('${uuidV4()}', 'Alta Floresta d´Oeste', '${state.id}'),
          ('${uuidV4()}', 'Alto Alegre dos Parecis', '${state.id}'),
          ('${uuidV4()}', 'Alto Paraíso', '${state.id}'),
          ('${uuidV4()}', 'Alvorada d´Oeste', '${state.id}'),
          ('${uuidV4()}', 'Ariquemes', '${state.id}'),
          ('${uuidV4()}', 'Buritis', '${state.id}'),
          ('${uuidV4()}', 'Cabixi', '${state.id}'),
          ('${uuidV4()}', 'Cacaulândia', '${state.id}'),
          ('${uuidV4()}', 'Cacoal', '${state.id}'),
          ('${uuidV4()}', 'Campo Novo de Rondônia', '${state.id}'),
          ('${uuidV4()}', 'Candeias do Jamari', '${state.id}'),
          ('${uuidV4()}', 'Castanheiras', '${state.id}'),
          ('${uuidV4()}', 'Cerejeiras', '${state.id}'),
          ('${uuidV4()}', 'Chupinguaia', '${state.id}'),
          ('${uuidV4()}', 'Colorado do Oeste', '${state.id}'),
          ('${uuidV4()}', 'Corumbiara', '${state.id}'),
          ('${uuidV4()}', 'Costa Marques', '${state.id}'),
          ('${uuidV4()}', 'Cujubim', '${state.id}'),
          ('${uuidV4()}', 'Espigão d´Oeste', '${state.id}'),
          ('${uuidV4()}', 'Governador Jorge Teixeira', '${state.id}'),
          ('${uuidV4()}', 'Guajará-Mirim', '${state.id}'),
          ('${uuidV4()}', 'Itapuã do Oeste', '${state.id}'),
          ('${uuidV4()}', 'Jaru', '${state.id}'),
          ('${uuidV4()}', 'Ji-Paraná', '${state.id}'),
          ('${uuidV4()}', 'Machadinho d´Oeste', '${state.id}'),
          ('${uuidV4()}', 'Ministro Andreazza', '${state.id}'),
          ('${uuidV4()}', 'Mirante da Serra', '${state.id}'),
          ('${uuidV4()}', 'Monte Negro', '${state.id}'),
          ('${uuidV4()}', 'Nova Brasilândia d´Oeste', '${state.id}'),
          ('${uuidV4()}', 'Nova Mamoré', '${state.id}'),
          ('${uuidV4()}', 'Nova União', '${state.id}'),
          ('${uuidV4()}', 'Novo Horizonte do Oeste', '${state.id}'),
          ('${uuidV4()}', 'Ouro Preto do Oeste', '${state.id}'),
          ('${uuidV4()}', 'Parecis', '${state.id}'),
          ('${uuidV4()}', 'Pimenta Bueno', '${state.id}'),
          ('${uuidV4()}', 'Pimenteiras do Oeste', '${state.id}'),
          ('${uuidV4()}', 'Porto Velho', '${state.id}'),
          ('${uuidV4()}', 'Presidente Médici', '${state.id}'),
          ('${uuidV4()}', 'Primavera de Rondônia', '${state.id}'),
          ('${uuidV4()}', 'Rio Crespo', '${state.id}'),
          ('${uuidV4()}', 'Rolim de Moura', '${state.id}'),
          ('${uuidV4()}', 'Santa Luzia d´Oeste', '${state.id}'),
          ('${uuidV4()}', 'São Felipe d´Oeste', '${state.id}'),
          ('${uuidV4()}', 'São Francisco do Guaporé', '${state.id}'),
          ('${uuidV4()}', 'São Miguel do Guaporé', '${state.id}'),
          ('${uuidV4()}', 'Seringueiras', '${state.id}'),
          ('${uuidV4()}', 'Teixeirópolis', '${state.id}'),
          ('${uuidV4()}', 'Theobroma', '${state.id}'),
          ('${uuidV4()}', 'Urupá', '${state.id}'),
          ('${uuidV4()}', 'Vale do Anari', '${state.id}'),
          ('${uuidV4()}', 'Vale do Paraíso', '${state.id}'),
          ('${uuidV4()}', 'Vilhena', '${state.id}')
        ;
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `DELETE FROM "city" WHERE state_id = '${state.id}'`,
    );
  }
}
