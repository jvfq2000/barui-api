import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "ES";

export class PopulateCityWithStateES1640609422039
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
        INSERT INTO
          "city" (id, name, state_id)
        VALUES
          ('${uuidV4()}', 'Afonso Cláudio', '${state.id}'),
          ('${uuidV4()}', 'Água Doce do Norte', '${state.id}'),
          ('${uuidV4()}', 'Águia Branca', '${state.id}'),
          ('${uuidV4()}', 'Alegre', '${state.id}'),
          ('${uuidV4()}', 'Alfredo Chaves', '${state.id}'),
          ('${uuidV4()}', 'Alto Rio Novo', '${state.id}'),
          ('${uuidV4()}', 'Anchieta', '${state.id}'),
          ('${uuidV4()}', 'Apiacá', '${state.id}'),
          ('${uuidV4()}', 'Aracruz', '${state.id}'),
          ('${uuidV4()}', 'Atilio Vivacqua', '${state.id}'),
          ('${uuidV4()}', 'Baixo Guandu', '${state.id}'),
          ('${uuidV4()}', 'Barra de São Francisco', '${state.id}'),
          ('${uuidV4()}', 'Boa Esperança', '${state.id}'),
          ('${uuidV4()}', 'Bom Jesus do Norte', '${state.id}'),
          ('${uuidV4()}', 'Brejetuba', '${state.id}'),
          ('${uuidV4()}', 'Cachoeiro de Itapemirim', '${state.id}'),
          ('${uuidV4()}', 'Cariacica', '${state.id}'),
          ('${uuidV4()}', 'Castelo', '${state.id}'),
          ('${uuidV4()}', 'Colatina', '${state.id}'),
          ('${uuidV4()}', 'Conceição da Barra', '${state.id}'),
          ('${uuidV4()}', 'Conceição do Castelo', '${state.id}'),
          ('${uuidV4()}', 'Divino de São Lourenço', '${state.id}'),
          ('${uuidV4()}', 'Domingos Martins', '${state.id}'),
          ('${uuidV4()}', 'Dores do Rio Preto', '${state.id}'),
          ('${uuidV4()}', 'Ecoporanga', '${state.id}'),
          ('${uuidV4()}', 'Fundão', '${state.id}'),
          ('${uuidV4()}', 'Governador Lindenberg', '${state.id}'),
          ('${uuidV4()}', 'Guaçuí', '${state.id}'),
          ('${uuidV4()}', 'Guarapari', '${state.id}'),
          ('${uuidV4()}', 'Ibatiba', '${state.id}'),
          ('${uuidV4()}', 'Ibiraçu', '${state.id}'),
          ('${uuidV4()}', 'Ibitirama', '${state.id}'),
          ('${uuidV4()}', 'Iconha', '${state.id}'),
          ('${uuidV4()}', 'Irupi', '${state.id}'),
          ('${uuidV4()}', 'Itaguaçu', '${state.id}'),
          ('${uuidV4()}', 'Itapemirim', '${state.id}'),
          ('${uuidV4()}', 'Itarana', '${state.id}'),
          ('${uuidV4()}', 'Iúna', '${state.id}'),
          ('${uuidV4()}', 'Jaguaré', '${state.id}'),
          ('${uuidV4()}', 'Jerônimo Monteiro', '${state.id}'),
          ('${uuidV4()}', 'João Neiva', '${state.id}'),
          ('${uuidV4()}', 'Laranja da Terra', '${state.id}'),
          ('${uuidV4()}', 'Linhares', '${state.id}'),
          ('${uuidV4()}', 'Mantenópolis', '${state.id}'),
          ('${uuidV4()}', 'Marataízes', '${state.id}'),
          ('${uuidV4()}', 'Marechal Floriano', '${state.id}'),
          ('${uuidV4()}', 'Marilândia', '${state.id}'),
          ('${uuidV4()}', 'Mimoso do Sul', '${state.id}'),
          ('${uuidV4()}', 'Montanha', '${state.id}'),
          ('${uuidV4()}', 'Mucurici', '${state.id}'),
          ('${uuidV4()}', 'Muniz Freire', '${state.id}'),
          ('${uuidV4()}', 'Muqui', '${state.id}'),
          ('${uuidV4()}', 'Nova Venécia', '${state.id}'),
          ('${uuidV4()}', 'Pancas', '${state.id}'),
          ('${uuidV4()}', 'Pedro Canário', '${state.id}'),
          ('${uuidV4()}', 'Pinheiros', '${state.id}'),
          ('${uuidV4()}', 'Piúma', '${state.id}'),
          ('${uuidV4()}', 'Ponto Belo', '${state.id}'),
          ('${uuidV4()}', 'Presidente Kennedy', '${state.id}'),
          ('${uuidV4()}', 'Rio Bananal', '${state.id}'),
          ('${uuidV4()}', 'Rio Novo do Sul', '${state.id}'),
          ('${uuidV4()}', 'Santa Leopoldina', '${state.id}'),
          ('${uuidV4()}', 'Santa Maria de Jetibá', '${state.id}'),
          ('${uuidV4()}', 'Santa Teresa', '${state.id}'),
          ('${uuidV4()}', 'São Domingos do Norte', '${state.id}'),
          ('${uuidV4()}', 'São Gabriel da Palha', '${state.id}'),
          ('${uuidV4()}', 'São José do Calçado', '${state.id}'),
          ('${uuidV4()}', 'São Mateus', '${state.id}'),
          ('${uuidV4()}', 'São Roque do Canaã', '${state.id}'),
          ('${uuidV4()}', 'Serra', '${state.id}'),
          ('${uuidV4()}', 'Sooretama', '${state.id}'),
          ('${uuidV4()}', 'Vargem Alta', '${state.id}'),
          ('${uuidV4()}', 'Venda Nova do Imigrante', '${state.id}'),
          ('${uuidV4()}', 'Viana', '${state.id}'),
          ('${uuidV4()}', 'Vila Pavão', '${state.id}'),
          ('${uuidV4()}', 'Vila Valério', '${state.id}'),
          ('${uuidV4()}', 'Vila Velha', '${state.id}'),
          ('${uuidV4()}', 'Vitória', '${state.id}')
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
