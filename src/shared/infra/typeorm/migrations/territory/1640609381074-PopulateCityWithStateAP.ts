import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "AP";

export class PopulateCityWithStateAP1640609381074
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
        INSERT INTO
          "city" (id, name, state_id)
        VALUES
          ('${uuidV4()}', 'Amapá', '${state.id}'),
          ('${uuidV4()}', 'Calçoene', '${state.id}'),
          ('${uuidV4()}', 'Cutias', '${state.id}'),
          ('${uuidV4()}', 'Ferreira Gomes', '${state.id}'),
          ('${uuidV4()}', 'Itaubal', '${state.id}'),
          ('${uuidV4()}', 'Laranjal do Jari', '${state.id}'),
          ('${uuidV4()}', 'Macapá', '${state.id}'),
          ('${uuidV4()}', 'Mazagão', '${state.id}'),
          ('${uuidV4()}', 'Oiapoque', '${state.id}'),
          ('${uuidV4()}', 'Pedra Branca do Amaparí', '${state.id}'),
          ('${uuidV4()}', 'Porto Grande', '${state.id}'),
          ('${uuidV4()}', 'Pracuúba', '${state.id}'),
          ('${uuidV4()}', 'Santana', '${state.id}'),
          ('${uuidV4()}', 'Serra do Navio', '${state.id}'),
          ('${uuidV4()}', 'Tartarugalzinho', '${state.id}'),
          ('${uuidV4()}', 'Vitória do Jari', '${state.id}')
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
