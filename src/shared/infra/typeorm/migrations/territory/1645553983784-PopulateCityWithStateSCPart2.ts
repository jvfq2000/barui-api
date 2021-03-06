import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "SC";

export class PopulateCityWithStateSCPart21645553983784
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
          INSERT INTO
            "city" (id, name, state_id)
          VALUES
            ('${uuidV4()}', 'Lajeado Grande', '${state.id}'),
            ('${uuidV4()}', 'Laurentino', '${state.id}'),
            ('${uuidV4()}', 'Lauro Muller', '${state.id}'),
            ('${uuidV4()}', 'Lebon Régis', '${state.id}'),
            ('${uuidV4()}', 'Leoberto Leal', '${state.id}'),
            ('${uuidV4()}', 'Lindóia do Sul', '${state.id}'),
            ('${uuidV4()}', 'Lontras', '${state.id}'),
            ('${uuidV4()}', 'Luiz Alves', '${state.id}'),
            ('${uuidV4()}', 'Luzerna', '${state.id}'),
            ('${uuidV4()}', 'Macieira', '${state.id}'),
            ('${uuidV4()}', 'Mafra', '${state.id}'),
            ('${uuidV4()}', 'Major Gercino', '${state.id}'),
            ('${uuidV4()}', 'Major Vieira', '${state.id}'),
            ('${uuidV4()}', 'Maracajá', '${state.id}'),
            ('${uuidV4()}', 'Maravilha', '${state.id}'),
            ('${uuidV4()}', 'Marema', '${state.id}'),
            ('${uuidV4()}', 'Massaranduba', '${state.id}'),
            ('${uuidV4()}', 'Matos Costa', '${state.id}'),
            ('${uuidV4()}', 'Meleiro', '${state.id}'),
            ('${uuidV4()}', 'Mirim Doce', '${state.id}'),
            ('${uuidV4()}', 'Modelo', '${state.id}'),
            ('${uuidV4()}', 'Mondaí', '${state.id}'),
            ('${uuidV4()}', 'Monte Carlo', '${state.id}'),
            ('${uuidV4()}', 'Monte Castelo', '${state.id}'),
            ('${uuidV4()}', 'Morro da Fumaça', '${state.id}'),
            ('${uuidV4()}', 'Morro Grande', '${state.id}'),
            ('${uuidV4()}', 'Navegantes', '${state.id}'),
            ('${uuidV4()}', 'Nova Erechim', '${state.id}'),
            ('${uuidV4()}', 'Nova Itaberaba', '${state.id}'),
            ('${uuidV4()}', 'Nova Trento', '${state.id}'),
            ('${uuidV4()}', 'Nova Veneza', '${state.id}'),
            ('${uuidV4()}', 'Novo Horizonte', '${state.id}'),
            ('${uuidV4()}', 'Orleans', '${state.id}'),
            ('${uuidV4()}', 'Otacílio Costa', '${state.id}'),
            ('${uuidV4()}', 'Ouro', '${state.id}'),
            ('${uuidV4()}', 'Ouro Verde', '${state.id}'),
            ('${uuidV4()}', 'Paial', '${state.id}'),
            ('${uuidV4()}', 'Painel', '${state.id}'),
            ('${uuidV4()}', 'Palhoça', '${state.id}'),
            ('${uuidV4()}', 'Palma Sola', '${state.id}'),
            ('${uuidV4()}', 'Palmeira', '${state.id}'),
            ('${uuidV4()}', 'Palmitos', '${state.id}'),
            ('${uuidV4()}', 'Papanduva', '${state.id}'),
            ('${uuidV4()}', 'Paraíso', '${state.id}'),
            ('${uuidV4()}', 'Passo de Torres', '${state.id}'),
            ('${uuidV4()}', 'Passos Maia', '${state.id}'),
            ('${uuidV4()}', 'Paulo Lopes', '${state.id}'),
            ('${uuidV4()}', 'Pedras Grandes', '${state.id}'),
            ('${uuidV4()}', 'Penha', '${state.id}'),
            ('${uuidV4()}', 'Peritiba', '${state.id}'),
            ('${uuidV4()}', 'Petrolândia', '${state.id}'),
            ('${uuidV4()}', 'Piçarras', '${state.id}'),
            ('${uuidV4()}', 'Pinhalzinho', '${state.id}'),
            ('${uuidV4()}', 'Pinheiro Preto', '${state.id}'),
            ('${uuidV4()}', 'Piratuba', '${state.id}'),
            ('${uuidV4()}', 'Planalto Alegre', '${state.id}'),
            ('${uuidV4()}', 'Pomerode', '${state.id}'),
            ('${uuidV4()}', 'Ponte Alta', '${state.id}'),
            ('${uuidV4()}', 'Ponte Alta do Norte', '${state.id}'),
            ('${uuidV4()}', 'Ponte Serrada', '${state.id}'),
            ('${uuidV4()}', 'Porto Belo', '${state.id}'),
            ('${uuidV4()}', 'Porto União', '${state.id}'),
            ('${uuidV4()}', 'Pouso Redondo', '${state.id}'),
            ('${uuidV4()}', 'Praia Grande', '${state.id}'),
            ('${uuidV4()}', 'Presidente Castelo Branco', '${state.id}'),
            ('${uuidV4()}', 'Presidente Getúlio', '${state.id}'),
            ('${uuidV4()}', 'Presidente Nereu', '${state.id}'),
            ('${uuidV4()}', 'Princesa', '${state.id}'),
            ('${uuidV4()}', 'Quilombo', '${state.id}'),
            ('${uuidV4()}', 'Rancho Queimado', '${state.id}'),
            ('${uuidV4()}', 'Rio das Antas', '${state.id}'),
            ('${uuidV4()}', 'Rio do Campo', '${state.id}'),
            ('${uuidV4()}', 'Rio do Oeste', '${state.id}'),
            ('${uuidV4()}', 'Rio do Sul', '${state.id}'),
            ('${uuidV4()}', 'Rio dos Cedros', '${state.id}'),
            ('${uuidV4()}', 'Rio Fortuna', '${state.id}'),
            ('${uuidV4()}', 'Rio Negrinho', '${state.id}'),
            ('${uuidV4()}', 'Rio Rufino', '${state.id}'),
            ('${uuidV4()}', 'Riqueza', '${state.id}'),
            ('${uuidV4()}', 'Rodeio', '${state.id}'),
            ('${uuidV4()}', 'Romelândia', '${state.id}'),
            ('${uuidV4()}', 'Salete', '${state.id}'),
            ('${uuidV4()}', 'Saltinho', '${state.id}'),
            ('${uuidV4()}', 'Salto Veloso', '${state.id}'),
            ('${uuidV4()}', 'Sangão', '${state.id}'),
            ('${uuidV4()}', 'Santa Cecília', '${state.id}'),
            ('${uuidV4()}', 'Santa Helena', '${state.id}'),
            ('${uuidV4()}', 'Santa Rosa de Lima', '${state.id}'),
            ('${uuidV4()}', 'Santa Rosa do Sul', '${state.id}'),
            ('${uuidV4()}', 'Santa Terezinha', '${state.id}'),
            ('${uuidV4()}', 'Santa Terezinha do Progresso', '${state.id}'),
            ('${uuidV4()}', 'Santiago do Sul', '${state.id}'),
            ('${uuidV4()}', 'Santo Amaro da Imperatriz', '${state.id}'),
            ('${uuidV4()}', 'São Bento do Sul', '${state.id}'),
            ('${uuidV4()}', 'São Bernardino', '${state.id}'),
            ('${uuidV4()}', 'São Bonifácio', '${state.id}'),
            ('${uuidV4()}', 'São Carlos', '${state.id}'),
            ('${uuidV4()}', 'São Cristovão do Sul', '${state.id}'),
            ('${uuidV4()}', 'São Domingos', '${state.id}'),
            ('${uuidV4()}', 'São Francisco do Sul', '${state.id}'),
            ('${uuidV4()}', 'São João Batista', '${state.id}'),
            ('${uuidV4()}', 'São João do Itaperiú', '${state.id}'),
            ('${uuidV4()}', 'São João do Oeste', '${state.id}'),
            ('${uuidV4()}', 'São João do Sul', '${state.id}'),
            ('${uuidV4()}', 'São Joaquim', '${state.id}'),
            ('${uuidV4()}', 'São José', '${state.id}'),
            ('${uuidV4()}', 'São José do Cedro', '${state.id}'),
            ('${uuidV4()}', 'São José do Cerrito', '${state.id}'),
            ('${uuidV4()}', 'São Lourenço do Oeste', '${state.id}'),
            ('${uuidV4()}', 'São Ludgero', '${state.id}'),
            ('${uuidV4()}', 'São Martinho', '${state.id}'),
            ('${uuidV4()}', 'São Miguel da Boa Vista', '${state.id}'),
            ('${uuidV4()}', 'São Miguel do Oeste', '${state.id}'),
            ('${uuidV4()}', 'São Pedro de Alcântara', '${state.id}'),
            ('${uuidV4()}', 'Saudades', '${state.id}'),
            ('${uuidV4()}', 'Schroeder', '${state.id}'),
            ('${uuidV4()}', 'Seara', '${state.id}'),
            ('${uuidV4()}', 'Serra Alta', '${state.id}'),
            ('${uuidV4()}', 'Siderópolis', '${state.id}'),
            ('${uuidV4()}', 'Sombrio', '${state.id}'),
            ('${uuidV4()}', 'Sul Brasil', '${state.id}'),
            ('${uuidV4()}', 'Taió', '${state.id}'),
            ('${uuidV4()}', 'Tangará', '${state.id}'),
            ('${uuidV4()}', 'Tigrinhos', '${state.id}'),
            ('${uuidV4()}', 'Tijucas', '${state.id}'),
            ('${uuidV4()}', 'Timbé do Sul', '${state.id}'),
            ('${uuidV4()}', 'Timbó', '${state.id}'),
            ('${uuidV4()}', 'Timbó Grande', '${state.id}'),
            ('${uuidV4()}', 'Três Barras', '${state.id}'),
            ('${uuidV4()}', 'Treviso', '${state.id}'),
            ('${uuidV4()}', 'Treze de Maio', '${state.id}'),
            ('${uuidV4()}', 'Treze Tílias', '${state.id}'),
            ('${uuidV4()}', 'Trombudo Central', '${state.id}'),
            ('${uuidV4()}', 'Tubarão', '${state.id}'),
            ('${uuidV4()}', 'Tunápolis', '${state.id}'),
            ('${uuidV4()}', 'Turvo', '${state.id}'),
            ('${uuidV4()}', 'União do Oeste', '${state.id}'),
            ('${uuidV4()}', 'Urubici', '${state.id}'),
            ('${uuidV4()}', 'Urupema', '${state.id}'),
            ('${uuidV4()}', 'Urussanga', '${state.id}'),
            ('${uuidV4()}', 'Vargeão', '${state.id}'),
            ('${uuidV4()}', 'Vargem', '${state.id}'),
            ('${uuidV4()}', 'Vargem Bonita', '${state.id}'),
            ('${uuidV4()}', 'Vidal Ramos', '${state.id}'),
            ('${uuidV4()}', 'Videira', '${state.id}'),
            ('${uuidV4()}', 'Vitor Meireles', '${state.id}'),
            ('${uuidV4()}', 'Witmarsum', '${state.id}'),
            ('${uuidV4()}', 'Xanxerê', '${state.id}'),
            ('${uuidV4()}', 'Xavantina', '${state.id}'),
            ('${uuidV4()}', 'Xaxim', '${state.id}'),
            ('${uuidV4()}', 'Zortéa', '${state.id}')
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
