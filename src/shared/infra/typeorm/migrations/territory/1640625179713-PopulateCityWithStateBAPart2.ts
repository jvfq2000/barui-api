import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "BA";

export class PopulateCityWithStateBAPart21640625179713
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
        INSERT INTO
          "city" (id, name, state_id)
        VALUES
          ('${uuidV4()}', 'Itiúba', '${state.id}'),
          ('${uuidV4()}', 'Itororó', '${state.id}'),
          ('${uuidV4()}', 'Ituaçu', '${state.id}'),
          ('${uuidV4()}', 'Ituberá', '${state.id}'),
          ('${uuidV4()}', 'Iuiú', '${state.id}'),
          ('${uuidV4()}', 'Jaborandi', '${state.id}'),
          ('${uuidV4()}', 'Jacaraci', '${state.id}'),
          ('${uuidV4()}', 'Jacobina', '${state.id}'),
          ('${uuidV4()}', 'Jaguaquara', '${state.id}'),
          ('${uuidV4()}', 'Jaguarari', '${state.id}'),
          ('${uuidV4()}', 'Jaguaripe', '${state.id}'),
          ('${uuidV4()}', 'Jandaíra', '${state.id}'),
          ('${uuidV4()}', 'Jequié', '${state.id}'),
          ('${uuidV4()}', 'Jeremoabo', '${state.id}'),
          ('${uuidV4()}', 'Jiquiriçá', '${state.id}'),
          ('${uuidV4()}', 'Jitaúna', '${state.id}'),
          ('${uuidV4()}', 'João Dourado', '${state.id}'),
          ('${uuidV4()}', 'Juazeiro', '${state.id}'),
          ('${uuidV4()}', 'Jucuruçu', '${state.id}'),
          ('${uuidV4()}', 'Jussara', '${state.id}'),
          ('${uuidV4()}', 'Jussari', '${state.id}'),
          ('${uuidV4()}', 'Jussiape', '${state.id}'),
          ('${uuidV4()}', 'Lafaiete Coutinho', '${state.id}'),
          ('${uuidV4()}', 'Lagoa Real', '${state.id}'),
          ('${uuidV4()}', 'Laje', '${state.id}'),
          ('${uuidV4()}', 'Lajedão', '${state.id}'),
          ('${uuidV4()}', 'Lajedinho', '${state.id}'),
          ('${uuidV4()}', 'Lajedo do Tabocal', '${state.id}'),
          ('${uuidV4()}', 'Lamarão', '${state.id}'),
          ('${uuidV4()}', 'Lapão', '${state.id}'),
          ('${uuidV4()}', 'Lauro de Freitas', '${state.id}'),
          ('${uuidV4()}', 'Lençóis', '${state.id}'),
          ('${uuidV4()}', 'Licínio de Almeida', '${state.id}'),
          ('${uuidV4()}', 'Livramento de Nossa Senhora', '${state.id}'),
          ('${uuidV4()}', 'Luís Eduardo Magalhães', '${state.id}'),
          ('${uuidV4()}', 'Macajuba', '${state.id}'),
          ('${uuidV4()}', 'Macarani', '${state.id}'),
          ('${uuidV4()}', 'Macaúbas', '${state.id}'),
          ('${uuidV4()}', 'Macururé', '${state.id}'),
          ('${uuidV4()}', 'Madre de Deus', '${state.id}'),
          ('${uuidV4()}', 'Maetinga', '${state.id}'),
          ('${uuidV4()}', 'Maiquinique', '${state.id}'),
          ('${uuidV4()}', 'Mairi', '${state.id}'),
          ('${uuidV4()}', 'Malhada', '${state.id}'),
          ('${uuidV4()}', 'Malhada de Pedras', '${state.id}'),
          ('${uuidV4()}', 'Manoel Vitorino', '${state.id}'),
          ('${uuidV4()}', 'Mansidão', '${state.id}'),
          ('${uuidV4()}', 'Maracás', '${state.id}'),
          ('${uuidV4()}', 'Maragogipe', '${state.id}'),
          ('${uuidV4()}', 'Maraú', '${state.id}'),
          ('${uuidV4()}', 'Marcionílio Souza', '${state.id}'),
          ('${uuidV4()}', 'Mascote', '${state.id}'),
          ('${uuidV4()}', 'Mata de São João', '${state.id}'),
          ('${uuidV4()}', 'Matina', '${state.id}'),
          ('${uuidV4()}', 'Medeiros Neto', '${state.id}'),
          ('${uuidV4()}', 'Miguel Calmon', '${state.id}'),
          ('${uuidV4()}', 'Milagres', '${state.id}'),
          ('${uuidV4()}', 'Mirangaba', '${state.id}'),
          ('${uuidV4()}', 'Mirante', '${state.id}'),
          ('${uuidV4()}', 'Monte Santo', '${state.id}'),
          ('${uuidV4()}', 'Morpará', '${state.id}'),
          ('${uuidV4()}', 'Morro do Chapéu', '${state.id}'),
          ('${uuidV4()}', 'Mortugaba', '${state.id}'),
          ('${uuidV4()}', 'Mucugê', '${state.id}'),
          ('${uuidV4()}', 'Mucuri', '${state.id}'),
          ('${uuidV4()}', 'Mulungu do Morro', '${state.id}'),
          ('${uuidV4()}', 'Mundo Novo', '${state.id}'),
          ('${uuidV4()}', 'Muniz Ferreira', '${state.id}'),
          ('${uuidV4()}', 'Muquém de São Francisco', '${state.id}'),
          ('${uuidV4()}', 'Muritiba', '${state.id}'),
          ('${uuidV4()}', 'Mutuípe', '${state.id}'),
          ('${uuidV4()}', 'Nazaré', '${state.id}'),
          ('${uuidV4()}', 'Nilo Peçanha', '${state.id}'),
          ('${uuidV4()}', 'Nordestina', '${state.id}'),
          ('${uuidV4()}', 'Nova Canaã', '${state.id}'),
          ('${uuidV4()}', 'Nova Fátima', '${state.id}'),
          ('${uuidV4()}', 'Nova Ibiá', '${state.id}'),
          ('${uuidV4()}', 'Nova Itarana', '${state.id}'),
          ('${uuidV4()}', 'Nova Redenção', '${state.id}'),
          ('${uuidV4()}', 'Nova Soure', '${state.id}'),
          ('${uuidV4()}', 'Nova Viçosa', '${state.id}'),
          ('${uuidV4()}', 'Novo Horizonte', '${state.id}'),
          ('${uuidV4()}', 'Novo Triunfo', '${state.id}'),
          ('${uuidV4()}', 'Olindina', '${state.id}'),
          ('${uuidV4()}', 'Oliveira dos Brejinhos', '${state.id}'),
          ('${uuidV4()}', 'Ouriçangas', '${state.id}'),
          ('${uuidV4()}', 'Ourolândia', '${state.id}'),
          ('${uuidV4()}', 'Palmas de Monte Alto', '${state.id}'),
          ('${uuidV4()}', 'Palmeiras', '${state.id}'),
          ('${uuidV4()}', 'Paramirim', '${state.id}'),
          ('${uuidV4()}', 'Paratinga', '${state.id}'),
          ('${uuidV4()}', 'Paripiranga', '${state.id}'),
          ('${uuidV4()}', 'Pau Brasil', '${state.id}'),
          ('${uuidV4()}', 'Paulo Afonso', '${state.id}'),
          ('${uuidV4()}', 'Pé de Serra', '${state.id}'),
          ('${uuidV4()}', 'Pedrão', '${state.id}'),
          ('${uuidV4()}', 'Pedro Alexandre', '${state.id}'),
          ('${uuidV4()}', 'Piatã', '${state.id}'),
          ('${uuidV4()}', 'Pilão Arcado', '${state.id}'),
          ('${uuidV4()}', 'Pindaí', '${state.id}'),
          ('${uuidV4()}', 'Pindobaçu', '${state.id}'),
          ('${uuidV4()}', 'Pintadas', '${state.id}'),
          ('${uuidV4()}', 'Piraí do Norte', '${state.id}'),
          ('${uuidV4()}', 'Piripá', '${state.id}'),
          ('${uuidV4()}', 'Piritiba', '${state.id}'),
          ('${uuidV4()}', 'Planaltino', '${state.id}'),
          ('${uuidV4()}', 'Planalto', '${state.id}'),
          ('${uuidV4()}', 'Poções', '${state.id}'),
          ('${uuidV4()}', 'Pojuca', '${state.id}'),
          ('${uuidV4()}', 'Ponto Novo', '${state.id}'),
          ('${uuidV4()}', 'Porto Seguro', '${state.id}'),
          ('${uuidV4()}', 'Potiraguá', '${state.id}'),
          ('${uuidV4()}', 'Prado', '${state.id}'),
          ('${uuidV4()}', 'Presidente Dutra', '${state.id}'),
          ('${uuidV4()}', 'Presidente Jânio Quadros', '${state.id}'),
          ('${uuidV4()}', 'Presidente Tancredo Neves', '${state.id}'),
          ('${uuidV4()}', 'Queimadas', '${state.id}'),
          ('${uuidV4()}', 'Quijingue', '${state.id}'),
          ('${uuidV4()}', 'Quixabeira', '${state.id}'),
          ('${uuidV4()}', 'Rafael Jambeiro', '${state.id}'),
          ('${uuidV4()}', 'Remanso', '${state.id}'),
          ('${uuidV4()}', 'Retirolândia', '${state.id}'),
          ('${uuidV4()}', 'Riachão das Neves', '${state.id}'),
          ('${uuidV4()}', 'Riachão do Jacuípe', '${state.id}'),
          ('${uuidV4()}', 'Riacho de Santana', '${state.id}'),
          ('${uuidV4()}', 'Ribeira do Amparo', '${state.id}'),
          ('${uuidV4()}', 'Ribeira do Pombal', '${state.id}'),
          ('${uuidV4()}', 'Ribeirão do Largo', '${state.id}'),
          ('${uuidV4()}', 'Rio de Contas', '${state.id}'),
          ('${uuidV4()}', 'Rio do Antônio', '${state.id}'),
          ('${uuidV4()}', 'Rio do Pires', '${state.id}'),
          ('${uuidV4()}', 'Rio Real', '${state.id}'),
          ('${uuidV4()}', 'Rodelas', '${state.id}'),
          ('${uuidV4()}', 'Ruy Barbosa', '${state.id}'),
          ('${uuidV4()}', 'Salinas da Margarida', '${state.id}'),
          ('${uuidV4()}', 'Salvador', '${state.id}'),
          ('${uuidV4()}', 'Santa Bárbara', '${state.id}'),
          ('${uuidV4()}', 'Santa Brígida', '${state.id}'),
          ('${uuidV4()}', 'Santa Cruz Cabrália', '${state.id}'),
          ('${uuidV4()}', 'Santa Cruz da Vitória', '${state.id}'),
          ('${uuidV4()}', 'Santa Inês', '${state.id}'),
          ('${uuidV4()}', 'Santa Luzia', '${state.id}'),
          ('${uuidV4()}', 'Santa Maria da Vitória', '${state.id}'),
          ('${uuidV4()}', 'Santa Rita de Cássia', '${state.id}'),
          ('${uuidV4()}', 'Santa Teresinha', '${state.id}'),
          ('${uuidV4()}', 'Santaluz', '${state.id}'),
          ('${uuidV4()}', 'Santana', '${state.id}'),
          ('${uuidV4()}', 'Santanópolis', '${state.id}'),
          ('${uuidV4()}', 'Santo Amaro', '${state.id}'),
          ('${uuidV4()}', 'Santo Antônio de Jesus', '${state.id}'),
          ('${uuidV4()}', 'Santo Estêvão', '${state.id}'),
          ('${uuidV4()}', 'São Desidério', '${state.id}'),
          ('${uuidV4()}', 'São Domingos', '${state.id}'),
          ('${uuidV4()}', 'São Felipe', '${state.id}'),
          ('${uuidV4()}', 'São Félix', '${state.id}'),
          ('${uuidV4()}', 'São Félix do Coribe', '${state.id}'),
          ('${uuidV4()}', 'São Francisco do Conde', '${state.id}'),
          ('${uuidV4()}', 'São Gabriel', '${state.id}'),
          ('${uuidV4()}', 'São Gonçalo dos Campos', '${state.id}'),
          ('${uuidV4()}', 'São José da Vitória', '${state.id}'),
          ('${uuidV4()}', 'São José do Jacuípe', '${state.id}'),
          ('${uuidV4()}', 'São Miguel das Matas', '${state.id}'),
          ('${uuidV4()}', 'São Sebastião do Passé', '${state.id}'),
          ('${uuidV4()}', 'Sapeaçu', '${state.id}'),
          ('${uuidV4()}', 'Sátiro Dias', '${state.id}'),
          ('${uuidV4()}', 'Saubara', '${state.id}'),
          ('${uuidV4()}', 'Saúde', '${state.id}'),
          ('${uuidV4()}', 'Seabra', '${state.id}'),
          ('${uuidV4()}', 'Sebastião Laranjeiras', '${state.id}'),
          ('${uuidV4()}', 'Senhor do Bonfim', '${state.id}'),
          ('${uuidV4()}', 'Sento Sé', '${state.id}'),
          ('${uuidV4()}', 'Serra do Ramalho', '${state.id}'),
          ('${uuidV4()}', 'Serra Dourada', '${state.id}'),
          ('${uuidV4()}', 'Serra Preta', '${state.id}'),
          ('${uuidV4()}', 'Serrinha', '${state.id}'),
          ('${uuidV4()}', 'Serrolândia', '${state.id}'),
          ('${uuidV4()}', 'Simões Filho', '${state.id}'),
          ('${uuidV4()}', 'Sítio do Mato', '${state.id}'),
          ('${uuidV4()}', 'Sítio do Quinto', '${state.id}'),
          ('${uuidV4()}', 'Sobradinho', '${state.id}'),
          ('${uuidV4()}', 'Souto Soares', '${state.id}'),
          ('${uuidV4()}', 'Tabocas do Brejo Velho', '${state.id}'),
          ('${uuidV4()}', 'Tanhaçu', '${state.id}'),
          ('${uuidV4()}', 'Tanque Novo', '${state.id}'),
          ('${uuidV4()}', 'Tanquinho', '${state.id}'),
          ('${uuidV4()}', 'Taperoá', '${state.id}'),
          ('${uuidV4()}', 'Tapiramutá', '${state.id}'),
          ('${uuidV4()}', 'Teixeira de Freitas', '${state.id}'),
          ('${uuidV4()}', 'Teodoro Sampaio', '${state.id}'),
          ('${uuidV4()}', 'Teofilândia', '${state.id}'),
          ('${uuidV4()}', 'Teolândia', '${state.id}'),
          ('${uuidV4()}', 'Terra Nova', '${state.id}'),
          ('${uuidV4()}', 'Tremedal', '${state.id}'),
          ('${uuidV4()}', 'Tucano', '${state.id}'),
          ('${uuidV4()}', 'Uauá', '${state.id}'),
          ('${uuidV4()}', 'Ubaíra', '${state.id}'),
          ('${uuidV4()}', 'Ubaitaba', '${state.id}'),
          ('${uuidV4()}', 'Ubatã', '${state.id}'),
          ('${uuidV4()}', 'Uibaí', '${state.id}'),
          ('${uuidV4()}', 'Umburanas', '${state.id}'),
          ('${uuidV4()}', 'Una', '${state.id}'),
          ('${uuidV4()}', 'Urandi', '${state.id}'),
          ('${uuidV4()}', 'Uruçuca', '${state.id}'),
          ('${uuidV4()}', 'Utinga', '${state.id}'),
          ('${uuidV4()}', 'Valença', '${state.id}'),
          ('${uuidV4()}', 'Valente', '${state.id}'),
          ('${uuidV4()}', 'Várzea da Roça', '${state.id}'),
          ('${uuidV4()}', 'Várzea do Poço', '${state.id}'),
          ('${uuidV4()}', 'Várzea Nova', '${state.id}'),
          ('${uuidV4()}', 'Varzedo', '${state.id}'),
          ('${uuidV4()}', 'Vera Cruz', '${state.id}'),
          ('${uuidV4()}', 'Vereda', '${state.id}'),
          ('${uuidV4()}', 'Vitória da Conquista', '${state.id}'),
          ('${uuidV4()}', 'Wagner', '${state.id}'),
          ('${uuidV4()}', 'Wanderley', '${state.id}'),
          ('${uuidV4()}', 'Wenceslau Guimarães', '${state.id}'),
          ('${uuidV4()}', 'Xique-Xique', '${state.id}')
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