import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "AC";

export class PopulateCityWithStateAC1640603832924
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
        INSERT INTO
          "city" (id, name, state_id)
        VALUES
          ('${uuidV4()}', 'Acrelândia', '${state.id}'),
          ('${uuidV4()}', 'Assis Brasil', '${state.id}'),
          ('${uuidV4()}', 'Brasiléia', '${state.id}'),
          ('${uuidV4()}', 'Bujari', '${state.id}'),
          ('${uuidV4()}', 'Capixaba', '${state.id}'),
          ('${uuidV4()}', 'Cruzeiro do Sul', '${state.id}'),
          ('${uuidV4()}', 'Epitaciolândia', '${state.id}'),
          ('${uuidV4()}', 'Feijó', '${state.id}'),
          ('${uuidV4()}', 'Jordão', '${state.id}'),
          ('${uuidV4()}', 'Mâncio Lima', '${state.id}'),
          ('${uuidV4()}', 'Manoel Urbano', '${state.id}'),
          ('${uuidV4()}', 'Marechal Thaumaturgo', '${state.id}'),
          ('${uuidV4()}', 'Plácido de Castro', '${state.id}'),
          ('${uuidV4()}', 'Porto Acre', '${state.id}'),
          ('${uuidV4()}', 'Porto Walter', '${state.id}'),
          ('${uuidV4()}', 'Rio Branco', '${state.id}'),
          ('${uuidV4()}', 'Rodrigues Alves', '${state.id}'),
          ('${uuidV4()}', 'Santa Rosa do Purus', '${state.id}'),
          ('${uuidV4()}', 'Sena Madureira', '${state.id}'),
          ('${uuidV4()}', 'Senador Guiomard', '${state.id}'),
          ('${uuidV4()}', 'Tarauacá', '${state.id}'),
          ('${uuidV4()}', 'Xapuri', '${state.id}')
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
