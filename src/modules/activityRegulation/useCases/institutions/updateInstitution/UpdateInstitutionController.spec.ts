import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { City } from "@modules/territory/infra/typeorm/entities/City";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Update Institution Controller", () => {
  const institutionId = uuidV4();

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("h08f563J", 8);

    await connection.query(
      `INSERT INTO
          "user"(id, name, last_name, password, email, identifier, access_level)
          VALUES('${uuidV4()}', 'Ruby Barnett', 'Max Hammond', '${password}', 'bora@ruc.cw', '88471531365', 'administrador do campus')`,
    );

    await connection.query(
      `INSERT INTO
          "user"(id, name, last_name, password, email, identifier, access_level)
          VALUES('${uuidV4()}', 'Eddie Clayton', 'Gavin Terry', '${password}', 'tan@tihuhoh.la', '38770871889', 'administrador geral')`,
    );

    const city = await connection.manager.findOne(City, { name: "Arinos" });

    await connection.query(
      `INSERT INTO
          "institution"(id, name, city_id)
          VALUES('${institutionId}', 'IFNMG - campus Araçuaí', '${city.id}')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to update a institution", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "tan@tihuhoh.la",
      password: "h08f563J",
    });

    const { token } = responseToken.body;

    const responseUpdateInstitution = await request(app)
      .put(`/institutions?institutionId=${institutionId}`)
      .send({
        name: "IFNMG - campus Arinos",
        city: institutionId,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseUpdateInstitution.status).toBe(200);
  });

  it("should not be able to update a institution if you don't have permission", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "bora@ruc.cw",
      password: "h08f563J",
    });

    const { token } = responseToken.body;

    const responseUpdateInstitution = await request(app)
      .put(`/institutions?institutionId=${institutionId}`)
      .send({
        name: "IFNMG - campus Arinos",
        city: institutionId,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseUpdateInstitution.status).toBe(401);
  });

  it("should not be able to update a profile institution if you are not authenticated", async () => {
    const responseUpdateInstitution = await request(app)
      .put(`/institutions?institutionId=${institutionId}`)
      .send({
        name: "IFNMG - campus Arinos",
        city: institutionId,
      });

    expect(responseUpdateInstitution.status).toBe(401);
  });
});
