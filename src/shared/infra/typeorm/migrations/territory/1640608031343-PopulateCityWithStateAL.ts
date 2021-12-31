/* eslint-disable no-useless-escape */
import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "AL";

export class PopulateCityWithStateAL1640608031343
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
        INSERT INTO
          "city" (id, name, state_id)
        VALUES
          ('${uuidV4()}', 'Água Branca', '${state.id}'),
          ('${uuidV4()}', 'Anadia', '${state.id}'),
          ('${uuidV4()}', 'Arapiraca', '${state.id}'),
          ('${uuidV4()}', 'Atalaia', '${state.id}'),
          ('${uuidV4()}', 'Barra de Santo Antônio', '${state.id}'),
          ('${uuidV4()}', 'Barra de São Miguel', '${state.id}'),
          ('${uuidV4()}', 'Batalha', '${state.id}'),
          ('${uuidV4()}', 'Belém', '${state.id}'),
          ('${uuidV4()}', 'Belo Monte', '${state.id}'),
          ('${uuidV4()}', 'Boca da Mata', '${state.id}'),
          ('${uuidV4()}', 'Branquinha', '${state.id}'),
          ('${uuidV4()}', 'Cacimbinhas', '${state.id}'),
          ('${uuidV4()}', 'Cajueiro', '${state.id}'),
          ('${uuidV4()}', 'Campestre', '${state.id}'),
          ('${uuidV4()}', 'Campo Alegre', '${state.id}'),
          ('${uuidV4()}', 'Campo Grande', '${state.id}'),
          ('${uuidV4()}', 'Canapi', '${state.id}'),
          ('${uuidV4()}', 'Capela', '${state.id}'),
          ('${uuidV4()}', 'Carneiros', '${state.id}'),
          ('${uuidV4()}', 'Chã Preta', '${state.id}'),
          ('${uuidV4()}', 'Coité do Nóia', '${state.id}'),
          ('${uuidV4()}', 'Colônia Leopoldina', '${state.id}'),
          ('${uuidV4()}', 'Coqueiro Seco', '${state.id}'),
          ('${uuidV4()}', 'Coruripe', '${state.id}'),
          ('${uuidV4()}', 'Craíbas', '${state.id}'),
          ('${uuidV4()}', 'Delmiro Gouveia', '${state.id}'),
          ('${uuidV4()}', 'Dois Riachos', '${state.id}'),
          ('${uuidV4()}', 'Estrela de Alagoas', '${state.id}'),
          ('${uuidV4()}', 'Feira Grande', '${state.id}'),
          ('${uuidV4()}', 'Feliz Deserto', '${state.id}'),
          ('${uuidV4()}', 'Flexeiras', '${state.id}'),
          ('${uuidV4()}', 'Girau do Ponciano', '${state.id}'),
          ('${uuidV4()}', 'Ibateguara', '${state.id}'),
          ('${uuidV4()}', 'Igaci', '${state.id}'),
          ('${uuidV4()}', 'Igreja Nova', '${state.id}'),
          ('${uuidV4()}', 'Inhapi', '${state.id}'),
          ('${uuidV4()}', 'Jacaré dos Homens', '${state.id}'),
          ('${uuidV4()}', 'Jacuípe', '${state.id}'),
          ('${uuidV4()}', 'Japaratinga', '${state.id}'),
          ('${uuidV4()}', 'Jaramataia', '${state.id}'),
          ('${uuidV4()}', 'Jequiá da Praia', '${state.id}'),
          ('${uuidV4()}', 'Joaquim Gomes', '${state.id}'),
          ('${uuidV4()}', 'Jundiá', '${state.id}'),
          ('${uuidV4()}', 'Junqueiro', '${state.id}'),
          ('${uuidV4()}', 'Lagoa da Canoa', '${state.id}'),
          ('${uuidV4()}', 'Limoeiro de Anadia', '${state.id}'),
          ('${uuidV4()}', 'Maceió', '${state.id}'),
          ('${uuidV4()}', 'Major Isidoro', '${state.id}'),
          ('${uuidV4()}', 'Mar Vermelho', '${state.id}'),
          ('${uuidV4()}', 'Maragogi', '${state.id}'),
          ('${uuidV4()}', 'Maravilha', '${state.id}'),
          ('${uuidV4()}', 'Marechal Deodoro', '${state.id}'),
          ('${uuidV4()}', 'Maribondo', '${state.id}'),
          ('${uuidV4()}', 'Mata Grande', '${state.id}'),
          ('${uuidV4()}', 'Matriz de Camaragibe', '${state.id}'),
          ('${uuidV4()}', 'Messias', '${state.id}'),
          ('${uuidV4()}', 'Minador do Negrão', '${state.id}'),
          ('${uuidV4()}', 'Monteirópolis', '${state.id}'),
          ('${uuidV4()}', 'Murici', '${state.id}'),
          ('${uuidV4()}', 'Novo Lino', '${state.id}'),
          ('${uuidV4()}', 'Olho d´Água das Flores', '${state.id}'),
          ('${uuidV4()}', 'Olho d´Água do Casado', '${state.id}'),
          ('${uuidV4()}', 'Olho d´Água Grande', '${state.id}'),
          ('${uuidV4()}', 'Olivença', '${state.id}'),
          ('${uuidV4()}', 'Ouro Branco', '${state.id}'),
          ('${uuidV4()}', 'Palestina', '${state.id}'),
          ('${uuidV4()}', 'Palmeira dos Índios', '${state.id}'),
          ('${uuidV4()}', 'Pão de Açúcar', '${state.id}'),
          ('${uuidV4()}', 'Pariconha', '${state.id}'),
          ('${uuidV4()}', 'Paripueira', '${state.id}'),
          ('${uuidV4()}', 'Passo de Camaragibe', '${state.id}'),
          ('${uuidV4()}', 'Paulo Jacinto', '${state.id}'),
          ('${uuidV4()}', 'Penedo', '${state.id}'),
          ('${uuidV4()}', 'Piaçabuçu', '${state.id}'),
          ('${uuidV4()}', 'Pilar', '${state.id}'),
          ('${uuidV4()}', 'Pindoba', '${state.id}'),
          ('${uuidV4()}', 'Piranhas', '${state.id}'),
          ('${uuidV4()}', 'Poço das Trincheiras', '${state.id}'),
          ('${uuidV4()}', 'Porto Calvo', '${state.id}'),
          ('${uuidV4()}', 'Porto de Pedras', '${state.id}'),
          ('${uuidV4()}', 'Porto Real do Colégio', '${state.id}'),
          ('${uuidV4()}', 'Quebrangulo', '${state.id}'),
          ('${uuidV4()}', 'Rio Largo', '${state.id}'),
          ('${uuidV4()}', 'Roteiro', '${state.id}'),
          ('${uuidV4()}', 'Santa Luzia do Norte', '${state.id}'),
          ('${uuidV4()}', 'Santana do Ipanema', '${state.id}'),
          ('${uuidV4()}', 'Santana do Mundaú', '${state.id}'),
          ('${uuidV4()}', 'São Brás', '${state.id}'),
          ('${uuidV4()}', 'São José da Laje', '${state.id}'),
          ('${uuidV4()}', 'São José da Tapera', '${state.id}'),
          ('${uuidV4()}', 'São Luís do Quitunde', '${state.id}'),
          ('${uuidV4()}', 'São Miguel dos Campos', '${state.id}'),
          ('${uuidV4()}', 'São Miguel dos Milagres', '${state.id}'),
          ('${uuidV4()}', 'São Sebastião', '${state.id}'),
          ('${uuidV4()}', 'Satuba', '${state.id}'),
          ('${uuidV4()}', 'Senador Rui Palmeira', '${state.id}'),
          ('${uuidV4()}', 'Tanque d´Arca', '${state.id}'),
          ('${uuidV4()}', 'Taquarana', '${state.id}'),
          ('${uuidV4()}', 'Teotônio Vilela', '${state.id}'),
          ('${uuidV4()}', 'Traipu', '${state.id}'),
          ('${uuidV4()}', 'União dos Palmares', '${state.id}'),
          ('${uuidV4()}', 'Viçosa', '${state.id}')
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
