import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "GO";

export class PopulateCityWithStateGO1640609429707
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
            INSERT INTO
              "city" (id, name, state_id)
            VALUES
              ('${uuidV4()}', 'Abadia de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Abadiânia', '${state.id}'),
              ('${uuidV4()}', 'Acreúna', '${state.id}'),
              ('${uuidV4()}', 'Adelândia', '${state.id}'),
              ('${uuidV4()}', 'Água Fria de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Água Limpa', '${state.id}'),
              ('${uuidV4()}', 'Águas Lindas de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Alexânia', '${state.id}'),
              ('${uuidV4()}', 'Aloândia', '${state.id}'),
              ('${uuidV4()}', 'Alto Horizonte', '${state.id}'),
              ('${uuidV4()}', 'Alto Paraíso de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Alvorada do Norte', '${state.id}'),
              ('${uuidV4()}', 'Amaralina', '${state.id}'),
              ('${uuidV4()}', 'Americano do Brasil', '${state.id}'),
              ('${uuidV4()}', 'Amorinópolis', '${state.id}'),
              ('${uuidV4()}', 'Anápolis', '${state.id}'),
              ('${uuidV4()}', 'Anhanguera', '${state.id}'),
              ('${uuidV4()}', 'Anicuns', '${state.id}'),
              ('${uuidV4()}', 'Aparecida de Goiânia', '${state.id}'),
              ('${uuidV4()}', 'Aparecida do Rio Doce', '${state.id}'),
              ('${uuidV4()}', 'Aporé', '${state.id}'),
              ('${uuidV4()}', 'Araçu', '${state.id}'),
              ('${uuidV4()}', 'Aragarças', '${state.id}'),
              ('${uuidV4()}', 'Aragoiânia', '${state.id}'),
              ('${uuidV4()}', 'Araguapaz', '${state.id}'),
              ('${uuidV4()}', 'Arenópolis', '${state.id}'),
              ('${uuidV4()}', 'Aruanã', '${state.id}'),
              ('${uuidV4()}', 'Aurilândia', '${state.id}'),
              ('${uuidV4()}', 'Avelinópolis', '${state.id}'),
              ('${uuidV4()}', 'Baliza', '${state.id}'),
              ('${uuidV4()}', 'Barro Alto', '${state.id}'),
              ('${uuidV4()}', 'Bela Vista de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Bom Jardim de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Bom Jesus de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Bonfinópolis', '${state.id}'),
              ('${uuidV4()}', 'Bonópolis', '${state.id}'),
              ('${uuidV4()}', 'Brazabrantes', '${state.id}'),
              ('${uuidV4()}', 'Britânia', '${state.id}'),
              ('${uuidV4()}', 'Buriti Alegre', '${state.id}'),
              ('${uuidV4()}', 'Buriti de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Buritinópolis', '${state.id}'),
              ('${uuidV4()}', 'Cabeceiras', '${state.id}'),
              ('${uuidV4()}', 'Cachoeira Alta', '${state.id}'),
              ('${uuidV4()}', 'Cachoeira de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Cachoeira Dourada', '${state.id}'),
              ('${uuidV4()}', 'Caçu', '${state.id}'),
              ('${uuidV4()}', 'Caiapônia', '${state.id}'),
              ('${uuidV4()}', 'Caldas Novas', '${state.id}'),
              ('${uuidV4()}', 'Caldazinha', '${state.id}'),
              ('${uuidV4()}', 'Campestre de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Campinaçu', '${state.id}'),
              ('${uuidV4()}', 'Campinorte', '${state.id}'),
              ('${uuidV4()}', 'Campo Alegre de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Campo Limpo de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Campos Belos', '${state.id}'),
              ('${uuidV4()}', 'Campos Verdes', '${state.id}'),
              ('${uuidV4()}', 'Carmo do Rio Verde', '${state.id}'),
              ('${uuidV4()}', 'Castelândia', '${state.id}'),
              ('${uuidV4()}', 'Catalão', '${state.id}'),
              ('${uuidV4()}', 'Caturaí', '${state.id}'),
              ('${uuidV4()}', 'Cavalcante', '${state.id}'),
              ('${uuidV4()}', 'Ceres', '${state.id}'),
              ('${uuidV4()}', 'Cezarina', '${state.id}'),
              ('${uuidV4()}', 'Chapadão do Céu', '${state.id}'),
              ('${uuidV4()}', 'Cidade Ocidental', '${state.id}'),
              ('${uuidV4()}', 'Cocalzinho de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Colinas do Sul', '${state.id}'),
              ('${uuidV4()}', 'Córrego do Ouro', '${state.id}'),
              ('${uuidV4()}', 'Corumbá de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Corumbaíba', '${state.id}'),
              ('${uuidV4()}', 'Cristalina', '${state.id}'),
              ('${uuidV4()}', 'Cristianópolis', '${state.id}'),
              ('${uuidV4()}', 'Crixás', '${state.id}'),
              ('${uuidV4()}', 'Cromínia', '${state.id}'),
              ('${uuidV4()}', 'Cumari', '${state.id}'),
              ('${uuidV4()}', 'Damianópolis', '${state.id}'),
              ('${uuidV4()}', 'Damolândia', '${state.id}'),
              ('${uuidV4()}', 'Davinópolis', '${state.id}'),
              ('${uuidV4()}', 'Diorama', '${state.id}'),
              ('${uuidV4()}', 'Divinópolis de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Doverlândia', '${state.id}'),
              ('${uuidV4()}', 'Edealina', '${state.id}'),
              ('${uuidV4()}', 'Edéia', '${state.id}'),
              ('${uuidV4()}', 'Estrela do Norte', '${state.id}'),
              ('${uuidV4()}', 'Faina', '${state.id}'),
              ('${uuidV4()}', 'Fazenda Nova', '${state.id}'),
              ('${uuidV4()}', 'Firminópolis', '${state.id}'),
              ('${uuidV4()}', 'Flores de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Formosa', '${state.id}'),
              ('${uuidV4()}', 'Formoso', '${state.id}'),
              ('${uuidV4()}', 'Gameleira de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Goianápolis', '${state.id}'),
              ('${uuidV4()}', 'Goiandira', '${state.id}'),
              ('${uuidV4()}', 'Goianésia', '${state.id}'),
              ('${uuidV4()}', 'Goiânia', '${state.id}'),
              ('${uuidV4()}', 'Goianira', '${state.id}'),
              ('${uuidV4()}', 'Goiás', '${state.id}'),
              ('${uuidV4()}', 'Goiatuba', '${state.id}'),
              ('${uuidV4()}', 'Gouvelândia', '${state.id}'),
              ('${uuidV4()}', 'Guapó', '${state.id}'),
              ('${uuidV4()}', 'Guaraíta', '${state.id}'),
              ('${uuidV4()}', 'Guarani de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Guarinos', '${state.id}'),
              ('${uuidV4()}', 'Heitoraí', '${state.id}'),
              ('${uuidV4()}', 'Hidrolândia', '${state.id}'),
              ('${uuidV4()}', 'Hidrolina', '${state.id}'),
              ('${uuidV4()}', 'Iaciara', '${state.id}'),
              ('${uuidV4()}', 'Inaciolândia', '${state.id}'),
              ('${uuidV4()}', 'Indiara', '${state.id}'),
              ('${uuidV4()}', 'Inhumas', '${state.id}'),
              ('${uuidV4()}', 'Ipameri', '${state.id}'),
              ('${uuidV4()}', 'Ipiranga de Goiás', '${state.id}'),
              ('${uuidV4()}', 'Iporá', '${state.id}'),
              ('${uuidV4()}', 'Israelândia', '${state.id}'),
              ('${uuidV4()}', 'Itaberaí', '${state.id}'),
              ('${uuidV4()}', 'Itaguari', '${state.id}'),
              ('${uuidV4()}', 'Itaguaru', '${state.id}'),
              ('${uuidV4()}', 'Itajá', '${state.id}'),
              ('${uuidV4()}', 'Itapaci', '${state.id}'),
              ('${uuidV4()}', 'Itapirapuã', '${state.id}'),
              ('${uuidV4()}', 'Itapuranga', '${state.id}'),
              ('${uuidV4()}', 'Itarumã', '${state.id}')
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
