import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { City } from "@modules/territory/infra/typeorm/entities/City";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Find Institution By Id Controller", () => {
  const institutionId = uuidV4();

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("h08f563J", 8);

    const city = await connection.manager.findOne(City, { name: "Arinos" });

    await connection.query(
      `INSERT INTO
          "institution"(id, name, city_id)
          VALUES('${institutionId}', 'IFNMG - campus Arinos', '${city.id}')`,
    );

    await connection.query(
      `INSERT INTO
          "user"(id, name, last_name, password, email, identifier, access_level, institution_id)
          VALUES('${uuidV4()}', 'Eddie Clayton', 'Gavin Terry', '${password}', 'tan@tihuhoh.la', '38770871889', 'administrador geral', '${institutionId}')`,
    );

    await connection.query(
      `INSERT INTO
          "user"(id, name, last_name, password, email, identifier, access_level, institution_id)
          VALUES('${uuidV4()}', 'Jeffrey Elliott', 'Jordan Phillips', '${password}', 'lorormev@bak.at', '79040487225', 'administrador do campus', '${institutionId}')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to find institution by id", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "tan@tihuhoh.la",
      password: "h08f563J",
    });

    const { token } = responseToken.body;

    const responseFindById = await request(app)
      .get(`/institutions/by-id?institutionId=${institutionId}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseFindById.status).toBe(200);
  });

  it("should not be able to find user by id if you don'd have permition", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "lorormev@bak.at",
      password: "h08f563J",
    });

    const { token } = responseToken.body;

    const responseFindById = await request(app)
      .get(`/institutions/by-id?institutionId=${institutionId}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseFindById.status).toBe(401);
  });

  it("should not be able to find user if id non exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "tan@tihuhoh.la",
      password: "h08f563J",
    });

    const { token } = responseToken.body;

    const responseFindById = await request(app)
      .get(`/institutions/by-id?institutionId=${uuidV4()}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseFindById.status).toBe(400);
  });
});
