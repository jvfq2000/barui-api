import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { City } from "@modules/territory/infra/typeorm/entities/City";
import { app } from "@shared/infra/http/app";

let connection: Connection;

const user1Id = uuidV4();
const user2Id = uuidV4();

describe("Find User By Id Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("h08f563J", 8);

    const city = await connection.manager.findOne(City, { name: "Arinos" });
    const institution1Id = uuidV4();
    const institution2Id = uuidV4();

    await connection.query(
      `INSERT INTO
          "institution"(id, name, city_id)
          VALUES('${institution1Id}', 'IFNMG - campus Arinos', '${city.id}')`,
    );

    await connection.query(
      `INSERT INTO
          "institution"(id, name, city_id)
          VALUES('${institution2Id}', 'IFNMG - campus Araçuaí', '${city.id}')`,
    );

    await connection.query(
      `INSERT INTO
          "user"(id, name, last_name, password, email, identifier, access_level, institution_id)
          VALUES('${user1Id}', 'Eddie Clayton', 'Gavin Terry', '${password}', 'tan@tihuhoh.la', '38770871889', 'administrador geral', '${institution1Id}')`,
    );

    await connection.query(
      `INSERT INTO
          "user"(id, name, last_name, password, email, identifier, access_level, institution_id)
          VALUES('${user2Id}', 'Jeffrey Elliott', 'Jordan Phillips', '${password}', 'lorormev@bak.at', '79040487225', 'aluno', '${institution2Id}')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to find user by id", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "lorormev@bak.at",
      password: "h08f563J",
    });

    const { token } = responseToken.body;

    const responseFindById = await request(app)
      .get(`/users/by-id?userId=${user2Id}`)
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
      .get(`/users/by-id?userId=${user1Id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseFindById.status).toBe(401);
  });

  it("should not be able to find user if id non exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "lorormev@bak.at",
      password: "h08f563J",
    });

    const { token } = responseToken.body;

    const responseFindById = await request(app)
      .get(`/users/by-id?userId=${uuidV4()}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseFindById.status).toBe(400);
  });
});
