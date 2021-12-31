import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "AM";

export class PopulateCityWithStateAM1640609392785
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
        INSERT INTO
          "city" (id, name, state_id)
        VALUES
          ('${uuidV4()}', 'Alvarães', '${state.id}'),
          ('${uuidV4()}', 'Amaturá', '${state.id}'),
          ('${uuidV4()}', 'Anamã', '${state.id}'),
          ('${uuidV4()}', 'Anori', '${state.id}'),
          ('${uuidV4()}', 'Apuí', '${state.id}'),
          ('${uuidV4()}', 'Atalaia do Norte', '${state.id}'),
          ('${uuidV4()}', 'Autazes', '${state.id}'),
          ('${uuidV4()}', 'Barcelos', '${state.id}'),
          ('${uuidV4()}', 'Barreirinha', '${state.id}'),
          ('${uuidV4()}', 'Benjamin Constant', '${state.id}'),
          ('${uuidV4()}', 'Beruri', '${state.id}'),
          ('${uuidV4()}', 'Boa Vista do Ramos', '${state.id}'),
          ('${uuidV4()}', 'Boca do Acre', '${state.id}'),
          ('${uuidV4()}', 'Borba', '${state.id}'),
          ('${uuidV4()}', 'Caapiranga', '${state.id}'),
          ('${uuidV4()}', 'Canutama', '${state.id}'),
          ('${uuidV4()}', 'Carauari', '${state.id}'),
          ('${uuidV4()}', 'Careiro', '${state.id}'),
          ('${uuidV4()}', 'Careiro da Várzea', '${state.id}'),
          ('${uuidV4()}', 'Coari', '${state.id}'),
          ('${uuidV4()}', 'Codajás', '${state.id}'),
          ('${uuidV4()}', 'Eirunepé', '${state.id}'),
          ('${uuidV4()}', 'Envira', '${state.id}'),
          ('${uuidV4()}', 'Fonte Boa', '${state.id}'),
          ('${uuidV4()}', 'Guajará', '${state.id}'),
          ('${uuidV4()}', 'Humaitá', '${state.id}'),
          ('${uuidV4()}', 'Ipixuna', '${state.id}'),
          ('${uuidV4()}', 'Iranduba', '${state.id}'),
          ('${uuidV4()}', 'Itacoatiara', '${state.id}'),
          ('${uuidV4()}', 'Itamarati', '${state.id}'),
          ('${uuidV4()}', 'Itapiranga', '${state.id}'),
          ('${uuidV4()}', 'Japurá', '${state.id}'),
          ('${uuidV4()}', 'Juruá', '${state.id}'),
          ('${uuidV4()}', 'Jutaí', '${state.id}'),
          ('${uuidV4()}', 'Lábrea', '${state.id}'),
          ('${uuidV4()}', 'Manacapuru', '${state.id}'),
          ('${uuidV4()}', 'Manaquiri', '${state.id}'),
          ('${uuidV4()}', 'Manaus', '${state.id}'),
          ('${uuidV4()}', 'Manicoré', '${state.id}'),
          ('${uuidV4()}', 'Maraã', '${state.id}'),
          ('${uuidV4()}', 'Maués', '${state.id}'),
          ('${uuidV4()}', 'Nhamundá', '${state.id}'),
          ('${uuidV4()}', 'Nova Olinda do Norte', '${state.id}'),
          ('${uuidV4()}', 'Novo Airão', '${state.id}'),
          ('${uuidV4()}', 'Novo Aripuanã', '${state.id}'),
          ('${uuidV4()}', 'Parintins', '${state.id}'),
          ('${uuidV4()}', 'Pauini', '${state.id}'),
          ('${uuidV4()}', 'Presidente Figueiredo', '${state.id}'),
          ('${uuidV4()}', 'Rio Preto da Eva', '${state.id}'),
          ('${uuidV4()}', 'Santa Isabel do Rio Negro', '${state.id}'),
          ('${uuidV4()}', 'Santo Antônio do Içá', '${state.id}'),
          ('${uuidV4()}', 'São Gabriel da Cachoeira', '${state.id}'),
          ('${uuidV4()}', 'São Paulo de Olivença', '${state.id}'),
          ('${uuidV4()}', 'São Sebastião do Uatumã', '${state.id}'),
          ('${uuidV4()}', 'Silves', '${state.id}'),
          ('${uuidV4()}', 'Tabatinga', '${state.id}'),
          ('${uuidV4()}', 'Tapauá', '${state.id}'),
          ('${uuidV4()}', 'Tefé', '${state.id}'),
          ('${uuidV4()}', 'Tonantins', '${state.id}'),
          ('${uuidV4()}', 'Uarini', '${state.id}'),
          ('${uuidV4()}', 'Urucará', '${state.id}'),
          ('${uuidV4()}', 'Urucurituba', '${state.id}')
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
