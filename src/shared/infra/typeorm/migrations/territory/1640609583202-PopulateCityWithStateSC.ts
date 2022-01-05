import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "SC";

export class PopulateCityWithStateSC1640609583202
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
        INSERT INTO
          "city" (id, name, state_id)
        VALUES
          ('${uuidV4()}', 'Abdon Batista', '${state.id}'),
          ('${uuidV4()}', 'Abelardo Luz', '${state.id}'),
          ('${uuidV4()}', 'Agrolândia', '${state.id}'),
          ('${uuidV4()}', 'Agronômica', '${state.id}'),
          ('${uuidV4()}', 'Água Doce', '${state.id}'),
          ('${uuidV4()}', 'Águas de Chapecó', '${state.id}'),
          ('${uuidV4()}', 'Águas Frias', '${state.id}'),
          ('${uuidV4()}', 'Águas Mornas', '${state.id}'),
          ('${uuidV4()}', 'Alfredo Wagner', '${state.id}'),
          ('${uuidV4()}', 'Alto Bela Vista', '${state.id}'),
          ('${uuidV4()}', 'Anchieta', '${state.id}'),
          ('${uuidV4()}', 'Angelina', '${state.id}'),
          ('${uuidV4()}', 'Anita Garibaldi', '${state.id}'),
          ('${uuidV4()}', 'Anitápolis', '${state.id}'),
          ('${uuidV4()}', 'Antônio Carlos', '${state.id}'),
          ('${uuidV4()}', 'Apiúna', '${state.id}'),
          ('${uuidV4()}', 'Arabutã', '${state.id}'),
          ('${uuidV4()}', 'Araquari', '${state.id}'),
          ('${uuidV4()}', 'Araranguá', '${state.id}'),
          ('${uuidV4()}', 'Armazém', '${state.id}'),
          ('${uuidV4()}', 'Arroio Trinta', '${state.id}'),
          ('${uuidV4()}', 'Arvoredo', '${state.id}'),
          ('${uuidV4()}', 'Ascurra', '${state.id}'),
          ('${uuidV4()}', 'Atalanta', '${state.id}'),
          ('${uuidV4()}', 'Aurora', '${state.id}'),
          ('${uuidV4()}', 'Balneário Arroio do Silva', '${state.id}'),
          ('${uuidV4()}', 'Balneário Barra do Sul', '${state.id}'),
          ('${uuidV4()}', 'Balneário Camboriú', '${state.id}'),
          ('${uuidV4()}', 'Balneário Gaivota', '${state.id}'),
          ('${uuidV4()}', 'Bandeirante', '${state.id}'),
          ('${uuidV4()}', 'Barra Bonita', '${state.id}'),
          ('${uuidV4()}', 'Barra Velha', '${state.id}'),
          ('${uuidV4()}', 'Bela Vista do Toldo', '${state.id}'),
          ('${uuidV4()}', 'Belmonte', '${state.id}'),
          ('${uuidV4()}', 'Benedito Novo', '${state.id}'),
          ('${uuidV4()}', 'Biguaçu', '${state.id}'),
          ('${uuidV4()}', 'Blumenau', '${state.id}'),
          ('${uuidV4()}', 'Bocaina do Sul', '${state.id}'),
          ('${uuidV4()}', 'Bom Jardim da Serra', '${state.id}'),
          ('${uuidV4()}', 'Bom Jesus', '${state.id}'),
          ('${uuidV4()}', 'Bom Jesus do Oeste', '${state.id}'),
          ('${uuidV4()}', 'Bom Retiro', '${state.id}'),
          ('${uuidV4()}', 'Bombinhas', '${state.id}'),
          ('${uuidV4()}', 'Botuverá', '${state.id}'),
          ('${uuidV4()}', 'Braço do Norte', '${state.id}'),
          ('${uuidV4()}', 'Braço do Trombudo', '${state.id}'),
          ('${uuidV4()}', 'Brunópolis', '${state.id}'),
          ('${uuidV4()}', 'Brusque', '${state.id}'),
          ('${uuidV4()}', 'Caçador', '${state.id}'),
          ('${uuidV4()}', 'Caibi', '${state.id}'),
          ('${uuidV4()}', 'Calmon', '${state.id}'),
          ('${uuidV4()}', 'Camboriú', '${state.id}'),
          ('${uuidV4()}', 'Campo Alegre', '${state.id}'),
          ('${uuidV4()}', 'Campo Belo do Sul', '${state.id}'),
          ('${uuidV4()}', 'Campo Erê', '${state.id}'),
          ('${uuidV4()}', 'Campos Novos', '${state.id}'),
          ('${uuidV4()}', 'Canelinha', '${state.id}'),
          ('${uuidV4()}', 'Canoinhas', '${state.id}'),
          ('${uuidV4()}', 'Capão Alto', '${state.id}'),
          ('${uuidV4()}', 'Capinzal', '${state.id}'),
          ('${uuidV4()}', 'Capivari de Baixo', '${state.id}'),
          ('${uuidV4()}', 'Catanduvas', '${state.id}'),
          ('${uuidV4()}', 'Caxambu do Sul', '${state.id}'),
          ('${uuidV4()}', 'Celso Ramos', '${state.id}'),
          ('${uuidV4()}', 'Cerro Negro', '${state.id}'),
          ('${uuidV4()}', 'Chapadão do Lageado', '${state.id}'),
          ('${uuidV4()}', 'Chapecó', '${state.id}'),
          ('${uuidV4()}', 'Cocal do Sul', '${state.id}'),
          ('${uuidV4()}', 'Concórdia', '${state.id}'),
          ('${uuidV4()}', 'Cordilheira Alta', '${state.id}'),
          ('${uuidV4()}', 'Coronel Freitas', '${state.id}'),
          ('${uuidV4()}', 'Coronel Martins', '${state.id}'),
          ('${uuidV4()}', 'Correia Pinto', '${state.id}'),
          ('${uuidV4()}', 'Corupá', '${state.id}'),
          ('${uuidV4()}', 'Criciúma', '${state.id}'),
          ('${uuidV4()}', 'Cunha Porã', '${state.id}'),
          ('${uuidV4()}', 'Cunhataí', '${state.id}'),
          ('${uuidV4()}', 'Curitibanos', '${state.id}'),
          ('${uuidV4()}', 'Descanso', '${state.id}'),
          ('${uuidV4()}', 'Dionísio Cerqueira', '${state.id}'),
          ('${uuidV4()}', 'Dona Emma', '${state.id}'),
          ('${uuidV4()}', 'Doutor Pedrinho', '${state.id}'),
          ('${uuidV4()}', 'Entre Rios', '${state.id}'),
          ('${uuidV4()}', 'Ermo', '${state.id}'),
          ('${uuidV4()}', 'Erval Velho', '${state.id}'),
          ('${uuidV4()}', 'Faxinal dos Guedes', '${state.id}'),
          ('${uuidV4()}', 'Flor do Sertão', '${state.id}'),
          ('${uuidV4()}', 'Florianópolis', '${state.id}'),
          ('${uuidV4()}', 'Formosa do Sul', '${state.id}'),
          ('${uuidV4()}', 'Forquilhinha', '${state.id}'),
          ('${uuidV4()}', 'Fraiburgo', '${state.id}'),
          ('${uuidV4()}', 'Frei Rogério', '${state.id}'),
          ('${uuidV4()}', 'Galvão', '${state.id}'),
          ('${uuidV4()}', 'Garopaba', '${state.id}'),
          ('${uuidV4()}', 'Garuva', '${state.id}'),
          ('${uuidV4()}', 'Gaspar', '${state.id}'),
          ('${uuidV4()}', 'Governador Celso Ramos', '${state.id}'),
          ('${uuidV4()}', 'Grão Pará', '${state.id}'),
          ('${uuidV4()}', 'Gravatal', '${state.id}'),
          ('${uuidV4()}', 'Guabiruba', '${state.id}'),
          ('${uuidV4()}', 'Guaraciaba', '${state.id}'),
          ('${uuidV4()}', 'Guaramirim', '${state.id}'),
          ('${uuidV4()}', 'Guarujá do Sul', '${state.id}'),
          ('${uuidV4()}', 'Guatambú', '${state.id}'),
          ('${uuidV4()}', 'Herval d´Oeste', '${state.id}'),
          ('${uuidV4()}', 'Ibiam', '${state.id}'),
          ('${uuidV4()}', 'Ibicaré', '${state.id}'),
          ('${uuidV4()}', 'Ibirama', '${state.id}'),
          ('${uuidV4()}', 'Içara', '${state.id}'),
          ('${uuidV4()}', 'Ilhota', '${state.id}'),
          ('${uuidV4()}', 'Imaruí', '${state.id}'),
          ('${uuidV4()}', 'Imbituba', '${state.id}'),
          ('${uuidV4()}', 'Imbuia', '${state.id}'),
          ('${uuidV4()}', 'Indaial', '${state.id}'),
          ('${uuidV4()}', 'Iomerê', '${state.id}'),
          ('${uuidV4()}', 'Ipira', '${state.id}'),
          ('${uuidV4()}', 'Iporã do Oeste', '${state.id}'),
          ('${uuidV4()}', 'Ipuaçu', '${state.id}'),
          ('${uuidV4()}', 'Ipumirim', '${state.id}'),
          ('${uuidV4()}', 'Iraceminha', '${state.id}'),
          ('${uuidV4()}', 'Irani', '${state.id}'),
          ('${uuidV4()}', 'Irati', '${state.id}'),
          ('${uuidV4()}', 'Irineópolis', '${state.id}'),
          ('${uuidV4()}', 'Itá', '${state.id}'),
          ('${uuidV4()}', 'Itaiópolis', '${state.id}'),
          ('${uuidV4()}', 'Itajaí', '${state.id}'),
          ('${uuidV4()}', 'Itapema', '${state.id}'),
          ('${uuidV4()}', 'Itapiranga', '${state.id}'),
          ('${uuidV4()}', 'Itapoá', '${state.id}'),
          ('${uuidV4()}', 'Ituporanga', '${state.id}'),
          ('${uuidV4()}', 'Jaborá', '${state.id}'),
          ('${uuidV4()}', 'Jacinto Machado', '${state.id}'),
          ('${uuidV4()}', 'Jaguaruna', '${state.id}'),
          ('${uuidV4()}', 'Jaraguá do Sul', '${state.id}'),
          ('${uuidV4()}', 'Jardinópolis', '${state.id}'),
          ('${uuidV4()}', 'Joaçaba', '${state.id}'),
          ('${uuidV4()}', 'Joinville', '${state.id}'),
          ('${uuidV4()}', 'José Boiteux', '${state.id}'),
          ('${uuidV4()}', 'Jupiá', '${state.id}'),
          ('${uuidV4()}', 'Lacerdópolis', '${state.id}'),
          ('${uuidV4()}', 'Lages', '${state.id}'),
          ('${uuidV4()}', 'Laguna', '${state.id}'),
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