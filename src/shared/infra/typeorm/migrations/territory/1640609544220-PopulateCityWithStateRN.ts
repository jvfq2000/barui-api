import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "RN";

export class PopulateCityWithStateRN1640609544220
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
        INSERT INTO
          "city" (id, name, state_id)
        VALUES
          ('${uuidV4()}', 'Acari', '${state.id}'),
          ('${uuidV4()}', 'Açu', '${state.id}'),
          ('${uuidV4()}', 'Afonso Bezerra', '${state.id}'),
          ('${uuidV4()}', 'Água Nova', '${state.id}'),
          ('${uuidV4()}', 'Alexandria', '${state.id}'),
          ('${uuidV4()}', 'Almino Afonso', '${state.id}'),
          ('${uuidV4()}', 'Alto do Rodrigues', '${state.id}'),
          ('${uuidV4()}', 'Angicos', '${state.id}'),
          ('${uuidV4()}', 'Antônio Martins', '${state.id}'),
          ('${uuidV4()}', 'Apodi', '${state.id}'),
          ('${uuidV4()}', 'Areia Branca', '${state.id}'),
          ('${uuidV4()}', 'Arês', '${state.id}'),
          ('${uuidV4()}', 'Augusto Severo', '${state.id}'),
          ('${uuidV4()}', 'Baía Formosa', '${state.id}'),
          ('${uuidV4()}', 'Baraúna', '${state.id}'),
          ('${uuidV4()}', 'Barcelona', '${state.id}'),
          ('${uuidV4()}', 'Bento Fernandes', '${state.id}'),
          ('${uuidV4()}', 'Bodó', '${state.id}'),
          ('${uuidV4()}', 'Bom Jesus', '${state.id}'),
          ('${uuidV4()}', 'Brejinho', '${state.id}'),
          ('${uuidV4()}', 'Caiçara do Norte', '${state.id}'),
          ('${uuidV4()}', 'Caiçara do Rio do Vento', '${state.id}'),
          ('${uuidV4()}', 'Caicó', '${state.id}'),
          ('${uuidV4()}', 'Campo Redondo', '${state.id}'),
          ('${uuidV4()}', 'Canguaretama', '${state.id}'),
          ('${uuidV4()}', 'Caraúbas', '${state.id}'),
          ('${uuidV4()}', 'Carnaúba dos Dantas', '${state.id}'),
          ('${uuidV4()}', 'Carnaubais', '${state.id}'),
          ('${uuidV4()}', 'Ceará-Mirim', '${state.id}'),
          ('${uuidV4()}', 'Cerro Corá', '${state.id}'),
          ('${uuidV4()}', 'Coronel Ezequiel', '${state.id}'),
          ('${uuidV4()}', 'Coronel João Pessoa', '${state.id}'),
          ('${uuidV4()}', 'Cruzeta', '${state.id}'),
          ('${uuidV4()}', 'Currais Novos', '${state.id}'),
          ('${uuidV4()}', 'Doutor Severiano', '${state.id}'),
          ('${uuidV4()}', 'Encanto', '${state.id}'),
          ('${uuidV4()}', 'Equador', '${state.id}'),
          ('${uuidV4()}', 'Espírito Santo', '${state.id}'),
          ('${uuidV4()}', 'Extremoz', '${state.id}'),
          ('${uuidV4()}', 'Felipe Guerra', '${state.id}'),
          ('${uuidV4()}', 'Fernando Pedroza', '${state.id}'),
          ('${uuidV4()}', 'Florânia', '${state.id}'),
          ('${uuidV4()}', 'Francisco Dantas', '${state.id}'),
          ('${uuidV4()}', 'Frutuoso Gomes', '${state.id}'),
          ('${uuidV4()}', 'Galinhos', '${state.id}'),
          ('${uuidV4()}', 'Goianinha', '${state.id}'),
          ('${uuidV4()}', 'Governador Dix-Sept Rosado', '${state.id}'),
          ('${uuidV4()}', 'Grossos', '${state.id}'),
          ('${uuidV4()}', 'Guamaré', '${state.id}'),
          ('${uuidV4()}', 'Ielmo Marinho', '${state.id}'),
          ('${uuidV4()}', 'Ipanguaçu', '${state.id}'),
          ('${uuidV4()}', 'Ipueira', '${state.id}'),
          ('${uuidV4()}', 'Itajá', '${state.id}'),
          ('${uuidV4()}', 'Itaú', '${state.id}'),
          ('${uuidV4()}', 'Jaçanã', '${state.id}'),
          ('${uuidV4()}', 'Jandaíra', '${state.id}'),
          ('${uuidV4()}', 'Janduís', '${state.id}'),
          ('${uuidV4()}', 'Januário Cicco', '${state.id}'),
          ('${uuidV4()}', 'Japi', '${state.id}'),
          ('${uuidV4()}', 'Jardim de Angicos', '${state.id}'),
          ('${uuidV4()}', 'Jardim de Piranhas', '${state.id}'),
          ('${uuidV4()}', 'Jardim do Seridó', '${state.id}'),
          ('${uuidV4()}', 'João Câmara', '${state.id}'),
          ('${uuidV4()}', 'João Dias', '${state.id}'),
          ('${uuidV4()}', 'José da Penha', '${state.id}'),
          ('${uuidV4()}', 'Jucurutu', '${state.id}'),
          ('${uuidV4()}', 'Jundiá', '${state.id}'),
          ('${uuidV4()}', 'Lagoa d´Anta', '${state.id}'),
          ('${uuidV4()}', 'Lagoa de Pedras', '${state.id}'),
          ('${uuidV4()}', 'Lagoa de Velhos', '${state.id}'),
          ('${uuidV4()}', 'Lagoa Nova', '${state.id}'),
          ('${uuidV4()}', 'Lagoa Salgada', '${state.id}'),
          ('${uuidV4()}', 'Lajes', '${state.id}'),
          ('${uuidV4()}', 'Lajes Pintadas', '${state.id}'),
          ('${uuidV4()}', 'Lucrécia', '${state.id}'),
          ('${uuidV4()}', 'Luís Gomes', '${state.id}'),
          ('${uuidV4()}', 'Macaíba', '${state.id}'),
          ('${uuidV4()}', 'Macau', '${state.id}'),
          ('${uuidV4()}', 'Major Sales', '${state.id}'),
          ('${uuidV4()}', 'Marcelino Vieira', '${state.id}'),
          ('${uuidV4()}', 'Martins', '${state.id}'),
          ('${uuidV4()}', 'Maxaranguape', '${state.id}'),
          ('${uuidV4()}', 'Messias Targino', '${state.id}'),
          ('${uuidV4()}', 'Montanhas', '${state.id}'),
          ('${uuidV4()}', 'Monte Alegre', '${state.id}'),
          ('${uuidV4()}', 'Monte das Gameleiras', '${state.id}'),
          ('${uuidV4()}', 'Mossoró', '${state.id}'),
          ('${uuidV4()}', 'Natal', '${state.id}'),
          ('${uuidV4()}', 'Nísia Floresta', '${state.id}'),
          ('${uuidV4()}', 'Nova Cruz', '${state.id}'),
          ('${uuidV4()}', 'Olho-d´Água do Borges', '${state.id}'),
          ('${uuidV4()}', 'Ouro Branco', '${state.id}'),
          ('${uuidV4()}', 'Paraná', '${state.id}'),
          ('${uuidV4()}', 'Paraú', '${state.id}'),
          ('${uuidV4()}', 'Parazinho', '${state.id}'),
          ('${uuidV4()}', 'Parelhas', '${state.id}'),
          ('${uuidV4()}', 'Parnamirim', '${state.id}'),
          ('${uuidV4()}', 'Passa e Fica', '${state.id}'),
          ('${uuidV4()}', 'Passagem', '${state.id}'),
          ('${uuidV4()}', 'Patu', '${state.id}'),
          ('${uuidV4()}', 'Pau dos Ferros', '${state.id}'),
          ('${uuidV4()}', 'Pedra Grande', '${state.id}'),
          ('${uuidV4()}', 'Pedra Preta', '${state.id}'),
          ('${uuidV4()}', 'Pedro Avelino', '${state.id}'),
          ('${uuidV4()}', 'Pedro Velho', '${state.id}'),
          ('${uuidV4()}', 'Pendências', '${state.id}'),
          ('${uuidV4()}', 'Pilões', '${state.id}'),
          ('${uuidV4()}', 'Poço Branco', '${state.id}'),
          ('${uuidV4()}', 'Portalegre', '${state.id}'),
          ('${uuidV4()}', 'Porto do Mangue', '${state.id}'),
          ('${uuidV4()}', 'Presidente Juscelino', '${state.id}'),
          ('${uuidV4()}', 'Pureza', '${state.id}'),
          ('${uuidV4()}', 'Rafael Fernandes', '${state.id}'),
          ('${uuidV4()}', 'Rafael Godeiro', '${state.id}'),
          ('${uuidV4()}', 'Riacho da Cruz', '${state.id}'),
          ('${uuidV4()}', 'Riacho de Santana', '${state.id}'),
          ('${uuidV4()}', 'Riachuelo', '${state.id}'),
          ('${uuidV4()}', 'Rio do Fogo', '${state.id}'),
          ('${uuidV4()}', 'Rodolfo Fernandes', '${state.id}'),
          ('${uuidV4()}', 'Ruy Barbosa', '${state.id}'),
          ('${uuidV4()}', 'Santa Cruz', '${state.id}'),
          ('${uuidV4()}', 'Santa Maria', '${state.id}'),
          ('${uuidV4()}', 'Santana do Matos', '${state.id}'),
          ('${uuidV4()}', 'Santana do Seridó', '${state.id}'),
          ('${uuidV4()}', 'Santo Antônio', '${state.id}'),
          ('${uuidV4()}', 'São Bento do Norte', '${state.id}'),
          ('${uuidV4()}', 'São Bento do Trairí', '${state.id}'),
          ('${uuidV4()}', 'São Fernando', '${state.id}'),
          ('${uuidV4()}', 'São Francisco do Oeste', '${state.id}'),
          ('${uuidV4()}', 'São Gonçalo do Amarante', '${state.id}'),
          ('${uuidV4()}', 'São João do Sabugi', '${state.id}'),
          ('${uuidV4()}', 'São José de Mipibu', '${state.id}'),
          ('${uuidV4()}', 'São José do Campestre', '${state.id}'),
          ('${uuidV4()}', 'São José do Seridó', '${state.id}'),
          ('${uuidV4()}', 'São Miguel', '${state.id}'),
          ('${uuidV4()}', 'São Miguel do Gostoso', '${state.id}'),
          ('${uuidV4()}', 'São Paulo do Potengi', '${state.id}'),
          ('${uuidV4()}', 'São Pedro', '${state.id}'),
          ('${uuidV4()}', 'São Rafael', '${state.id}'),
          ('${uuidV4()}', 'São Tomé', '${state.id}'),
          ('${uuidV4()}', 'São Vicente', '${state.id}'),
          ('${uuidV4()}', 'Senador Elói de Souza', '${state.id}'),
          ('${uuidV4()}', 'Senador Georgino Avelino', '${state.id}'),
          ('${uuidV4()}', 'Serra de São Bento', '${state.id}'),
          ('${uuidV4()}', 'Serra do Mel', '${state.id}'),
          ('${uuidV4()}', 'Serra Negra do Norte', '${state.id}'),
          ('${uuidV4()}', 'Serrinha', '${state.id}'),
          ('${uuidV4()}', 'Serrinha dos Pintos', '${state.id}'),
          ('${uuidV4()}', 'Severiano Melo', '${state.id}'),
          ('${uuidV4()}', 'Sítio Novo', '${state.id}'),
          ('${uuidV4()}', 'Taboleiro Grande', '${state.id}'),
          ('${uuidV4()}', 'Taipu', '${state.id}'),
          ('${uuidV4()}', 'Tangará', '${state.id}'),
          ('${uuidV4()}', 'Tenente Ananias', '${state.id}'),
          ('${uuidV4()}', 'Tenente Laurentino Cruz', '${state.id}'),
          ('${uuidV4()}', 'Tibau', '${state.id}'),
          ('${uuidV4()}', 'Tibau do Sul', '${state.id}'),
          ('${uuidV4()}', 'Timbaúba dos Batistas', '${state.id}'),
          ('${uuidV4()}', 'Touros', '${state.id}'),
          ('${uuidV4()}', 'Triunfo Potiguar', '${state.id}'),
          ('${uuidV4()}', 'Umarizal', '${state.id}'),
          ('${uuidV4()}', 'Upanema', '${state.id}'),
          ('${uuidV4()}', 'Várzea', '${state.id}'),
          ('${uuidV4()}', 'Venha-Ver', '${state.id}'),
          ('${uuidV4()}', 'Vera Cruz', '${state.id}'),
          ('${uuidV4()}', 'Viçosa', '${state.id}'),
          ('${uuidV4()}', 'Vila Flor', '${state.id}')
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
