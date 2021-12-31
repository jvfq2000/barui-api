import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "RR";

export class PopulateCityWithStateRR1640609574145
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
        INSERT INTO
          "city" (id, name, state_id)
        VALUES
          ('${uuidV4()}', 'Alto Alegre', '${state.id}'),
          ('${uuidV4()}', 'Amajari', '${state.id}'),
          ('${uuidV4()}', 'Boa Vista', '${state.id}'),
          ('${uuidV4()}', 'Bonfim', '${state.id}'),
          ('${uuidV4()}', 'Cantá', '${state.id}'),
          ('${uuidV4()}', 'Caracaraí', '${state.id}'),
          ('${uuidV4()}', 'Caroebe', '${state.id}'),
          ('${uuidV4()}', 'Iracema', '${state.id}'),
          ('${uuidV4()}', 'Mucajaí', '${state.id}'),
          ('${uuidV4()}', 'Normandia', '${state.id}'),
          ('${uuidV4()}', 'Pacaraima', '${state.id}'),
          ('${uuidV4()}', 'Rorainópolis', '${state.id}'),
          ('${uuidV4()}', 'São João da Baliza', '${state.id}'),
          ('${uuidV4()}', 'São Luiz', '${state.id}'),
          ('${uuidV4()}', 'Uiramutã', '${state.id}')
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
