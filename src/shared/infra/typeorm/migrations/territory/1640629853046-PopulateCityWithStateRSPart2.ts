import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "RS";

export class PopulateCityWithStateRSPart21640629853046
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
        INSERT INTO
          "city" (id, name, state_id)
        VALUES
          ('${uuidV4()}', 'Maratá', '${state.id}'),
          ('${uuidV4()}', 'Marau', '${state.id}'),
          ('${uuidV4()}', 'Marcelino Ramos', '${state.id}'),
          ('${uuidV4()}', 'Mariana Pimentel', '${state.id}'),
          ('${uuidV4()}', 'Mariano Moro', '${state.id}'),
          ('${uuidV4()}', 'Marques de Souza', '${state.id}'),
          ('${uuidV4()}', 'Mata', '${state.id}'),
          ('${uuidV4()}', 'Mato Castelhano', '${state.id}'),
          ('${uuidV4()}', 'Mato Leitão', '${state.id}'),
          ('${uuidV4()}', 'Mato Queimado', '${state.id}'),
          ('${uuidV4()}', 'Maximiliano de Almeida', '${state.id}'),
          ('${uuidV4()}', 'Minas do Leão', '${state.id}'),
          ('${uuidV4()}', 'Miraguaí', '${state.id}'),
          ('${uuidV4()}', 'Montauri', '${state.id}'),
          ('${uuidV4()}', 'Monte Alegre dos Campos', '${state.id}'),
          ('${uuidV4()}', 'Monte Belo do Sul', '${state.id}'),
          ('${uuidV4()}', 'Montenegro', '${state.id}'),
          ('${uuidV4()}', 'Mormaço', '${state.id}'),
          ('${uuidV4()}', 'Morrinhos do Sul', '${state.id}'),
          ('${uuidV4()}', 'Morro Redondo', '${state.id}'),
          ('${uuidV4()}', 'Morro Reuter', '${state.id}'),
          ('${uuidV4()}', 'Mostardas', '${state.id}'),
          ('${uuidV4()}', 'Muçum', '${state.id}'),
          ('${uuidV4()}', 'Muitos Capões', '${state.id}'),
          ('${uuidV4()}', 'Muliterno', '${state.id}'),
          ('${uuidV4()}', 'Não-Me-Toque', '${state.id}'),
          ('${uuidV4()}', 'Nicolau Vergueiro', '${state.id}'),
          ('${uuidV4()}', 'Nonoai', '${state.id}'),
          ('${uuidV4()}', 'Nova Alvorada', '${state.id}'),
          ('${uuidV4()}', 'Nova Araçá', '${state.id}'),
          ('${uuidV4()}', 'Nova Bassano', '${state.id}'),
          ('${uuidV4()}', 'Nova Boa Vista', '${state.id}'),
          ('${uuidV4()}', 'Nova Bréscia', '${state.id}'),
          ('${uuidV4()}', 'Nova Candelária', '${state.id}'),
          ('${uuidV4()}', 'Nova Esperança do Sul', '${state.id}'),
          ('${uuidV4()}', 'Nova Hartz', '${state.id}'),
          ('${uuidV4()}', 'Nova Pádua', '${state.id}'),
          ('${uuidV4()}', 'Nova Palma', '${state.id}'),
          ('${uuidV4()}', 'Nova Petrópolis', '${state.id}'),
          ('${uuidV4()}', 'Nova Prata', '${state.id}'),
          ('${uuidV4()}', 'Nova Ramada', '${state.id}'),
          ('${uuidV4()}', 'Nova Roma do Sul', '${state.id}'),
          ('${uuidV4()}', 'Nova Santa Rita', '${state.id}'),
          ('${uuidV4()}', 'Novo Barreiro', '${state.id}'),
          ('${uuidV4()}', 'Novo Cabrais', '${state.id}'),
          ('${uuidV4()}', 'Novo Hamburgo', '${state.id}'),
          ('${uuidV4()}', 'Novo Machado', '${state.id}'),
          ('${uuidV4()}', 'Novo Tiradentes', '${state.id}'),
          ('${uuidV4()}', 'Novo Xingu', '${state.id}'),
          ('${uuidV4()}', 'Osório', '${state.id}'),
          ('${uuidV4()}', 'Paim Filho', '${state.id}'),
          ('${uuidV4()}', 'Palmares do Sul', '${state.id}'),
          ('${uuidV4()}', 'Palmeira das Missões', '${state.id}'),
          ('${uuidV4()}', 'Palmitinho', '${state.id}'),
          ('${uuidV4()}', 'Panambi', '${state.id}'),
          ('${uuidV4()}', 'Pantano Grande', '${state.id}'),
          ('${uuidV4()}', 'Paraí', '${state.id}'),
          ('${uuidV4()}', 'Paraíso do Sul', '${state.id}'),
          ('${uuidV4()}', 'Pareci Novo', '${state.id}'),
          ('${uuidV4()}', 'Parobé', '${state.id}'),
          ('${uuidV4()}', 'Passa Sete', '${state.id}'),
          ('${uuidV4()}', 'Passo do Sobrado', '${state.id}'),
          ('${uuidV4()}', 'Passo Fundo', '${state.id}'),
          ('${uuidV4()}', 'Paulo Bento', '${state.id}'),
          ('${uuidV4()}', 'Paverama', '${state.id}'),
          ('${uuidV4()}', 'Pedras Altas', '${state.id}'),
          ('${uuidV4()}', 'Pedro Osório', '${state.id}'),
          ('${uuidV4()}', 'Pejuçara', '${state.id}'),
          ('${uuidV4()}', 'Pelotas', '${state.id}'),
          ('${uuidV4()}', 'Picada Café', '${state.id}'),
          ('${uuidV4()}', 'Pinhal', '${state.id}'),
          ('${uuidV4()}', 'Pinhal da Serra', '${state.id}'),
          ('${uuidV4()}', 'Pinhal Grande', '${state.id}'),
          ('${uuidV4()}', 'Pinheirinho do Vale', '${state.id}'),
          ('${uuidV4()}', 'Pinheiro Machado', '${state.id}'),
          ('${uuidV4()}', 'Pirapó', '${state.id}'),
          ('${uuidV4()}', 'Piratini', '${state.id}'),
          ('${uuidV4()}', 'Planalto', '${state.id}'),
          ('${uuidV4()}', 'Poço das Antas', '${state.id}'),
          ('${uuidV4()}', 'Pontão', '${state.id}'),
          ('${uuidV4()}', 'Ponte Preta', '${state.id}'),
          ('${uuidV4()}', 'Portão', '${state.id}'),
          ('${uuidV4()}', 'Porto Alegre', '${state.id}'),
          ('${uuidV4()}', 'Porto Lucena', '${state.id}'),
          ('${uuidV4()}', 'Porto Mauá', '${state.id}'),
          ('${uuidV4()}', 'Porto Vera Cruz', '${state.id}'),
          ('${uuidV4()}', 'Porto Xavier', '${state.id}'),
          ('${uuidV4()}', 'Pouso Novo', '${state.id}'),
          ('${uuidV4()}', 'Presidente Lucena', '${state.id}'),
          ('${uuidV4()}', 'Progresso', '${state.id}'),
          ('${uuidV4()}', 'Protásio Alves', '${state.id}'),
          ('${uuidV4()}', 'Putinga', '${state.id}'),
          ('${uuidV4()}', 'Quaraí', '${state.id}'),
          ('${uuidV4()}', 'Quatro Irmãos', '${state.id}'),
          ('${uuidV4()}', 'Quevedos', '${state.id}'),
          ('${uuidV4()}', 'Quinze de Novembro', '${state.id}'),
          ('${uuidV4()}', 'Redentora', '${state.id}'),
          ('${uuidV4()}', 'Relvado', '${state.id}'),
          ('${uuidV4()}', 'Restinga Seca', '${state.id}'),
          ('${uuidV4()}', 'Rio dos Índios', '${state.id}'),
          ('${uuidV4()}', 'Rio Grande', '${state.id}'),
          ('${uuidV4()}', 'Rio Pardo', '${state.id}'),
          ('${uuidV4()}', 'Riozinho', '${state.id}'),
          ('${uuidV4()}', 'Roca Sales', '${state.id}'),
          ('${uuidV4()}', 'Rodeio Bonito', '${state.id}'),
          ('${uuidV4()}', 'Rolador', '${state.id}'),
          ('${uuidV4()}', 'Rolante', '${state.id}'),
          ('${uuidV4()}', 'Ronda Alta', '${state.id}'),
          ('${uuidV4()}', 'Rondinha', '${state.id}'),
          ('${uuidV4()}', 'Roque Gonzales', '${state.id}'),
          ('${uuidV4()}', 'Rosário do Sul', '${state.id}'),
          ('${uuidV4()}', 'Sagrada Família', '${state.id}'),
          ('${uuidV4()}', 'Saldanha Marinho', '${state.id}'),
          ('${uuidV4()}', 'Salto do Jacuí', '${state.id}'),
          ('${uuidV4()}', 'Salvador das Missões', '${state.id}'),
          ('${uuidV4()}', 'Salvador do Sul', '${state.id}'),
          ('${uuidV4()}', 'Sananduva', '${state.id}'),
          ('${uuidV4()}', 'Santa Bárbara do Sul', '${state.id}'),
          ('${uuidV4()}', 'Santa Cecília do Sul', '${state.id}'),
          ('${uuidV4()}', 'Santa Clara do Sul', '${state.id}'),
          ('${uuidV4()}', 'Santa Cruz do Sul', '${state.id}'),
          ('${uuidV4()}', 'Santa Margarida do Sul', '${state.id}'),
          ('${uuidV4()}', 'Santa Maria', '${state.id}'),
          ('${uuidV4()}', 'Santa Maria do Herval', '${state.id}'),
          ('${uuidV4()}', 'Santa Rosa', '${state.id}'),
          ('${uuidV4()}', 'Santa Tereza', '${state.id}'),
          ('${uuidV4()}', 'Santa Vitória do Palmar', '${state.id}'),
          ('${uuidV4()}', 'Santana da Boa Vista', '${state.id}'),
          ('${uuidV4()}', 'Santana do Livramento', '${state.id}'),
          ('${uuidV4()}', 'Santiago', '${state.id}'),
          ('${uuidV4()}', 'Santo Ângelo', '${state.id}'),
          ('${uuidV4()}', 'Santo Antônio da Patrulha', '${state.id}'),
          ('${uuidV4()}', 'Santo Antônio das Missões', '${state.id}'),
          ('${uuidV4()}', 'Santo Antônio do Palma', '${state.id}'),
          ('${uuidV4()}', 'Santo Antônio do Planalto', '${state.id}'),
          ('${uuidV4()}', 'Santo Augusto', '${state.id}'),
          ('${uuidV4()}', 'Santo Cristo', '${state.id}'),
          ('${uuidV4()}', 'Santo Expedito do Sul', '${state.id}'),
          ('${uuidV4()}', 'São Borja', '${state.id}'),
          ('${uuidV4()}', 'São Domingos do Sul', '${state.id}'),
          ('${uuidV4()}', 'São Francisco de Assis', '${state.id}'),
          ('${uuidV4()}', 'São Francisco de Paula', '${state.id}'),
          ('${uuidV4()}', 'São Gabriel', '${state.id}'),
          ('${uuidV4()}', 'São Jerônimo', '${state.id}'),
          ('${uuidV4()}', 'São João da Urtiga', '${state.id}'),
          ('${uuidV4()}', 'São João do Polêsine', '${state.id}'),
          ('${uuidV4()}', 'São Jorge', '${state.id}'),
          ('${uuidV4()}', 'São José das Missões', '${state.id}'),
          ('${uuidV4()}', 'São José do Herval', '${state.id}'),
          ('${uuidV4()}', 'São José do Hortêncio', '${state.id}'),
          ('${uuidV4()}', 'São José do Inhacorá', '${state.id}'),
          ('${uuidV4()}', 'São José do Norte', '${state.id}'),
          ('${uuidV4()}', 'São José do Ouro', '${state.id}'),
          ('${uuidV4()}', 'São José do Sul', '${state.id}'),
          ('${uuidV4()}', 'São José dos Ausentes', '${state.id}'),
          ('${uuidV4()}', 'São Leopoldo', '${state.id}'),
          ('${uuidV4()}', 'São Lourenço do Sul', '${state.id}'),
          ('${uuidV4()}', 'São Luiz Gonzaga', '${state.id}'),
          ('${uuidV4()}', 'São Marcos', '${state.id}'),
          ('${uuidV4()}', 'São Martinho', '${state.id}'),
          ('${uuidV4()}', 'São Martinho da Serra', '${state.id}'),
          ('${uuidV4()}', 'São Miguel das Missões', '${state.id}'),
          ('${uuidV4()}', 'São Nicolau', '${state.id}'),
          ('${uuidV4()}', 'São Paulo das Missões', '${state.id}'),
          ('${uuidV4()}', 'São Pedro da Serra', '${state.id}'),
          ('${uuidV4()}', 'São Pedro das Missões', '${state.id}'),
          ('${uuidV4()}', 'São Pedro do Butiá', '${state.id}'),
          ('${uuidV4()}', 'São Pedro do Sul', '${state.id}'),
          ('${uuidV4()}', 'São Sebastião do Caí', '${state.id}'),
          ('${uuidV4()}', 'São Sepé', '${state.id}'),
          ('${uuidV4()}', 'São Valentim', '${state.id}'),
          ('${uuidV4()}', 'São Valentim do Sul', '${state.id}'),
          ('${uuidV4()}', 'São Valério do Sul', '${state.id}'),
          ('${uuidV4()}', 'São Vendelino', '${state.id}'),
          ('${uuidV4()}', 'São Vicente do Sul', '${state.id}'),
          ('${uuidV4()}', 'Sapiranga', '${state.id}'),
          ('${uuidV4()}', 'Sapucaia do Sul', '${state.id}'),
          ('${uuidV4()}', 'Sarandi', '${state.id}'),
          ('${uuidV4()}', 'Seberi', '${state.id}'),
          ('${uuidV4()}', 'Sede Nova', '${state.id}'),
          ('${uuidV4()}', 'Segredo', '${state.id}'),
          ('${uuidV4()}', 'Selbach', '${state.id}'),
          ('${uuidV4()}', 'Senador Salgado Filho', '${state.id}'),
          ('${uuidV4()}', 'Sentinela do Sul', '${state.id}'),
          ('${uuidV4()}', 'Serafina Corrêa', '${state.id}'),
          ('${uuidV4()}', 'Sério', '${state.id}'),
          ('${uuidV4()}', 'Sertão', '${state.id}'),
          ('${uuidV4()}', 'Sertão Santana', '${state.id}'),
          ('${uuidV4()}', 'Sete de Setembro', '${state.id}'),
          ('${uuidV4()}', 'Severiano de Almeida', '${state.id}'),
          ('${uuidV4()}', 'Silveira Martins', '${state.id}'),
          ('${uuidV4()}', 'Sinimbu', '${state.id}'),
          ('${uuidV4()}', 'Sobradinho', '${state.id}'),
          ('${uuidV4()}', 'Soledade', '${state.id}'),
          ('${uuidV4()}', 'Tabaí', '${state.id}'),
          ('${uuidV4()}', 'Tapejara', '${state.id}'),
          ('${uuidV4()}', 'Tapera', '${state.id}'),
          ('${uuidV4()}', 'Tapes', '${state.id}'),
          ('${uuidV4()}', 'Taquara', '${state.id}'),
          ('${uuidV4()}', 'Taquari', '${state.id}'),
          ('${uuidV4()}', 'Taquaruçu do Sul', '${state.id}'),
          ('${uuidV4()}', 'Tavares', '${state.id}'),
          ('${uuidV4()}', 'Tenente Portela', '${state.id}'),
          ('${uuidV4()}', 'Terra de Areia', '${state.id}'),
          ('${uuidV4()}', 'Teutônia', '${state.id}'),
          ('${uuidV4()}', 'Tio Hugo', '${state.id}'),
          ('${uuidV4()}', 'Tiradentes do Sul', '${state.id}'),
          ('${uuidV4()}', 'Toropi', '${state.id}'),
          ('${uuidV4()}', 'Torres', '${state.id}'),
          ('${uuidV4()}', 'Tramandaí', '${state.id}'),
          ('${uuidV4()}', 'Travesseiro', '${state.id}'),
          ('${uuidV4()}', 'Três Arroios', '${state.id}'),
          ('${uuidV4()}', 'Três Cachoeiras', '${state.id}'),
          ('${uuidV4()}', 'Três Coroas', '${state.id}'),
          ('${uuidV4()}', 'Três de Maio', '${state.id}'),
          ('${uuidV4()}', 'Três Forquilhas', '${state.id}'),
          ('${uuidV4()}', 'Três Palmeiras', '${state.id}'),
          ('${uuidV4()}', 'Três Passos', '${state.id}'),
          ('${uuidV4()}', 'Trindade do Sul', '${state.id}'),
          ('${uuidV4()}', 'Triunfo', '${state.id}'),
          ('${uuidV4()}', 'Tucunduva', '${state.id}'),
          ('${uuidV4()}', 'Tunas', '${state.id}'),
          ('${uuidV4()}', 'Tupanci do Sul', '${state.id}'),
          ('${uuidV4()}', 'Tupanciretã', '${state.id}'),
          ('${uuidV4()}', 'Tupandi', '${state.id}'),
          ('${uuidV4()}', 'Tuparendi', '${state.id}'),
          ('${uuidV4()}', 'Turuçu', '${state.id}'),
          ('${uuidV4()}', 'Ubiretama', '${state.id}'),
          ('${uuidV4()}', 'União da Serra', '${state.id}'),
          ('${uuidV4()}', 'Unistalda', '${state.id}'),
          ('${uuidV4()}', 'Uruguaiana', '${state.id}'),
          ('${uuidV4()}', 'Vacaria', '${state.id}'),
          ('${uuidV4()}', 'Vale do Sol', '${state.id}'),
          ('${uuidV4()}', 'Vale Real', '${state.id}'),
          ('${uuidV4()}', 'Vale Verde', '${state.id}'),
          ('${uuidV4()}', 'Vanini', '${state.id}'),
          ('${uuidV4()}', 'Venâncio Aires', '${state.id}'),
          ('${uuidV4()}', 'Vera Cruz', '${state.id}'),
          ('${uuidV4()}', 'Veranópolis', '${state.id}'),
          ('${uuidV4()}', 'Vespasiano Correa', '${state.id}'),
          ('${uuidV4()}', 'Viadutos', '${state.id}'),
          ('${uuidV4()}', 'Viamão', '${state.id}'),
          ('${uuidV4()}', 'Vicente Dutra', '${state.id}'),
          ('${uuidV4()}', 'Victor Graeff', '${state.id}'),
          ('${uuidV4()}', 'Vila Flores', '${state.id}'),
          ('${uuidV4()}', 'Vila Lângaro', '${state.id}'),
          ('${uuidV4()}', 'Vila Maria', '${state.id}'),
          ('${uuidV4()}', 'Vila Nova do Sul', '${state.id}'),
          ('${uuidV4()}', 'Vista Alegre', '${state.id}'),
          ('${uuidV4()}', 'Vista Alegre do Prata', '${state.id}'),
          ('${uuidV4()}', 'Vista Gaúcha', '${state.id}'),
          ('${uuidV4()}', 'Vitória das Missões', '${state.id}'),
          ('${uuidV4()}', 'Westfália', '${state.id}'),
          ('${uuidV4()}', 'Xangri-lá', '${state.id}')
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