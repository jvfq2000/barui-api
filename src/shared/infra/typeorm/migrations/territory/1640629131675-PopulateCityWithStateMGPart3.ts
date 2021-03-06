import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "MG";

export class PopulateCityWithStateMGPart31640629131675
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
            INSERT INTO
              "city" (id, name, state_id)
            VALUES
            ('${uuidV4()}', 'Padre Paraíso', '${state.id}'),
            ('${uuidV4()}', 'Pai Pedro', '${state.id}'),
            ('${uuidV4()}', 'Paineiras', '${state.id}'),
            ('${uuidV4()}', 'Pains', '${state.id}'),
            ('${uuidV4()}', 'Paiva', '${state.id}'),
            ('${uuidV4()}', 'Palma', '${state.id}'),
            ('${uuidV4()}', 'Palmópolis', '${state.id}'),
            ('${uuidV4()}', 'Papagaios', '${state.id}'),
            ('${uuidV4()}', 'Pará de Minas', '${state.id}'),
            ('${uuidV4()}', 'Paracatu', '${state.id}'),
            ('${uuidV4()}', 'Paraguaçu', '${state.id}'),
            ('${uuidV4()}', 'Paraisópolis', '${state.id}'),
            ('${uuidV4()}', 'Paraopeba', '${state.id}'),
            ('${uuidV4()}', 'Passa Quatro', '${state.id}'),
            ('${uuidV4()}', 'Passa Tempo', '${state.id}'),
            ('${uuidV4()}', 'Passabém', '${state.id}'),
            ('${uuidV4()}', 'Passa-Vinte', '${state.id}'),
            ('${uuidV4()}', 'Passos', '${state.id}'),
            ('${uuidV4()}', 'Patis', '${state.id}'),
            ('${uuidV4()}', 'Patos de Minas', '${state.id}'),
            ('${uuidV4()}', 'Patrocínio', '${state.id}'),
            ('${uuidV4()}', 'Patrocínio do Muriaé', '${state.id}'),
            ('${uuidV4()}', 'Paula Cândido', '${state.id}'),
            ('${uuidV4()}', 'Paulistas', '${state.id}'),
            ('${uuidV4()}', 'Pavão', '${state.id}'),
            ('${uuidV4()}', 'Peçanha', '${state.id}'),
            ('${uuidV4()}', 'Pedra Azul', '${state.id}'),
            ('${uuidV4()}', 'Pedra Bonita', '${state.id}'),
            ('${uuidV4()}', 'Pedra do Anta', '${state.id}'),
            ('${uuidV4()}', 'Pedra do Indaiá', '${state.id}'),
            ('${uuidV4()}', 'Pedra Dourada', '${state.id}'),
            ('${uuidV4()}', 'Pedralva', '${state.id}'),
            ('${uuidV4()}', 'Pedras de Maria da Cruz', '${state.id}'),
            ('${uuidV4()}', 'Pedrinópolis', '${state.id}'),
            ('${uuidV4()}', 'Pedro Leopoldo', '${state.id}'),
            ('${uuidV4()}', 'Pedro Teixeira', '${state.id}'),
            ('${uuidV4()}', 'Pequeri', '${state.id}'),
            ('${uuidV4()}', 'Pequi', '${state.id}'),
            ('${uuidV4()}', 'Perdigão', '${state.id}'),
            ('${uuidV4()}', 'Perdizes', '${state.id}'),
            ('${uuidV4()}', 'Perdões', '${state.id}'),
            ('${uuidV4()}', 'Periquito', '${state.id}'),
            ('${uuidV4()}', 'Pescador', '${state.id}'),
            ('${uuidV4()}', 'Piau', '${state.id}'),
            ('${uuidV4()}', 'Piedade de Caratinga', '${state.id}'),
            ('${uuidV4()}', 'Piedade de Ponte Nova', '${state.id}'),
            ('${uuidV4()}', 'Piedade do Rio Grande', '${state.id}'),
            ('${uuidV4()}', 'Piedade dos Gerais', '${state.id}'),
            ('${uuidV4()}', 'Pimenta', '${state.id}'),
            ('${uuidV4()}', 'Pingo-d´Água', '${state.id}'),
            ('${uuidV4()}', 'Pintópolis', '${state.id}'),
            ('${uuidV4()}', 'Piracema', '${state.id}'),
            ('${uuidV4()}', 'Pirajuba', '${state.id}'),
            ('${uuidV4()}', 'Piranga', '${state.id}'),
            ('${uuidV4()}', 'Piranguçu', '${state.id}'),
            ('${uuidV4()}', 'Piranguinho', '${state.id}'),
            ('${uuidV4()}', 'Pirapetinga', '${state.id}'),
            ('${uuidV4()}', 'Pirapora', '${state.id}'),
            ('${uuidV4()}', 'Piraúba', '${state.id}'),
            ('${uuidV4()}', 'Pitangui', '${state.id}'),
            ('${uuidV4()}', 'Piumhi', '${state.id}'),
            ('${uuidV4()}', 'Planura', '${state.id}'),
            ('${uuidV4()}', 'Poço Fundo', '${state.id}'),
            ('${uuidV4()}', 'Poços de Caldas', '${state.id}'),
            ('${uuidV4()}', 'Pocrane', '${state.id}'),
            ('${uuidV4()}', 'Pompéu', '${state.id}'),
            ('${uuidV4()}', 'Ponte Nova', '${state.id}'),
            ('${uuidV4()}', 'Ponto Chique', '${state.id}'),
            ('${uuidV4()}', 'Ponto dos Volantes', '${state.id}'),
            ('${uuidV4()}', 'Porteirinha', '${state.id}'),
            ('${uuidV4()}', 'Porto Firme', '${state.id}'),
            ('${uuidV4()}', 'Poté', '${state.id}'),
            ('${uuidV4()}', 'Pouso Alegre', '${state.id}'),
            ('${uuidV4()}', 'Pouso Alto', '${state.id}'),
            ('${uuidV4()}', 'Prados', '${state.id}'),
            ('${uuidV4()}', 'Prata', '${state.id}'),
            ('${uuidV4()}', 'Pratápolis', '${state.id}'),
            ('${uuidV4()}', 'Pratinha', '${state.id}'),
            ('${uuidV4()}', 'Presidente Bernardes', '${state.id}'),
            ('${uuidV4()}', 'Presidente Juscelino', '${state.id}'),
            ('${uuidV4()}', 'Presidente Kubitschek', '${state.id}'),
            ('${uuidV4()}', 'Presidente Olegário', '${state.id}'),
            ('${uuidV4()}', 'Prudente de Morais', '${state.id}'),
            ('${uuidV4()}', 'Quartel Geral', '${state.id}'),
            ('${uuidV4()}', 'Queluzito', '${state.id}'),
            ('${uuidV4()}', 'Raposos', '${state.id}'),
            ('${uuidV4()}', 'Raul Soares', '${state.id}'),
            ('${uuidV4()}', 'Recreio', '${state.id}'),
            ('${uuidV4()}', 'Reduto', '${state.id}'),
            ('${uuidV4()}', 'Resende Costa', '${state.id}'),
            ('${uuidV4()}', 'Resplendor', '${state.id}'),
            ('${uuidV4()}', 'Ressaquinha', '${state.id}'),
            ('${uuidV4()}', 'Riachinho', '${state.id}'),
            ('${uuidV4()}', 'Riacho dos Machados', '${state.id}'),
            ('${uuidV4()}', 'Ribeirão das Neves', '${state.id}'),
            ('${uuidV4()}', 'Ribeirão Vermelho', '${state.id}'),
            ('${uuidV4()}', 'Rio Acima', '${state.id}'),
            ('${uuidV4()}', 'Rio Casca', '${state.id}'),
            ('${uuidV4()}', 'Rio do Prado', '${state.id}'),
            ('${uuidV4()}', 'Rio Doce', '${state.id}'),
            ('${uuidV4()}', 'Rio Espera', '${state.id}'),
            ('${uuidV4()}', 'Rio Manso', '${state.id}'),
            ('${uuidV4()}', 'Rio Novo', '${state.id}'),
            ('${uuidV4()}', 'Rio Paranaíba', '${state.id}'),
            ('${uuidV4()}', 'Rio Pardo de Minas', '${state.id}'),
            ('${uuidV4()}', 'Rio Piracicaba', '${state.id}'),
            ('${uuidV4()}', 'Rio Pomba', '${state.id}'),
            ('${uuidV4()}', 'Rio Preto', '${state.id}'),
            ('${uuidV4()}', 'Rio Vermelho', '${state.id}'),
            ('${uuidV4()}', 'Ritápolis', '${state.id}'),
            ('${uuidV4()}', 'Rochedo de Minas', '${state.id}'),
            ('${uuidV4()}', 'Rodeiro', '${state.id}'),
            ('${uuidV4()}', 'Romaria', '${state.id}'),
            ('${uuidV4()}', 'Rosário da Limeira', '${state.id}'),
            ('${uuidV4()}', 'Rubelita', '${state.id}'),
            ('${uuidV4()}', 'Rubim', '${state.id}'),
            ('${uuidV4()}', 'Sabará', '${state.id}'),
            ('${uuidV4()}', 'Sabinópolis', '${state.id}'),
            ('${uuidV4()}', 'Sacramento', '${state.id}'),
            ('${uuidV4()}', 'Salinas', '${state.id}'),
            ('${uuidV4()}', 'Salto da Divisa', '${state.id}'),
            ('${uuidV4()}', 'Santa Bárbara', '${state.id}'),
            ('${uuidV4()}', 'Santa Bárbara do Leste', '${state.id}'),
            ('${uuidV4()}', 'Santa Bárbara do Monte Verde', '${state.id}'),
            ('${uuidV4()}', 'Santa Bárbara do Tugúrio', '${state.id}'),
            ('${uuidV4()}', 'Santa Cruz de Minas', '${state.id}'),
            ('${uuidV4()}', 'Santa Cruz de Salinas', '${state.id}'),
            ('${uuidV4()}', 'Santa Cruz do Escalvado', '${state.id}'),
            ('${uuidV4()}', 'Santa Efigênia de Minas', '${state.id}'),
            ('${uuidV4()}', 'Santa Fé de Minas', '${state.id}'),
            ('${uuidV4()}', 'Santa Helena de Minas', '${state.id}'),
            ('${uuidV4()}', 'Santa Juliana', '${state.id}'),
            ('${uuidV4()}', 'Santa Luzia', '${state.id}'),
            ('${uuidV4()}', 'Santa Margarida', '${state.id}'),
            ('${uuidV4()}', 'Santa Maria de Itabira', '${state.id}'),
            ('${uuidV4()}', 'Santa Maria do Salto', '${state.id}'),
            ('${uuidV4()}', 'Santa Maria do Suaçuí', '${state.id}'),
            ('${uuidV4()}', 'Santa Rita de Caldas', '${state.id}'),
            ('${uuidV4()}', 'Santa Rita de Ibitipoca', '${state.id}'),
            ('${uuidV4()}', 'Santa Rita de Jacutinga', '${state.id}'),
            ('${uuidV4()}', 'Santa Rita de Minas', '${state.id}'),
            ('${uuidV4()}', 'Santa Rita do Itueto', '${state.id}'),
            ('${uuidV4()}', 'Santa Rita do Sapucaí', '${state.id}'),
            ('${uuidV4()}', 'Santa Rosa da Serra', '${state.id}'),
            ('${uuidV4()}', 'Santa Vitória', '${state.id}'),
            ('${uuidV4()}', 'Santana da Vargem', '${state.id}'),
            ('${uuidV4()}', 'Santana de Cataguases', '${state.id}'),
            ('${uuidV4()}', 'Santana de Pirapama', '${state.id}'),
            ('${uuidV4()}', 'Santana do Deserto', '${state.id}'),
            ('${uuidV4()}', 'Santana do Garambéu', '${state.id}'),
            ('${uuidV4()}', 'Santana do Jacaré', '${state.id}'),
            ('${uuidV4()}', 'Santana do Manhuaçu', '${state.id}'),
            ('${uuidV4()}', 'Santana do Paraíso', '${state.id}'),
            ('${uuidV4()}', 'Santana do Riacho', '${state.id}'),
            ('${uuidV4()}', 'Santana dos Montes', '${state.id}'),
            ('${uuidV4()}', 'Santo Antônio do Amparo', '${state.id}'),
            ('${uuidV4()}', 'Santo Antônio do Aventureiro', '${state.id}'),
            ('${uuidV4()}', 'Santo Antônio do Grama', '${state.id}'),
            ('${uuidV4()}', 'Santo Antônio do Itambé', '${state.id}'),
            ('${uuidV4()}', 'Santo Antônio do Jacinto', '${state.id}'),
            ('${uuidV4()}', 'Santo Antônio do Monte', '${state.id}'),
            ('${uuidV4()}', 'Santo Antônio do Retiro', '${state.id}'),
            ('${uuidV4()}', 'Santo Antônio do Rio Abaixo', '${state.id}'),
            ('${uuidV4()}', 'Santo Hipólito', '${state.id}'),
            ('${uuidV4()}', 'Santos Dumont', '${state.id}'),
            ('${uuidV4()}', 'São Bento Abade', '${state.id}'),
            ('${uuidV4()}', 'São Brás do Suaçuí', '${state.id}'),
            ('${uuidV4()}', 'São Domingos das Dores', '${state.id}'),
            ('${uuidV4()}', 'São Domingos do Prata', '${state.id}'),
            ('${uuidV4()}', 'São Félix de Minas', '${state.id}'),
            ('${uuidV4()}', 'São Francisco', '${state.id}'),
            ('${uuidV4()}', 'São Francisco de Paula', '${state.id}'),
            ('${uuidV4()}', 'São Francisco de Sales', '${state.id}'),
            ('${uuidV4()}', 'São Francisco do Glória', '${state.id}'),
            ('${uuidV4()}', 'São Geraldo', '${state.id}'),
            ('${uuidV4()}', 'São Geraldo da Piedade', '${state.id}'),
            ('${uuidV4()}', 'São Geraldo do Baixio', '${state.id}'),
            ('${uuidV4()}', 'São Gonçalo do Abaeté', '${state.id}'),
            ('${uuidV4()}', 'São Gonçalo do Pará', '${state.id}'),
            ('${uuidV4()}', 'São Gonçalo do Rio Abaixo', '${state.id}'),
            ('${uuidV4()}', 'São Gonçalo do Rio Preto', '${state.id}'),
            ('${uuidV4()}', 'São Gonçalo do Sapucaí', '${state.id}'),
            ('${uuidV4()}', 'São Gotardo', '${state.id}'),
            ('${uuidV4()}', 'São João Batista do Glória', '${state.id}'),
            ('${uuidV4()}', 'São João da Lagoa', '${state.id}'),
            ('${uuidV4()}', 'São João da Mata', '${state.id}'),
            ('${uuidV4()}', 'São João da Ponte', '${state.id}'),
            ('${uuidV4()}', 'São João das Missões', '${state.id}'),
            ('${uuidV4()}', 'São João del Rei', '${state.id}'),
            ('${uuidV4()}', 'São João do Manhuaçu', '${state.id}'),
            ('${uuidV4()}', 'São João do Manteninha', '${state.id}'),
            ('${uuidV4()}', 'São João do Oriente', '${state.id}'),
            ('${uuidV4()}', 'São João do Pacuí', '${state.id}'),
            ('${uuidV4()}', 'São João do Paraíso', '${state.id}'),
            ('${uuidV4()}', 'São João Evangelista', '${state.id}'),
            ('${uuidV4()}', 'São João Nepomuceno', '${state.id}'),
            ('${uuidV4()}', 'São Joaquim de Bicas', '${state.id}'),
            ('${uuidV4()}', 'São José da Barra', '${state.id}'),
            ('${uuidV4()}', 'São José da Lapa', '${state.id}'),
            ('${uuidV4()}', 'São José da Safira', '${state.id}'),
            ('${uuidV4()}', 'São José da Varginha', '${state.id}'),
            ('${uuidV4()}', 'São José do Alegre', '${state.id}'),
            ('${uuidV4()}', 'São José do Divino', '${state.id}'),
            ('${uuidV4()}', 'São José do Goiabal', '${state.id}'),
            ('${uuidV4()}', 'São José do Jacuri', '${state.id}'),
            ('${uuidV4()}', 'São José do Mantimento', '${state.id}'),
            ('${uuidV4()}', 'São Lourenço', '${state.id}'),
            ('${uuidV4()}', 'São Miguel do Anta', '${state.id}'),
            ('${uuidV4()}', 'São Pedro da União', '${state.id}'),
            ('${uuidV4()}', 'São Pedro do Suaçuí', '${state.id}'),
            ('${uuidV4()}', 'São Pedro dos Ferros', '${state.id}'),
            ('${uuidV4()}', 'São Romão', '${state.id}'),
            ('${uuidV4()}', 'São Roque de Minas', '${state.id}'),
            ('${uuidV4()}', 'São Sebastião da Bela Vista', '${state.id}'),
            ('${uuidV4()}', 'São Sebastião da Vargem Alegre', '${state.id}'),
            ('${uuidV4()}', 'São Sebastião do Anta', '${state.id}'),
            ('${uuidV4()}', 'São Sebastião do Maranhão', '${state.id}'),
            ('${uuidV4()}', 'São Sebastião do Oeste', '${state.id}'),
            ('${uuidV4()}', 'São Sebastião do Paraíso', '${state.id}'),
            ('${uuidV4()}', 'São Sebastião do Rio Preto', '${state.id}'),
            ('${uuidV4()}', 'São Sebastião do Rio Verde', '${state.id}'),
            ('${uuidV4()}', 'São Thomé das Letras', '${state.id}'),
            ('${uuidV4()}', 'São Tiago', '${state.id}'),
            ('${uuidV4()}', 'São Tomás de Aquino', '${state.id}'),
            ('${uuidV4()}', 'São Vicente de Minas', '${state.id}'),
            ('${uuidV4()}', 'Sapucaí-Mirim', '${state.id}'),
            ('${uuidV4()}', 'Sardoá', '${state.id}')
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
