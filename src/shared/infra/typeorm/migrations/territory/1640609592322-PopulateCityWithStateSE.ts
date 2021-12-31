import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "SE";

export class PopulateCityWithStateSE1640609592322
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
        INSERT INTO
          "city" (id, name, state_id)
        VALUES
          ('${uuidV4()}', 'Amparo de São Francisco', '${state.id}'),
          ('${uuidV4()}', 'Aquidabã', '${state.id}'),
          ('${uuidV4()}', 'Aracaju', '${state.id}'),
          ('${uuidV4()}', 'Arauá', '${state.id}'),
          ('${uuidV4()}', 'Areia Branca', '${state.id}'),
          ('${uuidV4()}', 'Barra dos Coqueiros', '${state.id}'),
          ('${uuidV4()}', 'Boquim', '${state.id}'),
          ('${uuidV4()}', 'Brejo Grande', '${state.id}'),
          ('${uuidV4()}', 'Campo do Brito', '${state.id}'),
          ('${uuidV4()}', 'Canhoba', '${state.id}'),
          ('${uuidV4()}', 'Canindé de São Francisco', '${state.id}'),
          ('${uuidV4()}', 'Capela', '${state.id}'),
          ('${uuidV4()}', 'Carira', '${state.id}'),
          ('${uuidV4()}', 'Carmópolis', '${state.id}'),
          ('${uuidV4()}', 'Cedro de São João', '${state.id}'),
          ('${uuidV4()}', 'Cristinápolis', '${state.id}'),
          ('${uuidV4()}', 'Cumbe', '${state.id}'),
          ('${uuidV4()}', 'Divina Pastora', '${state.id}'),
          ('${uuidV4()}', 'Estância', '${state.id}'),
          ('${uuidV4()}', 'Feira Nova', '${state.id}'),
          ('${uuidV4()}', 'Frei Paulo', '${state.id}'),
          ('${uuidV4()}', 'Gararu', '${state.id}'),
          ('${uuidV4()}', 'General Maynard', '${state.id}'),
          ('${uuidV4()}', 'Gracho Cardoso', '${state.id}'),
          ('${uuidV4()}', 'Ilha das Flores', '${state.id}'),
          ('${uuidV4()}', 'Indiaroba', '${state.id}'),
          ('${uuidV4()}', 'Itabaiana', '${state.id}'),
          ('${uuidV4()}', 'Itabaianinha', '${state.id}'),
          ('${uuidV4()}', 'Itabi', '${state.id}'),
          ('${uuidV4()}', 'Itaporanga d´Ajuda', '${state.id}'),
          ('${uuidV4()}', 'Japaratuba', '${state.id}'),
          ('${uuidV4()}', 'Japoatã', '${state.id}'),
          ('${uuidV4()}', 'Lagarto', '${state.id}'),
          ('${uuidV4()}', 'Laranjeiras', '${state.id}'),
          ('${uuidV4()}', 'Macambira', '${state.id}'),
          ('${uuidV4()}', 'Malhada dos Bois', '${state.id}'),
          ('${uuidV4()}', 'Malhador', '${state.id}'),
          ('${uuidV4()}', 'Maruim', '${state.id}'),
          ('${uuidV4()}', 'Moita Bonita', '${state.id}'),
          ('${uuidV4()}', 'Monte Alegre de Sergipe', '${state.id}'),
          ('${uuidV4()}', 'Muribeca', '${state.id}'),
          ('${uuidV4()}', 'Neópolis', '${state.id}'),
          ('${uuidV4()}', 'Nossa Senhora Aparecida', '${state.id}'),
          ('${uuidV4()}', 'Nossa Senhora da Glória', '${state.id}'),
          ('${uuidV4()}', 'Nossa Senhora das Dores', '${state.id}'),
          ('${uuidV4()}', 'Nossa Senhora de Lourdes', '${state.id}'),
          ('${uuidV4()}', 'Nossa Senhora do Socorro', '${state.id}'),
          ('${uuidV4()}', 'Pacatuba', '${state.id}'),
          ('${uuidV4()}', 'Pedra Mole', '${state.id}'),
          ('${uuidV4()}', 'Pedrinhas', '${state.id}'),
          ('${uuidV4()}', 'Pinhão', '${state.id}'),
          ('${uuidV4()}', 'Pirambu', '${state.id}'),
          ('${uuidV4()}', 'Poço Redondo', '${state.id}'),
          ('${uuidV4()}', 'Poço Verde', '${state.id}'),
          ('${uuidV4()}', 'Porto da Folha', '${state.id}'),
          ('${uuidV4()}', 'Propriá', '${state.id}'),
          ('${uuidV4()}', 'Riachão do Dantas', '${state.id}'),
          ('${uuidV4()}', 'Riachuelo', '${state.id}'),
          ('${uuidV4()}', 'Ribeirópolis', '${state.id}'),
          ('${uuidV4()}', 'Rosário do Catete', '${state.id}'),
          ('${uuidV4()}', 'Salgado', '${state.id}'),
          ('${uuidV4()}', 'Santa Luzia do Itanhy', '${state.id}'),
          ('${uuidV4()}', 'Santa Rosa de Lima', '${state.id}'),
          ('${uuidV4()}', 'Santana do São Francisco', '${state.id}'),
          ('${uuidV4()}', 'Santo Amaro das Brotas', '${state.id}'),
          ('${uuidV4()}', 'São Cristóvão', '${state.id}'),
          ('${uuidV4()}', 'São Domingos', '${state.id}'),
          ('${uuidV4()}', 'São Francisco', '${state.id}'),
          ('${uuidV4()}', 'São Miguel do Aleixo', '${state.id}'),
          ('${uuidV4()}', 'Simão Dias', '${state.id}'),
          ('${uuidV4()}', 'Siriri', '${state.id}'),
          ('${uuidV4()}', 'Telha', '${state.id}'),
          ('${uuidV4()}', 'Tobias Barreto', '${state.id}'),
          ('${uuidV4()}', 'Tomar do Geru', '${state.id}'),
          ('${uuidV4()}', 'Umbaúba', '${state.id}')
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
