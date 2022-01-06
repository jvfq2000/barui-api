import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { City } from "@modules/territory/infra/typeorm/entities/City";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Modiry Is Active Institution Controller", () => {
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

  it("should be able to modify active or inactive institution status", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "tan@tihuhoh.la",
      password: "h08f563J",
    });

    const { token } = responseToken.body;

    const responseModfyIsActive = await request(app)
      .patch(`/institutions/is-active?institutionId=${institutionId}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseModfyIsActive.status).toBe(204);
  });

  it("should not be able to modify active or inactive institution status if you don't have permition", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "bora@ruc.cw",
      password: "h08f563J",
    });

    const { token } = responseToken.body;

    const responseModfyIsActive = await request(app)
      .patch(`/institutions/is-active?institutionId=${institutionId}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseModfyIsActive.status).toBe(401);
  });
});
