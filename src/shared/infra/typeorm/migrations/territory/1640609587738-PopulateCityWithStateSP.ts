import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

const acronym = "SP";

export class PopulateCityWithStateSP1640609587738
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, { acronym });

    await queryRunner.query(
      `
        INSERT INTO
          "city" (id, name, state_id)
        VALUES
          ('${uuidV4()}', 'Adamantina', '${state.id}'),
          ('${uuidV4()}', 'Adolfo', '${state.id}'),
          ('${uuidV4()}', 'Aguaí', '${state.id}'),
          ('${uuidV4()}', 'Águas da Prata', '${state.id}'),
          ('${uuidV4()}', 'Águas de Lindóia', '${state.id}'),
          ('${uuidV4()}', 'Águas de Santa Bárbara', '${state.id}'),
          ('${uuidV4()}', 'Águas de São Pedro', '${state.id}'),
          ('${uuidV4()}', 'Agudos', '${state.id}'),
          ('${uuidV4()}', 'Alambari', '${state.id}'),
          ('${uuidV4()}', 'Alfredo Marcondes', '${state.id}'),
          ('${uuidV4()}', 'Altair', '${state.id}'),
          ('${uuidV4()}', 'Altinópolis', '${state.id}'),
          ('${uuidV4()}', 'Alto Alegre', '${state.id}'),
          ('${uuidV4()}', 'Alumínio', '${state.id}'),
          ('${uuidV4()}', 'Álvares Florence', '${state.id}'),
          ('${uuidV4()}', 'Álvares Machado', '${state.id}'),
          ('${uuidV4()}', 'Álvaro de Carvalho', '${state.id}'),
          ('${uuidV4()}', 'Alvinlândia', '${state.id}'),
          ('${uuidV4()}', 'Americana', '${state.id}'),
          ('${uuidV4()}', 'Américo Brasiliense', '${state.id}'),
          ('${uuidV4()}', 'Américo de Campos', '${state.id}'),
          ('${uuidV4()}', 'Amparo', '${state.id}'),
          ('${uuidV4()}', 'Analândia', '${state.id}'),
          ('${uuidV4()}', 'Andradina', '${state.id}'),
          ('${uuidV4()}', 'Angatuba', '${state.id}'),
          ('${uuidV4()}', 'Anhembi', '${state.id}'),
          ('${uuidV4()}', 'Anhumas', '${state.id}'),
          ('${uuidV4()}', 'Aparecida', '${state.id}'),
          ('${uuidV4()}', 'Aparecida d´Oeste', '${state.id}'),
          ('${uuidV4()}', 'Apiaí', '${state.id}'),
          ('${uuidV4()}', 'Araçariguama', '${state.id}'),
          ('${uuidV4()}', 'Araçatuba', '${state.id}'),
          ('${uuidV4()}', 'Araçoiaba da Serra', '${state.id}'),
          ('${uuidV4()}', 'Aramina', '${state.id}'),
          ('${uuidV4()}', 'Arandu', '${state.id}'),
          ('${uuidV4()}', 'Arapeí', '${state.id}'),
          ('${uuidV4()}', 'Araraquara', '${state.id}'),
          ('${uuidV4()}', 'Araras', '${state.id}'),
          ('${uuidV4()}', 'Arco-Íris', '${state.id}'),
          ('${uuidV4()}', 'Arealva', '${state.id}'),
          ('${uuidV4()}', 'Areias', '${state.id}'),
          ('${uuidV4()}', 'Areiópolis', '${state.id}'),
          ('${uuidV4()}', 'Ariranha', '${state.id}'),
          ('${uuidV4()}', 'Artur Nogueira', '${state.id}'),
          ('${uuidV4()}', 'Arujá', '${state.id}'),
          ('${uuidV4()}', 'Aspásia', '${state.id}'),
          ('${uuidV4()}', 'Assis', '${state.id}'),
          ('${uuidV4()}', 'Atibaia', '${state.id}'),
          ('${uuidV4()}', 'Auriflama', '${state.id}'),
          ('${uuidV4()}', 'Avaí', '${state.id}'),
          ('${uuidV4()}', 'Avanhandava', '${state.id}'),
          ('${uuidV4()}', 'Avaré', '${state.id}'),
          ('${uuidV4()}', 'Bady Bassitt', '${state.id}'),
          ('${uuidV4()}', 'Balbinos', '${state.id}'),
          ('${uuidV4()}', 'Bálsamo', '${state.id}'),
          ('${uuidV4()}', 'Bananal', '${state.id}'),
          ('${uuidV4()}', 'Barão de Antonina', '${state.id}'),
          ('${uuidV4()}', 'Barbosa', '${state.id}'),
          ('${uuidV4()}', 'Bariri', '${state.id}'),
          ('${uuidV4()}', 'Barra Bonita', '${state.id}'),
          ('${uuidV4()}', 'Barra do Chapéu', '${state.id}'),
          ('${uuidV4()}', 'Barra do Turvo', '${state.id}'),
          ('${uuidV4()}', 'Barretos', '${state.id}'),
          ('${uuidV4()}', 'Barrinha', '${state.id}'),
          ('${uuidV4()}', 'Barueri', '${state.id}'),
          ('${uuidV4()}', 'Bastos', '${state.id}'),
          ('${uuidV4()}', 'Batatais', '${state.id}'),
          ('${uuidV4()}', 'Bauru', '${state.id}'),
          ('${uuidV4()}', 'Bebedouro', '${state.id}'),
          ('${uuidV4()}', 'Bento de Abreu', '${state.id}'),
          ('${uuidV4()}', 'Bernardino de Campos', '${state.id}'),
          ('${uuidV4()}', 'Bertioga', '${state.id}'),
          ('${uuidV4()}', 'Bilac', '${state.id}'),
          ('${uuidV4()}', 'Birigui', '${state.id}'),
          ('${uuidV4()}', 'Biritiba-Mirim', '${state.id}'),
          ('${uuidV4()}', 'Boa Esperança do Sul', '${state.id}'),
          ('${uuidV4()}', 'Bocaina', '${state.id}'),
          ('${uuidV4()}', 'Bofete', '${state.id}'),
          ('${uuidV4()}', 'Boituva', '${state.id}'),
          ('${uuidV4()}', 'Bom Jesus dos Perdões', '${state.id}'),
          ('${uuidV4()}', 'Bom Sucesso de Itararé', '${state.id}'),
          ('${uuidV4()}', 'Borá', '${state.id}'),
          ('${uuidV4()}', 'Boracéia', '${state.id}'),
          ('${uuidV4()}', 'Borborema', '${state.id}'),
          ('${uuidV4()}', 'Borebi', '${state.id}'),
          ('${uuidV4()}', 'Botucatu', '${state.id}'),
          ('${uuidV4()}', 'Bragança Paulista', '${state.id}'),
          ('${uuidV4()}', 'Braúna', '${state.id}'),
          ('${uuidV4()}', 'Brejo Alegre', '${state.id}'),
          ('${uuidV4()}', 'Brodowski', '${state.id}'),
          ('${uuidV4()}', 'Brotas', '${state.id}'),
          ('${uuidV4()}', 'Buri', '${state.id}'),
          ('${uuidV4()}', 'Buritama', '${state.id}'),
          ('${uuidV4()}', 'Buritizal', '${state.id}'),
          ('${uuidV4()}', 'Cabrália Paulista', '${state.id}'),
          ('${uuidV4()}', 'Cabreúva', '${state.id}'),
          ('${uuidV4()}', 'Caçapava', '${state.id}'),
          ('${uuidV4()}', 'Cachoeira Paulista', '${state.id}'),
          ('${uuidV4()}', 'Caconde', '${state.id}'),
          ('${uuidV4()}', 'Cafelândia', '${state.id}'),
          ('${uuidV4()}', 'Caiabu', '${state.id}'),
          ('${uuidV4()}', 'Caieiras', '${state.id}'),
          ('${uuidV4()}', 'Caiuá', '${state.id}'),
          ('${uuidV4()}', 'Cajamar', '${state.id}'),
          ('${uuidV4()}', 'Cajati', '${state.id}'),
          ('${uuidV4()}', 'Cajobi', '${state.id}'),
          ('${uuidV4()}', 'Cajuru', '${state.id}'),
          ('${uuidV4()}', 'Campina do Monte Alegre', '${state.id}'),
          ('${uuidV4()}', 'Campinas', '${state.id}'),
          ('${uuidV4()}', 'Campo Limpo Paulista', '${state.id}'),
          ('${uuidV4()}', 'Campos do Jordão', '${state.id}'),
          ('${uuidV4()}', 'Campos Novos Paulista', '${state.id}'),
          ('${uuidV4()}', 'Cananéia', '${state.id}'),
          ('${uuidV4()}', 'Canas', '${state.id}'),
          ('${uuidV4()}', 'Cândido Mota', '${state.id}'),
          ('${uuidV4()}', 'Cândido Rodrigues', '${state.id}'),
          ('${uuidV4()}', 'Canitar', '${state.id}'),
          ('${uuidV4()}', 'Capão Bonito', '${state.id}'),
          ('${uuidV4()}', 'Capela do Alto', '${state.id}'),
          ('${uuidV4()}', 'Capivari', '${state.id}'),
          ('${uuidV4()}', 'Caraguatatuba', '${state.id}'),
          ('${uuidV4()}', 'Carapicuíba', '${state.id}'),
          ('${uuidV4()}', 'Cardoso', '${state.id}'),
          ('${uuidV4()}', 'Casa Branca', '${state.id}'),
          ('${uuidV4()}', 'Cássia dos Coqueiros', '${state.id}'),
          ('${uuidV4()}', 'Castilho', '${state.id}'),
          ('${uuidV4()}', 'Catanduva', '${state.id}'),
          ('${uuidV4()}', 'Catiguá', '${state.id}'),
          ('${uuidV4()}', 'Cedral', '${state.id}'),
          ('${uuidV4()}', 'Cerqueira César', '${state.id}'),
          ('${uuidV4()}', 'Cerquilho', '${state.id}'),
          ('${uuidV4()}', 'Cesário Lange', '${state.id}'),
          ('${uuidV4()}', 'Charqueada', '${state.id}'),
          ('${uuidV4()}', 'Chavantes', '${state.id}'),
          ('${uuidV4()}', 'Clementina', '${state.id}'),
          ('${uuidV4()}', 'Colina', '${state.id}'),
          ('${uuidV4()}', 'Colômbia', '${state.id}'),
          ('${uuidV4()}', 'Conchal', '${state.id}'),
          ('${uuidV4()}', 'Conchas', '${state.id}'),
          ('${uuidV4()}', 'Cordeirópolis', '${state.id}'),
          ('${uuidV4()}', 'Coroados', '${state.id}'),
          ('${uuidV4()}', 'Coronel Macedo', '${state.id}'),
          ('${uuidV4()}', 'Corumbataí', '${state.id}'),
          ('${uuidV4()}', 'Cosmópolis', '${state.id}'),
          ('${uuidV4()}', 'Cosmorama', '${state.id}'),
          ('${uuidV4()}', 'Cotia', '${state.id}'),
          ('${uuidV4()}', 'Cravinhos', '${state.id}'),
          ('${uuidV4()}', 'Cristais Paulista', '${state.id}'),
          ('${uuidV4()}', 'Cruzália', '${state.id}'),
          ('${uuidV4()}', 'Cruzeiro', '${state.id}'),
          ('${uuidV4()}', 'Cubatão', '${state.id}'),
          ('${uuidV4()}', 'Cunha', '${state.id}'),
          ('${uuidV4()}', 'Descalvado', '${state.id}'),
          ('${uuidV4()}', 'Diadema', '${state.id}'),
          ('${uuidV4()}', 'Dirce Reis', '${state.id}'),
          ('${uuidV4()}', 'Divinolândia', '${state.id}'),
          ('${uuidV4()}', 'Dobrada', '${state.id}'),
          ('${uuidV4()}', 'Dois Córregos', '${state.id}'),
          ('${uuidV4()}', 'Dolcinópolis', '${state.id}'),
          ('${uuidV4()}', 'Dourado', '${state.id}'),
          ('${uuidV4()}', 'Dracena', '${state.id}'),
          ('${uuidV4()}', 'Duartina', '${state.id}'),
          ('${uuidV4()}', 'Dumont', '${state.id}'),
          ('${uuidV4()}', 'Echaporã', '${state.id}'),
          ('${uuidV4()}', 'Eldorado', '${state.id}'),
          ('${uuidV4()}', 'Elias Fausto', '${state.id}'),
          ('${uuidV4()}', 'Elisiário', '${state.id}'),
          ('${uuidV4()}', 'Embaúba', '${state.id}'),
          ('${uuidV4()}', 'Embu', '${state.id}'),
          ('${uuidV4()}', 'Embu-Guaçu', '${state.id}'),
          ('${uuidV4()}', 'Emilianópolis', '${state.id}'),
          ('${uuidV4()}', 'Engenheiro Coelho', '${state.id}'),
          ('${uuidV4()}', 'Espírito Santo do Pinhal', '${state.id}'),
          ('${uuidV4()}', 'Espírito Santo do Turvo', '${state.id}'),
          ('${uuidV4()}', 'Estiva Gerbi', '${state.id}'),
          ('${uuidV4()}', 'Estrela d´Oeste', '${state.id}'),
          ('${uuidV4()}', 'Estrela do Norte', '${state.id}'),
          ('${uuidV4()}', 'Euclides da Cunha Paulista', '${state.id}'),
          ('${uuidV4()}', 'Fartura', '${state.id}'),
          ('${uuidV4()}', 'Fernando Prestes', '${state.id}'),
          ('${uuidV4()}', 'Fernandópolis', '${state.id}'),
          ('${uuidV4()}', 'Fernão', '${state.id}'),
          ('${uuidV4()}', 'Ferraz de Vasconcelos', '${state.id}'),
          ('${uuidV4()}', 'Flora Rica', '${state.id}'),
          ('${uuidV4()}', 'Floreal', '${state.id}'),
          ('${uuidV4()}', 'Flórida Paulista', '${state.id}'),
          ('${uuidV4()}', 'Florínia', '${state.id}'),
          ('${uuidV4()}', 'Franca', '${state.id}'),
          ('${uuidV4()}', 'Francisco Morato', '${state.id}'),
          ('${uuidV4()}', 'Franco da Rocha', '${state.id}'),
          ('${uuidV4()}', 'Gabriel Monteiro', '${state.id}'),
          ('${uuidV4()}', 'Gália', '${state.id}'),
          ('${uuidV4()}', 'Garça', '${state.id}'),
          ('${uuidV4()}', 'Gastão Vidigal', '${state.id}'),
          ('${uuidV4()}', 'Gavião Peixoto', '${state.id}'),
          ('${uuidV4()}', 'General Salgado', '${state.id}'),
          ('${uuidV4()}', 'Getulina', '${state.id}'),
          ('${uuidV4()}', 'Glicério', '${state.id}'),
          ('${uuidV4()}', 'Guaiçara', '${state.id}'),
          ('${uuidV4()}', 'Guaimbê', '${state.id}'),
          ('${uuidV4()}', 'Guaíra', '${state.id}'),
          ('${uuidV4()}', 'Guapiaçu', '${state.id}'),
          ('${uuidV4()}', 'Guapiara', '${state.id}'),
          ('${uuidV4()}', 'Guará', '${state.id}'),
          ('${uuidV4()}', 'Guaraçaí', '${state.id}'),
          ('${uuidV4()}', 'Guaraci', '${state.id}'),
          ('${uuidV4()}', 'Guarani d´Oeste', '${state.id}'),
          ('${uuidV4()}', 'Guarantã', '${state.id}'),
          ('${uuidV4()}', 'Guararapes', '${state.id}'),
          ('${uuidV4()}', 'Guararema', '${state.id}'),
          ('${uuidV4()}', 'Guaratinguetá', '${state.id}')
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
