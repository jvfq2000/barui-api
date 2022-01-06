import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { City } from "@modules/territory/infra/typeorm/entities/City";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Find Course By Id Controller", () => {
  const courseId = uuidV4();

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("Co2arCmS", 8);

    await connection.query(
      `INSERT INTO
        "user"(id, name, last_name, password, email, identifier, access_level)
        VALUES('${uuidV4()}', 'Francisco Wheeler', 'Loretta Gutierrez', '${password}', 'zaz@idazapup.it', '12445961325', 'administrador geral')`,
    );

    await connection.query(
      `INSERT INTO
          "user"(id, name, last_name, password, email, identifier, access_level)
          VALUES('${uuidV4()}', 'Gilbert Jordan', 'Francis Conner', '${password}', 'ecoge@zagpuzef.vg', '76252991806', 'coordenador de curso')`,
    );

    const city = await connection.manager.findOne(City, { name: "Arinos" });
    const institutionId = uuidV4();

    await connection.query(
      `INSERT INTO
          "institution"(id, name, city_id)
          VALUES('${institutionId}', 'IFNMG - campus Arinos', '${city.id}')`,
    );

    await connection.query(
      `INSERT INTO
          "course"(id, name, number_periods, institution_id)
          VALUES('${courseId}', 'Bacharelado em Sistemas de Informação', 8, '${institutionId}')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to find course by id", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "zaz@idazapup.it",
      password: "Co2arCmS",
    });

    const { token } = responseToken.body;

    const responseFindById = await request(app)
      .get(`/courses/by-id?courseId=${courseId}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseFindById.status).toBe(200);
  });

  it("should not be able to find course by id if you don'd have permition", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "ecoge@zagpuzef.vg",
      password: "Co2arCmS",
    });

    const { token } = responseToken.body;

    const responseFindById = await request(app)
      .get(`/courses/by-id?courseId=${courseId}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseFindById.status).toBe(401);
  });

  it("should not be able to find course if id non exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "zaz@idazapup.it",
      password: "Co2arCmS",
    });

    const { token } = responseToken.body;

    const responseFindById = await request(app)
      .get(`/courses/by-id?courseId=${uuidV4()}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseFindById.status).toBe(400);
  });
});
