import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "MG";

export class PopulateCityWithStateMGPart21640625188099
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
        INSERT INTO
          "city" (id, name, state_id)
        VALUES
        ('${uuidV4()}', 'Curvelo', '${state.id}'),
        ('${uuidV4()}', 'Datas', '${state.id}'),
        ('${uuidV4()}', 'Delfim Moreira', '${state.id}'),
        ('${uuidV4()}', 'Delfinópolis', '${state.id}'),
        ('${uuidV4()}', 'Delta', '${state.id}'),
        ('${uuidV4()}', 'Descoberto', '${state.id}'),
        ('${uuidV4()}', 'Desterro de Entre Rios', '${state.id}'),
        ('${uuidV4()}', 'Desterro do Melo', '${state.id}'),
        ('${uuidV4()}', 'Diamantina', '${state.id}'),
        ('${uuidV4()}', 'Diogo de Vasconcelos', '${state.id}'),
        ('${uuidV4()}', 'Dionísio', '${state.id}'),
        ('${uuidV4()}', 'Divinésia', '${state.id}'),
        ('${uuidV4()}', 'Divino', '${state.id}'),
        ('${uuidV4()}', 'Divino das Laranjeiras', '${state.id}'),
        ('${uuidV4()}', 'Divinolândia de Minas', '${state.id}'),
        ('${uuidV4()}', 'Divinópolis', '${state.id}'),
        ('${uuidV4()}', 'Divisa Alegre', '${state.id}'),
        ('${uuidV4()}', 'Divisa Nova', '${state.id}'),
        ('${uuidV4()}', 'Divisópolis', '${state.id}'),
        ('${uuidV4()}', 'Dom Bosco', '${state.id}'),
        ('${uuidV4()}', 'Dom Cavati', '${state.id}'),
        ('${uuidV4()}', 'Dom Joaquim', '${state.id}'),
        ('${uuidV4()}', 'Dom Silvério', '${state.id}'),
        ('${uuidV4()}', 'Dom Viçoso', '${state.id}'),
        ('${uuidV4()}', 'Dona Eusébia', '${state.id}'),
        ('${uuidV4()}', 'Dores de Campos', '${state.id}'),
        ('${uuidV4()}', 'Dores de Guanhães', '${state.id}'),
        ('${uuidV4()}', 'Dores do Indaiá', '${state.id}'),
        ('${uuidV4()}', 'Dores do Turvo', '${state.id}'),
        ('${uuidV4()}', 'Doresópolis', '${state.id}'),
        ('${uuidV4()}', 'Douradoquara', '${state.id}'),
        ('${uuidV4()}', 'Durandé', '${state.id}'),
        ('${uuidV4()}', 'Elói Mendes', '${state.id}'),
        ('${uuidV4()}', 'Engenheiro Caldas', '${state.id}'),
        ('${uuidV4()}', 'Engenheiro Navarro', '${state.id}'),
        ('${uuidV4()}', 'Entre Folhas', '${state.id}'),
        ('${uuidV4()}', 'Entre Rios de Minas', '${state.id}'),
        ('${uuidV4()}', 'Ervália', '${state.id}'),
        ('${uuidV4()}', 'Esmeraldas', '${state.id}'),
        ('${uuidV4()}', 'Espera Feliz', '${state.id}'),
        ('${uuidV4()}', 'Espinosa', '${state.id}'),
        ('${uuidV4()}', 'Espírito Santo do Dourado', '${state.id}'),
        ('${uuidV4()}', 'Estiva', '${state.id}'),
        ('${uuidV4()}', 'Estrela Dalva', '${state.id}'),
        ('${uuidV4()}', 'Estrela do Indaiá', '${state.id}'),
        ('${uuidV4()}', 'Estrela do Sul', '${state.id}'),
        ('${uuidV4()}', 'Eugenópolis', '${state.id}'),
        ('${uuidV4()}', 'Ewbank da Câmara', '${state.id}'),
        ('${uuidV4()}', 'Extrema', '${state.id}'),
        ('${uuidV4()}', 'Fama', '${state.id}'),
        ('${uuidV4()}', 'Faria Lemos', '${state.id}'),
        ('${uuidV4()}', 'Felício dos Santos', '${state.id}'),
        ('${uuidV4()}', 'Felisburgo', '${state.id}'),
        ('${uuidV4()}', 'Felixlândia', '${state.id}'),
        ('${uuidV4()}', 'Fernandes Tourinho', '${state.id}'),
        ('${uuidV4()}', 'Ferros', '${state.id}'),
        ('${uuidV4()}', 'Fervedouro', '${state.id}'),
        ('${uuidV4()}', 'Florestal', '${state.id}'),
        ('${uuidV4()}', 'Formiga', '${state.id}'),
        ('${uuidV4()}', 'Formoso', '${state.id}'),
        ('${uuidV4()}', 'Fortaleza de Minas', '${state.id}'),
        ('${uuidV4()}', 'Fortuna de Minas', '${state.id}'),
        ('${uuidV4()}', 'Francisco Badaró', '${state.id}'),
        ('${uuidV4()}', 'Francisco Dumont', '${state.id}'),
        ('${uuidV4()}', 'Francisco Sá', '${state.id}'),
        ('${uuidV4()}', 'Franciscópolis', '${state.id}'),
        ('${uuidV4()}', 'Frei Gaspar', '${state.id}'),
        ('${uuidV4()}', 'Frei Inocêncio', '${state.id}'),
        ('${uuidV4()}', 'Frei Lagonegro', '${state.id}'),
        ('${uuidV4()}', 'Fronteira', '${state.id}'),
        ('${uuidV4()}', 'Fronteira dos Vales', '${state.id}'),
        ('${uuidV4()}', 'Fruta de Leite', '${state.id}'),
        ('${uuidV4()}', 'Frutal', '${state.id}'),
        ('${uuidV4()}', 'Funilândia', '${state.id}'),
        ('${uuidV4()}', 'Galiléia', '${state.id}'),
        ('${uuidV4()}', 'Gameleiras', '${state.id}'),
        ('${uuidV4()}', 'Glaucilândia', '${state.id}'),
        ('${uuidV4()}', 'Goiabeira', '${state.id}'),
        ('${uuidV4()}', 'Goianá', '${state.id}'),
        ('${uuidV4()}', 'Gonçalves', '${state.id}'),
        ('${uuidV4()}', 'Gonzaga', '${state.id}'),
        ('${uuidV4()}', 'Gouveia', '${state.id}'),
        ('${uuidV4()}', 'Governador Valadares', '${state.id}'),
        ('${uuidV4()}', 'Grão Mogol', '${state.id}'),
        ('${uuidV4()}', 'Grupiara', '${state.id}'),
        ('${uuidV4()}', 'Guanhães', '${state.id}'),
        ('${uuidV4()}', 'Guapé', '${state.id}'),
        ('${uuidV4()}', 'Guaraciaba', '${state.id}'),
        ('${uuidV4()}', 'Guaraciama', '${state.id}'),
        ('${uuidV4()}', 'Guaranésia', '${state.id}'),
        ('${uuidV4()}', 'Guarani', '${state.id}'),
        ('${uuidV4()}', 'Guarará', '${state.id}'),
        ('${uuidV4()}', 'Guarda-Mor', '${state.id}'),
        ('${uuidV4()}', 'Guaxupé', '${state.id}'),
        ('${uuidV4()}', 'Guidoval', '${state.id}'),
        ('${uuidV4()}', 'Guimarânia', '${state.id}'),
        ('${uuidV4()}', 'Guiricema', '${state.id}'),
        ('${uuidV4()}', 'Gurinhatã', '${state.id}'),
        ('${uuidV4()}', 'Heliodora', '${state.id}'),
        ('${uuidV4()}', 'Iapu', '${state.id}'),
        ('${uuidV4()}', 'Ibertioga', '${state.id}'),
        ('${uuidV4()}', 'Ibiá', '${state.id}'),
        ('${uuidV4()}', 'Ibiaí', '${state.id}'),
        ('${uuidV4()}', 'Ibiracatu', '${state.id}'),
        ('${uuidV4()}', 'Ibiraci', '${state.id}'),
        ('${uuidV4()}', 'Ibirité', '${state.id}'),
        ('${uuidV4()}', 'Ibitiúra de Minas', '${state.id}'),
        ('${uuidV4()}', 'Ibituruna', '${state.id}'),
        ('${uuidV4()}', 'Icaraí de Minas', '${state.id}'),
        ('${uuidV4()}', 'Igarapé', '${state.id}'),
        ('${uuidV4()}', 'Igaratinga', '${state.id}'),
        ('${uuidV4()}', 'Iguatama', '${state.id}'),
        ('${uuidV4()}', 'Ijaci', '${state.id}'),
        ('${uuidV4()}', 'Ilicínea', '${state.id}'),
        ('${uuidV4()}', 'Imbé de Minas', '${state.id}'),
        ('${uuidV4()}', 'Inconfidentes', '${state.id}'),
        ('${uuidV4()}', 'Indaiabira', '${state.id}'),
        ('${uuidV4()}', 'Indianópolis', '${state.id}'),
        ('${uuidV4()}', 'Ingaí', '${state.id}'),
        ('${uuidV4()}', 'Inhapim', '${state.id}'),
        ('${uuidV4()}', 'Inhaúma', '${state.id}'),
        ('${uuidV4()}', 'Inimutaba', '${state.id}'),
        ('${uuidV4()}', 'Ipaba', '${state.id}'),
        ('${uuidV4()}', 'Ipanema', '${state.id}'),
        ('${uuidV4()}', 'Ipatinga', '${state.id}'),
        ('${uuidV4()}', 'Ipiaçu', '${state.id}'),
        ('${uuidV4()}', 'Ipuiúna', '${state.id}'),
        ('${uuidV4()}', 'Iraí de Minas', '${state.id}'),
        ('${uuidV4()}', 'Itabira', '${state.id}'),
        ('${uuidV4()}', 'Itabirinha de Mantena', '${state.id}'),
        ('${uuidV4()}', 'Itabirito', '${state.id}'),
        ('${uuidV4()}', 'Itacambira', '${state.id}'),
        ('${uuidV4()}', 'Itacarambi', '${state.id}'),
        ('${uuidV4()}', 'Itaguara', '${state.id}'),
        ('${uuidV4()}', 'Itaipé', '${state.id}'),
        ('${uuidV4()}', 'Itajubá', '${state.id}'),
        ('${uuidV4()}', 'Itamarandiba', '${state.id}'),
        ('${uuidV4()}', 'Itamarati de Minas', '${state.id}'),
        ('${uuidV4()}', 'Itambacuri', '${state.id}'),
        ('${uuidV4()}', 'Itambé do Mato Dentro', '${state.id}'),
        ('${uuidV4()}', 'Itamogi', '${state.id}'),
        ('${uuidV4()}', 'Itamonte', '${state.id}'),
        ('${uuidV4()}', 'Itanhandu', '${state.id}'),
        ('${uuidV4()}', 'Itanhomi', '${state.id}'),
        ('${uuidV4()}', 'Itaobim', '${state.id}'),
        ('${uuidV4()}', 'Itapagipe', '${state.id}'),
        ('${uuidV4()}', 'Itapecerica', '${state.id}'),
        ('${uuidV4()}', 'Itapeva', '${state.id}'),
        ('${uuidV4()}', 'Itatiaiuçu', '${state.id}'),
        ('${uuidV4()}', 'Itaú de Minas', '${state.id}'),
        ('${uuidV4()}', 'Itaúna', '${state.id}'),
        ('${uuidV4()}', 'Itaverava', '${state.id}'),
        ('${uuidV4()}', 'Itinga', '${state.id}'),
        ('${uuidV4()}', 'Itueta', '${state.id}'),
        ('${uuidV4()}', 'Ituiutaba', '${state.id}'),
        ('${uuidV4()}', 'Itumirim', '${state.id}'),
        ('${uuidV4()}', 'Iturama', '${state.id}'),
        ('${uuidV4()}', 'Itutinga', '${state.id}'),
        ('${uuidV4()}', 'Jaboticatubas', '${state.id}'),
        ('${uuidV4()}', 'Jacinto', '${state.id}'),
        ('${uuidV4()}', 'Jacuí', '${state.id}'),
        ('${uuidV4()}', 'Jacutinga', '${state.id}'),
        ('${uuidV4()}', 'Jaguaraçu', '${state.id}'),
        ('${uuidV4()}', 'Jaíba', '${state.id}'),
        ('${uuidV4()}', 'Jampruca', '${state.id}'),
        ('${uuidV4()}', 'Janaúba', '${state.id}'),
        ('${uuidV4()}', 'Januária', '${state.id}'),
        ('${uuidV4()}', 'Japaraíba', '${state.id}'),
        ('${uuidV4()}', 'Japonvar', '${state.id}'),
        ('${uuidV4()}', 'Jeceaba', '${state.id}'),
        ('${uuidV4()}', 'Jenipapo de Minas', '${state.id}'),
        ('${uuidV4()}', 'Jequeri', '${state.id}'),
        ('${uuidV4()}', 'Jequitaí', '${state.id}'),
        ('${uuidV4()}', 'Jequitibá', '${state.id}'),
        ('${uuidV4()}', 'Jequitinhonha', '${state.id}'),
        ('${uuidV4()}', 'Jesuânia', '${state.id}'),
        ('${uuidV4()}', 'Joaíma', '${state.id}'),
        ('${uuidV4()}', 'Joanésia', '${state.id}'),
        ('${uuidV4()}', 'João Monlevade', '${state.id}'),
        ('${uuidV4()}', 'João Pinheiro', '${state.id}'),
        ('${uuidV4()}', 'Joaquim Felício', '${state.id}'),
        ('${uuidV4()}', 'Jordânia', '${state.id}'),
        ('${uuidV4()}', 'José Gonçalves de Minas', '${state.id}'),
        ('${uuidV4()}', 'José Raydan', '${state.id}'),
        ('${uuidV4()}', 'Josenópolis', '${state.id}'),
        ('${uuidV4()}', 'Juatuba', '${state.id}'),
        ('${uuidV4()}', 'Juiz de Fora', '${state.id}'),
        ('${uuidV4()}', 'Juramento', '${state.id}'),
        ('${uuidV4()}', 'Juruaia', '${state.id}'),
        ('${uuidV4()}', 'Juvenília', '${state.id}'),
        ('${uuidV4()}', 'Ladainha', '${state.id}'),
        ('${uuidV4()}', 'Lagamar', '${state.id}'),
        ('${uuidV4()}', 'Lagoa da Prata', '${state.id}'),
        ('${uuidV4()}', 'Lagoa dos Patos', '${state.id}'),
        ('${uuidV4()}', 'Lagoa Dourada', '${state.id}'),
        ('${uuidV4()}', 'Lagoa Formosa', '${state.id}'),
        ('${uuidV4()}', 'Lagoa Grande', '${state.id}'),
        ('${uuidV4()}', 'Lagoa Santa', '${state.id}'),
        ('${uuidV4()}', 'Lajinha', '${state.id}'),
        ('${uuidV4()}', 'Lambari', '${state.id}'),
        ('${uuidV4()}', 'Lamim', '${state.id}'),
        ('${uuidV4()}', 'Laranjal', '${state.id}'),
        ('${uuidV4()}', 'Lassance', '${state.id}'),
        ('${uuidV4()}', 'Lavras', '${state.id}'),
        ('${uuidV4()}', 'Leandro Ferreira', '${state.id}'),
        ('${uuidV4()}', 'Leme do Prado', '${state.id}'),
        ('${uuidV4()}', 'Leopoldina', '${state.id}'),
        ('${uuidV4()}', 'Liberdade', '${state.id}'),
        ('${uuidV4()}', 'Lima Duarte', '${state.id}'),
        ('${uuidV4()}', 'Limeira do Oeste', '${state.id}'),
        ('${uuidV4()}', 'Lontra', '${state.id}'),
        ('${uuidV4()}', 'Luisburgo', '${state.id}'),
        ('${uuidV4()}', 'Luislândia', '${state.id}'),
        ('${uuidV4()}', 'Luminárias', '${state.id}'),
        ('${uuidV4()}', 'Luz', '${state.id}'),
        ('${uuidV4()}', 'Machacalis', '${state.id}'),
        ('${uuidV4()}', 'Machado', '${state.id}'),
        ('${uuidV4()}', 'Madre de Deus de Minas', '${state.id}'),
        ('${uuidV4()}', 'Malacacheta', '${state.id}'),
        ('${uuidV4()}', 'Mamonas', '${state.id}'),
        ('${uuidV4()}', 'Manga', '${state.id}'),
        ('${uuidV4()}', 'Manhuaçu', '${state.id}'),
        ('${uuidV4()}', 'Manhumirim', '${state.id}'),
        ('${uuidV4()}', 'Mantena', '${state.id}'),
        ('${uuidV4()}', 'Mar de Espanha', '${state.id}'),
        ('${uuidV4()}', 'Maravilhas', '${state.id}'),
        ('${uuidV4()}', 'Maria da Fé', '${state.id}'),
        ('${uuidV4()}', 'Mariana', '${state.id}'),
        ('${uuidV4()}', 'Marilac', '${state.id}'),
        ('${uuidV4()}', 'Mário Campos', '${state.id}'),
        ('${uuidV4()}', 'Maripá de Minas', '${state.id}'),
        ('${uuidV4()}', 'Marliéria', '${state.id}'),
        ('${uuidV4()}', 'Marmelópolis', '${state.id}'),
        ('${uuidV4()}', 'Martinho Campos', '${state.id}'),
        ('${uuidV4()}', 'Martins Soares', '${state.id}'),
        ('${uuidV4()}', 'Mata Verde', '${state.id}'),
        ('${uuidV4()}', 'Materlândia', '${state.id}'),
        ('${uuidV4()}', 'Mateus Leme', '${state.id}'),
        ('${uuidV4()}', 'Mathias Lobato', '${state.id}'),
        ('${uuidV4()}', 'Matias Barbosa', '${state.id}'),
        ('${uuidV4()}', 'Matias Cardoso', '${state.id}'),
        ('${uuidV4()}', 'Matipó', '${state.id}'),
        ('${uuidV4()}', 'Mato Verde', '${state.id}'),
        ('${uuidV4()}', 'Matozinhos', '${state.id}'),
        ('${uuidV4()}', 'Matutina', '${state.id}'),
        ('${uuidV4()}', 'Medeiros', '${state.id}'),
        ('${uuidV4()}', 'Medina', '${state.id}'),
        ('${uuidV4()}', 'Mendes Pimentel', '${state.id}'),
        ('${uuidV4()}', 'Mercês', '${state.id}'),
        ('${uuidV4()}', 'Mesquita', '${state.id}'),
        ('${uuidV4()}', 'Minas Novas', '${state.id}'),
        ('${uuidV4()}', 'Minduri', '${state.id}'),
        ('${uuidV4()}', 'Mirabela', '${state.id}'),
        ('${uuidV4()}', 'Miradouro', '${state.id}'),
        ('${uuidV4()}', 'Miraí', '${state.id}'),
        ('${uuidV4()}', 'Miravânia', '${state.id}'),
        ('${uuidV4()}', 'Moeda', '${state.id}'),
        ('${uuidV4()}', 'Moema', '${state.id}'),
        ('${uuidV4()}', 'Monjolos', '${state.id}'),
        ('${uuidV4()}', 'Monsenhor Paulo', '${state.id}'),
        ('${uuidV4()}', 'Montalvânia', '${state.id}'),
        ('${uuidV4()}', 'Monte Alegre de Minas', '${state.id}'),
        ('${uuidV4()}', 'Monte Azul', '${state.id}'),
        ('${uuidV4()}', 'Monte Belo', '${state.id}'),
        ('${uuidV4()}', 'Monte Carmelo', '${state.id}'),
        ('${uuidV4()}', 'Monte Formoso', '${state.id}'),
        ('${uuidV4()}', 'Monte Santo de Minas', '${state.id}'),
        ('${uuidV4()}', 'Monte Sião', '${state.id}'),
        ('${uuidV4()}', 'Montes Claros', '${state.id}'),
        ('${uuidV4()}', 'Montezuma', '${state.id}'),
        ('${uuidV4()}', 'Morada Nova de Minas', '${state.id}'),
        ('${uuidV4()}', 'Morro da Garça', '${state.id}'),
        ('${uuidV4()}', 'Morro do Pilar', '${state.id}'),
        ('${uuidV4()}', 'Munhoz', '${state.id}'),
        ('${uuidV4()}', 'Muriaé', '${state.id}'),
        ('${uuidV4()}', 'Mutum', '${state.id}'),
        ('${uuidV4()}', 'Muzambinho', '${state.id}'),
        ('${uuidV4()}', 'Nacip Raydan', '${state.id}'),
        ('${uuidV4()}', 'Nanuque', '${state.id}'),
        ('${uuidV4()}', 'Naque', '${state.id}'),
        ('${uuidV4()}', 'Natalândia', '${state.id}'),
        ('${uuidV4()}', 'Natércia', '${state.id}'),
        ('${uuidV4()}', 'Nazareno', '${state.id}'),
        ('${uuidV4()}', 'Nepomuceno', '${state.id}'),
        ('${uuidV4()}', 'Ninheira', '${state.id}'),
        ('${uuidV4()}', 'Nova Belém', '${state.id}'),
        ('${uuidV4()}', 'Nova Era', '${state.id}'),
        ('${uuidV4()}', 'Nova Lima', '${state.id}'),
        ('${uuidV4()}', 'Nova Módica', '${state.id}'),
        ('${uuidV4()}', 'Nova Ponte', '${state.id}'),
        ('${uuidV4()}', 'Nova Porteirinha', '${state.id}'),
        ('${uuidV4()}', 'Nova Resende', '${state.id}'),
        ('${uuidV4()}', 'Nova Serrana', '${state.id}'),
        ('${uuidV4()}', 'Nova União', '${state.id}'),
        ('${uuidV4()}', 'Novo Cruzeiro', '${state.id}'),
        ('${uuidV4()}', 'Novo Oriente de Minas', '${state.id}'),
        ('${uuidV4()}', 'Novorizonte', '${state.id}'),
        ('${uuidV4()}', 'Olaria', '${state.id}'),
        ('${uuidV4()}', 'Olhos-d´Água', '${state.id}'),
        ('${uuidV4()}', 'Olímpio Noronha', '${state.id}'),
        ('${uuidV4()}', 'Oliveira', '${state.id}'),
        ('${uuidV4()}', 'Oliveira Fortes', '${state.id}'),
        ('${uuidV4()}', 'Onça de Pitangui', '${state.id}'),
        ('${uuidV4()}', 'Oratórios', '${state.id}'),
        ('${uuidV4()}', 'Orizânia', '${state.id}'),
        ('${uuidV4()}', 'Ouro Branco', '${state.id}'),
        ('${uuidV4()}', 'Ouro Fino', '${state.id}'),
        ('${uuidV4()}', 'Ouro Preto', '${state.id}'),
        ('${uuidV4()}', 'Ouro Verde de Minas', '${state.id}'),
        ('${uuidV4()}', 'Padre Carvalho', '${state.id}')
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
