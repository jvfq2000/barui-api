import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "RJ";

export class PopulateCityWithStateRJ1640609534949
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
        INSERT INTO
          "city" (id, name, state_id)
        VALUES
          ('${uuidV4()}', 'Angra dos Reis', '${state.id}'),
          ('${uuidV4()}', 'Aperibé', '${state.id}'),
          ('${uuidV4()}', 'Araruama', '${state.id}'),
          ('${uuidV4()}', 'Areal', '${state.id}'),
          ('${uuidV4()}', 'Armação dos Búzios', '${state.id}'),
          ('${uuidV4()}', 'Arraial do Cabo', '${state.id}'),
          ('${uuidV4()}', 'Barra do Piraí', '${state.id}'),
          ('${uuidV4()}', 'Barra Mansa', '${state.id}'),
          ('${uuidV4()}', 'Belford Roxo', '${state.id}'),
          ('${uuidV4()}', 'Bom Jardim', '${state.id}'),
          ('${uuidV4()}', 'Bom Jesus do Itabapoana', '${state.id}'),
          ('${uuidV4()}', 'Cabo Frio', '${state.id}'),
          ('${uuidV4()}', 'Cachoeiras de Macacu', '${state.id}'),
          ('${uuidV4()}', 'Cambuci', '${state.id}'),
          ('${uuidV4()}', 'Campos dos Goytacazes', '${state.id}'),
          ('${uuidV4()}', 'Cantagalo', '${state.id}'),
          ('${uuidV4()}', 'Carapebus', '${state.id}'),
          ('${uuidV4()}', 'Cardoso Moreira', '${state.id}'),
          ('${uuidV4()}', 'Carmo', '${state.id}'),
          ('${uuidV4()}', 'Casimiro de Abreu', '${state.id}'),
          ('${uuidV4()}', 'Comendador Levy Gasparian', '${state.id}'),
          ('${uuidV4()}', 'Conceição de Macabu', '${state.id}'),
          ('${uuidV4()}', 'Cordeiro', '${state.id}'),
          ('${uuidV4()}', 'Duas Barras', '${state.id}'),
          ('${uuidV4()}', 'Duque de Caxias', '${state.id}'),
          ('${uuidV4()}', 'Engenheiro Paulo de Frontin', '${state.id}'),
          ('${uuidV4()}', 'Guapimirim', '${state.id}'),
          ('${uuidV4()}', 'Iguaba Grande', '${state.id}'),
          ('${uuidV4()}', 'Itaboraí', '${state.id}'),
          ('${uuidV4()}', 'Itaguaí', '${state.id}'),
          ('${uuidV4()}', 'Italva', '${state.id}'),
          ('${uuidV4()}', 'Itaocara', '${state.id}'),
          ('${uuidV4()}', 'Itaperuna', '${state.id}'),
          ('${uuidV4()}', 'Itatiaia', '${state.id}'),
          ('${uuidV4()}', 'Japeri', '${state.id}'),
          ('${uuidV4()}', 'Laje do Muriaé', '${state.id}'),
          ('${uuidV4()}', 'Macaé', '${state.id}'),
          ('${uuidV4()}', 'Macuco', '${state.id}'),
          ('${uuidV4()}', 'Magé', '${state.id}'),
          ('${uuidV4()}', 'Mangaratiba', '${state.id}'),
          ('${uuidV4()}', 'Maricá', '${state.id}'),
          ('${uuidV4()}', 'Mendes', '${state.id}'),
          ('${uuidV4()}', 'Mesquita', '${state.id}'),
          ('${uuidV4()}', 'Miguel Pereira', '${state.id}'),
          ('${uuidV4()}', 'Miracema', '${state.id}'),
          ('${uuidV4()}', 'Natividade', '${state.id}'),
          ('${uuidV4()}', 'Nilópolis', '${state.id}'),
          ('${uuidV4()}', 'Niterói', '${state.id}'),
          ('${uuidV4()}', 'Nova Friburgo', '${state.id}'),
          ('${uuidV4()}', 'Nova Iguaçu', '${state.id}'),
          ('${uuidV4()}', 'Paracambi', '${state.id}'),
          ('${uuidV4()}', 'Paraíba do Sul', '${state.id}'),
          ('${uuidV4()}', 'Parati', '${state.id}'),
          ('${uuidV4()}', 'Paty do Alferes', '${state.id}'),
          ('${uuidV4()}', 'Petrópolis', '${state.id}'),
          ('${uuidV4()}', 'Pinheiral', '${state.id}'),
          ('${uuidV4()}', 'Piraí', '${state.id}'),
          ('${uuidV4()}', 'Porciúncula', '${state.id}'),
          ('${uuidV4()}', 'Porto Real', '${state.id}'),
          ('${uuidV4()}', 'Quatis', '${state.id}'),
          ('${uuidV4()}', 'Queimados', '${state.id}'),
          ('${uuidV4()}', 'Quissamã', '${state.id}'),
          ('${uuidV4()}', 'Resende', '${state.id}'),
          ('${uuidV4()}', 'Rio Bonito', '${state.id}'),
          ('${uuidV4()}', 'Rio Claro', '${state.id}'),
          ('${uuidV4()}', 'Rio das Flores', '${state.id}'),
          ('${uuidV4()}', 'Rio das Ostras', '${state.id}'),
          ('${uuidV4()}', 'Rio de Janeiro', '${state.id}'),
          ('${uuidV4()}', 'Santa Maria Madalena', '${state.id}'),
          ('${uuidV4()}', 'Santo Antônio de Pádua', '${state.id}'),
          ('${uuidV4()}', 'São Fidélis', '${state.id}'),
          ('${uuidV4()}', 'São Francisco de Itabapoana', '${state.id}'),
          ('${uuidV4()}', 'São Gonçalo', '${state.id}'),
          ('${uuidV4()}', 'São João da Barra', '${state.id}'),
          ('${uuidV4()}', 'São João de Meriti', '${state.id}'),
          ('${uuidV4()}', 'São José de Ubá', '${state.id}'),
          ('${uuidV4()}', 'São José do Vale do Rio Pret', '${state.id}'),
          ('${uuidV4()}', 'São Pedro da Aldeia', '${state.id}'),
          ('${uuidV4()}', 'São Sebastião do Alto', '${state.id}'),
          ('${uuidV4()}', 'Sapucaia', '${state.id}'),
          ('${uuidV4()}', 'Saquarema', '${state.id}'),
          ('${uuidV4()}', 'Seropédica', '${state.id}'),
          ('${uuidV4()}', 'Silva Jardim', '${state.id}'),
          ('${uuidV4()}', 'Sumidouro', '${state.id}'),
          ('${uuidV4()}', 'Tanguá', '${state.id}'),
          ('${uuidV4()}', 'Teresópolis', '${state.id}'),
          ('${uuidV4()}', 'Trajano de Morais', '${state.id}'),
          ('${uuidV4()}', 'Três Rios', '${state.id}'),
          ('${uuidV4()}', 'Valença', '${state.id}'),
          ('${uuidV4()}', 'Varre-Sai', '${state.id}'),
          ('${uuidV4()}', 'Vassouras', '${state.id}'),
          ('${uuidV4()}', 'Volta Redonda', '${state.id}')
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
