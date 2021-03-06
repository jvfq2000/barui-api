import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "CE";

export class PopulateCityWithStateCE1640609407685
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
        INSERT INTO
          "city" (id, name, state_id)
        VALUES
          ('${uuidV4()}', 'Abaiara', '${state.id}'),
          ('${uuidV4()}', 'Acarape', '${state.id}'),
          ('${uuidV4()}', 'Acaraú', '${state.id}'),
          ('${uuidV4()}', 'Acopiara', '${state.id}'),
          ('${uuidV4()}', 'Aiuaba', '${state.id}'),
          ('${uuidV4()}', 'Alcântaras', '${state.id}'),
          ('${uuidV4()}', 'Altaneira', '${state.id}'),
          ('${uuidV4()}', 'Alto Santo', '${state.id}'),
          ('${uuidV4()}', 'Amontada', '${state.id}'),
          ('${uuidV4()}', 'Antonina do Norte', '${state.id}'),
          ('${uuidV4()}', 'Apuiarés', '${state.id}'),
          ('${uuidV4()}', 'Aquiraz', '${state.id}'),
          ('${uuidV4()}', 'Aracati', '${state.id}'),
          ('${uuidV4()}', 'Aracoiaba', '${state.id}'),
          ('${uuidV4()}', 'Ararendá', '${state.id}'),
          ('${uuidV4()}', 'Araripe', '${state.id}'),
          ('${uuidV4()}', 'Aratuba', '${state.id}'),
          ('${uuidV4()}', 'Arneiroz', '${state.id}'),
          ('${uuidV4()}', 'Assaré', '${state.id}'),
          ('${uuidV4()}', 'Aurora', '${state.id}'),
          ('${uuidV4()}', 'Baixio', '${state.id}'),
          ('${uuidV4()}', 'Banabuiú', '${state.id}'),
          ('${uuidV4()}', 'Barbalha', '${state.id}'),
          ('${uuidV4()}', 'Barreira', '${state.id}'),
          ('${uuidV4()}', 'Barro', '${state.id}'),
          ('${uuidV4()}', 'Barroquinha', '${state.id}'),
          ('${uuidV4()}', 'Baturité', '${state.id}'),
          ('${uuidV4()}', 'Beberibe', '${state.id}'),
          ('${uuidV4()}', 'Bela Cruz', '${state.id}'),
          ('${uuidV4()}', 'Boa Viagem', '${state.id}'),
          ('${uuidV4()}', 'Brejo Santo', '${state.id}'),
          ('${uuidV4()}', 'Camocim', '${state.id}'),
          ('${uuidV4()}', 'Campos Sales', '${state.id}'),
          ('${uuidV4()}', 'Canindé', '${state.id}'),
          ('${uuidV4()}', 'Capistrano', '${state.id}'),
          ('${uuidV4()}', 'Caridade', '${state.id}'),
          ('${uuidV4()}', 'Cariré', '${state.id}'),
          ('${uuidV4()}', 'Caririaçu', '${state.id}'),
          ('${uuidV4()}', 'Cariús', '${state.id}'),
          ('${uuidV4()}', 'Carnaubal', '${state.id}'),
          ('${uuidV4()}', 'Cascavel', '${state.id}'),
          ('${uuidV4()}', 'Catarina', '${state.id}'),
          ('${uuidV4()}', 'Catunda', '${state.id}'),
          ('${uuidV4()}', 'Caucaia', '${state.id}'),
          ('${uuidV4()}', 'Cedro', '${state.id}'),
          ('${uuidV4()}', 'Chaval', '${state.id}'),
          ('${uuidV4()}', 'Choró', '${state.id}'),
          ('${uuidV4()}', 'Chorozinho', '${state.id}'),
          ('${uuidV4()}', 'Coreaú', '${state.id}'),
          ('${uuidV4()}', 'Crateús', '${state.id}'),
          ('${uuidV4()}', 'Crato', '${state.id}'),
          ('${uuidV4()}', 'Croatá', '${state.id}'),
          ('${uuidV4()}', 'Cruz', '${state.id}'),
          ('${uuidV4()}', 'Deputado Irapuan Pinheiro', '${state.id}'),
          ('${uuidV4()}', 'Ererê', '${state.id}'),
          ('${uuidV4()}', 'Eusébio', '${state.id}'),
          ('${uuidV4()}', 'Farias Brito', '${state.id}'),
          ('${uuidV4()}', 'Forquilha', '${state.id}'),
          ('${uuidV4()}', 'Fortaleza', '${state.id}'),
          ('${uuidV4()}', 'Fortim', '${state.id}'),
          ('${uuidV4()}', 'Frecheirinha', '${state.id}'),
          ('${uuidV4()}', 'General Sampaio', '${state.id}'),
          ('${uuidV4()}', 'Graça', '${state.id}'),
          ('${uuidV4()}', 'Granja', '${state.id}'),
          ('${uuidV4()}', 'Granjeiro', '${state.id}'),
          ('${uuidV4()}', 'Groaíras', '${state.id}'),
          ('${uuidV4()}', 'Guaiúba', '${state.id}'),
          ('${uuidV4()}', 'Guaraciaba do Norte', '${state.id}'),
          ('${uuidV4()}', 'Guaramiranga', '${state.id}'),
          ('${uuidV4()}', 'Hidrolândia', '${state.id}'),
          ('${uuidV4()}', 'Horizonte', '${state.id}'),
          ('${uuidV4()}', 'Ibaretama', '${state.id}'),
          ('${uuidV4()}', 'Ibiapina', '${state.id}'),
          ('${uuidV4()}', 'Ibicuitinga', '${state.id}'),
          ('${uuidV4()}', 'Icapuí', '${state.id}'),
          ('${uuidV4()}', 'Icó', '${state.id}'),
          ('${uuidV4()}', 'Iguatu', '${state.id}'),
          ('${uuidV4()}', 'Independência', '${state.id}'),
          ('${uuidV4()}', 'Ipaporanga', '${state.id}'),
          ('${uuidV4()}', 'Ipaumirim', '${state.id}'),
          ('${uuidV4()}', 'Ipu', '${state.id}'),
          ('${uuidV4()}', 'Ipueiras', '${state.id}'),
          ('${uuidV4()}', 'Iracema', '${state.id}'),
          ('${uuidV4()}', 'Irauçuba', '${state.id}'),
          ('${uuidV4()}', 'Itaiçaba', '${state.id}'),
          ('${uuidV4()}', 'Itaitinga', '${state.id}'),
          ('${uuidV4()}', 'Itapagé', '${state.id}'),
          ('${uuidV4()}', 'Itapipoca', '${state.id}'),
          ('${uuidV4()}', 'Itapiúna', '${state.id}'),
          ('${uuidV4()}', 'Itarema', '${state.id}'),
          ('${uuidV4()}', 'Itatira', '${state.id}'),
          ('${uuidV4()}', 'Jaguaretama', '${state.id}'),
          ('${uuidV4()}', 'Jaguaribara', '${state.id}'),
          ('${uuidV4()}', 'Jaguaribe', '${state.id}'),
          ('${uuidV4()}', 'Jaguaruana', '${state.id}'),
          ('${uuidV4()}', 'Jardim', '${state.id}'),
          ('${uuidV4()}', 'Jati', '${state.id}'),
          ('${uuidV4()}', 'Jijoca de Jericoacoara', '${state.id}'),
          ('${uuidV4()}', 'Juazeiro do Norte', '${state.id}'),
          ('${uuidV4()}', 'Jucás', '${state.id}'),
          ('${uuidV4()}', 'Lavras da Mangabeira', '${state.id}'),
          ('${uuidV4()}', 'Limoeiro do Norte', '${state.id}'),
          ('${uuidV4()}', 'Madalena', '${state.id}'),
          ('${uuidV4()}', 'Maracanaú', '${state.id}'),
          ('${uuidV4()}', 'Maranguape', '${state.id}'),
          ('${uuidV4()}', 'Marco', '${state.id}'),
          ('${uuidV4()}', 'Martinópole', '${state.id}'),
          ('${uuidV4()}', 'Massapê', '${state.id}'),
          ('${uuidV4()}', 'Mauriti', '${state.id}'),
          ('${uuidV4()}', 'Meruoca', '${state.id}'),
          ('${uuidV4()}', 'Milagres', '${state.id}'),
          ('${uuidV4()}', 'Milhã', '${state.id}'),
          ('${uuidV4()}', 'Miraíma', '${state.id}'),
          ('${uuidV4()}', 'Missão Velha', '${state.id}'),
          ('${uuidV4()}', 'Mombaça', '${state.id}'),
          ('${uuidV4()}', 'Monsenhor Tabosa', '${state.id}'),
          ('${uuidV4()}', 'Morada Nova', '${state.id}'),
          ('${uuidV4()}', 'Moraújo', '${state.id}'),
          ('${uuidV4()}', 'Morrinhos', '${state.id}'),
          ('${uuidV4()}', 'Mucambo', '${state.id}'),
          ('${uuidV4()}', 'Mulungu', '${state.id}'),
          ('${uuidV4()}', 'Nova Olinda', '${state.id}'),
          ('${uuidV4()}', 'Nova Russas', '${state.id}'),
          ('${uuidV4()}', 'Novo Oriente', '${state.id}'),
          ('${uuidV4()}', 'Ocara', '${state.id}'),
          ('${uuidV4()}', 'Orós', '${state.id}'),
          ('${uuidV4()}', 'Pacajus', '${state.id}'),
          ('${uuidV4()}', 'Pacatuba', '${state.id}'),
          ('${uuidV4()}', 'Pacoti', '${state.id}'),
          ('${uuidV4()}', 'Pacujá', '${state.id}'),
          ('${uuidV4()}', 'Palhano', '${state.id}'),
          ('${uuidV4()}', 'Palmácia', '${state.id}'),
          ('${uuidV4()}', 'Paracuru', '${state.id}'),
          ('${uuidV4()}', 'Paraipaba', '${state.id}'),
          ('${uuidV4()}', 'Parambu', '${state.id}'),
          ('${uuidV4()}', 'Paramoti', '${state.id}'),
          ('${uuidV4()}', 'Pedra Branca', '${state.id}'),
          ('${uuidV4()}', 'Penaforte', '${state.id}'),
          ('${uuidV4()}', 'Pentecoste', '${state.id}'),
          ('${uuidV4()}', 'Pereiro', '${state.id}'),
          ('${uuidV4()}', 'Pindoretama', '${state.id}'),
          ('${uuidV4()}', 'Piquet Carneiro', '${state.id}'),
          ('${uuidV4()}', 'Pires Ferreira', '${state.id}'),
          ('${uuidV4()}', 'Poranga', '${state.id}'),
          ('${uuidV4()}', 'Porteiras', '${state.id}'),
          ('${uuidV4()}', 'Potengi', '${state.id}'),
          ('${uuidV4()}', 'Potiretama', '${state.id}'),
          ('${uuidV4()}', 'Quiterianópolis', '${state.id}'),
          ('${uuidV4()}', 'Quixadá', '${state.id}'),
          ('${uuidV4()}', 'Quixelô', '${state.id}'),
          ('${uuidV4()}', 'Quixeramobim', '${state.id}'),
          ('${uuidV4()}', 'Quixeré', '${state.id}'),
          ('${uuidV4()}', 'Redenção', '${state.id}'),
          ('${uuidV4()}', 'Reriutaba', '${state.id}'),
          ('${uuidV4()}', 'Russas', '${state.id}'),
          ('${uuidV4()}', 'Saboeiro', '${state.id}'),
          ('${uuidV4()}', 'Salitre', '${state.id}'),
          ('${uuidV4()}', 'Santa Quitéria', '${state.id}'),
          ('${uuidV4()}', 'Santana do Acaraú', '${state.id}'),
          ('${uuidV4()}', 'Santana do Cariri', '${state.id}'),
          ('${uuidV4()}', 'São Benedito', '${state.id}'),
          ('${uuidV4()}', 'São Gonçalo do Amarante', '${state.id}'),
          ('${uuidV4()}', 'São João do Jaguaribe', '${state.id}'),
          ('${uuidV4()}', 'São Luís do Curu', '${state.id}'),
          ('${uuidV4()}', 'Senador Pompeu', '${state.id}'),
          ('${uuidV4()}', 'Senador Sá', '${state.id}'),
          ('${uuidV4()}', 'Sobral', '${state.id}'),
          ('${uuidV4()}', 'Solonópole', '${state.id}'),
          ('${uuidV4()}', 'Tabuleiro do Norte', '${state.id}'),
          ('${uuidV4()}', 'Tamboril', '${state.id}'),
          ('${uuidV4()}', 'Tarrafas', '${state.id}'),
          ('${uuidV4()}', 'Tauá', '${state.id}'),
          ('${uuidV4()}', 'Tejuçuoca', '${state.id}'),
          ('${uuidV4()}', 'Tianguá', '${state.id}'),
          ('${uuidV4()}', 'Trairi', '${state.id}'),
          ('${uuidV4()}', 'Tururu', '${state.id}'),
          ('${uuidV4()}', 'Ubajara', '${state.id}'),
          ('${uuidV4()}', 'Umari', '${state.id}'),
          ('${uuidV4()}', 'Umirim', '${state.id}'),
          ('${uuidV4()}', 'Uruburetama', '${state.id}'),
          ('${uuidV4()}', 'Uruoca', '${state.id}'),
          ('${uuidV4()}', 'Varjota', '${state.id}'),
          ('${uuidV4()}', 'Várzea Alegre', '${state.id}'),
          ('${uuidV4()}', 'Viçosa do Ceará', '${state.id}')
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
