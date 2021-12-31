import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "MS";

export class PopulateCityWithStateMS1640609457500
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
        INSERT INTO
          "city" (id, name, state_id)
        VALUES
          ('${uuidV4()}', 'Água Clara', '${state.id}'),
          ('${uuidV4()}', 'Alcinópolis', '${state.id}'),
          ('${uuidV4()}', 'Amambaí', '${state.id}'),
          ('${uuidV4()}', 'Anastácio', '${state.id}'),
          ('${uuidV4()}', 'Anaurilândia', '${state.id}'),
          ('${uuidV4()}', 'Angélica', '${state.id}'),
          ('${uuidV4()}', 'Antônio João', '${state.id}'),
          ('${uuidV4()}', 'Aparecida do Taboado', '${state.id}'),
          ('${uuidV4()}', 'Aquidauana', '${state.id}'),
          ('${uuidV4()}', 'Aral Moreira', '${state.id}'),
          ('${uuidV4()}', 'Bandeirantes', '${state.id}'),
          ('${uuidV4()}', 'Bataguassu', '${state.id}'),
          ('${uuidV4()}', 'Bataiporã', '${state.id}'),
          ('${uuidV4()}', 'Bela Vista', '${state.id}'),
          ('${uuidV4()}', 'Bodoquena', '${state.id}'),
          ('${uuidV4()}', 'Bonito', '${state.id}'),
          ('${uuidV4()}', 'Brasilândia', '${state.id}'),
          ('${uuidV4()}', 'Caarapó', '${state.id}'),
          ('${uuidV4()}', 'Camapuã', '${state.id}'),
          ('${uuidV4()}', 'Campo Grande', '${state.id}'),
          ('${uuidV4()}', 'Caracol', '${state.id}'),
          ('${uuidV4()}', 'Cassilândia', '${state.id}'),
          ('${uuidV4()}', 'Chapadão do Sul', '${state.id}'),
          ('${uuidV4()}', 'Corguinho', '${state.id}'),
          ('${uuidV4()}', 'Coronel Sapucaia', '${state.id}'),
          ('${uuidV4()}', 'Corumbá', '${state.id}'),
          ('${uuidV4()}', 'Costa Rica', '${state.id}'),
          ('${uuidV4()}', 'Coxim', '${state.id}'),
          ('${uuidV4()}', 'Deodápolis', '${state.id}'),
          ('${uuidV4()}', 'Dois Irmãos do Buriti', '${state.id}'),
          ('${uuidV4()}', 'Douradina', '${state.id}'),
          ('${uuidV4()}', 'Dourados', '${state.id}'),
          ('${uuidV4()}', 'Eldorado', '${state.id}'),
          ('${uuidV4()}', 'Fátima do Sul', '${state.id}'),
          ('${uuidV4()}', 'Figueirão', '${state.id}'),
          ('${uuidV4()}', 'Glória de Dourados', '${state.id}'),
          ('${uuidV4()}', 'Guia Lopes da Laguna', '${state.id}'),
          ('${uuidV4()}', 'Iguatemi', '${state.id}'),
          ('${uuidV4()}', 'Inocência', '${state.id}'),
          ('${uuidV4()}', 'Itaporã', '${state.id}'),
          ('${uuidV4()}', 'Itaquiraí', '${state.id}'),
          ('${uuidV4()}', 'Ivinhema', '${state.id}'),
          ('${uuidV4()}', 'Japorã', '${state.id}'),
          ('${uuidV4()}', 'Jaraguari', '${state.id}'),
          ('${uuidV4()}', 'Jardim', '${state.id}'),
          ('${uuidV4()}', 'Jateí', '${state.id}'),
          ('${uuidV4()}', 'Juti', '${state.id}'),
          ('${uuidV4()}', 'Ladário', '${state.id}'),
          ('${uuidV4()}', 'Laguna Carapã', '${state.id}'),
          ('${uuidV4()}', 'Maracaju', '${state.id}'),
          ('${uuidV4()}', 'Miranda', '${state.id}'),
          ('${uuidV4()}', 'Mundo Novo', '${state.id}'),
          ('${uuidV4()}', 'Naviraí', '${state.id}'),
          ('${uuidV4()}', 'Nioaque', '${state.id}'),
          ('${uuidV4()}', 'Nova Alvorada do Sul', '${state.id}'),
          ('${uuidV4()}', 'Nova Andradina', '${state.id}'),
          ('${uuidV4()}', 'Novo Horizonte do Sul', '${state.id}'),
          ('${uuidV4()}', 'Paranaíba', '${state.id}'),
          ('${uuidV4()}', 'Paranhos', '${state.id}'),
          ('${uuidV4()}', 'Pedro Gomes', '${state.id}'),
          ('${uuidV4()}', 'Ponta Porã', '${state.id}'),
          ('${uuidV4()}', 'Porto Murtinho', '${state.id}'),
          ('${uuidV4()}', 'Ribas do Rio Pardo', '${state.id}'),
          ('${uuidV4()}', 'Rio Brilhante', '${state.id}'),
          ('${uuidV4()}', 'Rio Negro', '${state.id}'),
          ('${uuidV4()}', 'Rio Verde de Mato Grosso', '${state.id}'),
          ('${uuidV4()}', 'Rochedo', '${state.id}'),
          ('${uuidV4()}', 'Santa Rita do Pardo', '${state.id}'),
          ('${uuidV4()}', 'São Gabriel do Oeste', '${state.id}'),
          ('${uuidV4()}', 'Selvíria', '${state.id}'),
          ('${uuidV4()}', 'Sete Quedas', '${state.id}'),
          ('${uuidV4()}', 'Sidrolândia', '${state.id}'),
          ('${uuidV4()}', 'Sonora', '${state.id}'),
          ('${uuidV4()}', 'Tacuru', '${state.id}'),
          ('${uuidV4()}', 'Taquarussu', '${state.id}'),
          ('${uuidV4()}', 'Terenos', '${state.id}'),
          ('${uuidV4()}', 'Três Lagoas', '${state.id}'),
          ('${uuidV4()}', 'Vicentina', '${state.id}')
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
