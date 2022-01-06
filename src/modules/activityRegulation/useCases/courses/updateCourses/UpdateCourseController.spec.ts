import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { City } from "@modules/territory/infra/typeorm/entities/City";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Update Course Controller", () => {
  const courseId = uuidV4();
  const institutionId = uuidV4();

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("h08f563J", 8);

    await connection.query(
      `INSERT INTO
          "user"(id, name, last_name, password, email, identifier, access_level)
          VALUES('${uuidV4()}', 'Ruby Barnett', 'Max Hammond', '${password}', 'bora@ruc.cw', '88471531365', 'coordenador de curso')`,
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

  it("should be able to update a course", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "tan@tihuhoh.la",
      password: "h08f563J",
    });

    const { token } = responseToken.body;

    const responseUpdateCourse = await request(app)
      .put(`/courses?courseId=${courseId}`)
      .send({
        name: "Sistemas de Informação",
        numberPeriods: 6,
        institutionId,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseUpdateCourse.status).toBe(200);
  });

  it("should not be able to update a course if you don't have permition", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "bora@ruc.cw",
      password: "h08f563J",
    });

    const { token } = responseToken.body;

    const responseUpdateCourse = await request(app)
      .put(`/courses?courseId=${courseId}`)
      .send({
        name: "Sistemas de Informação",
        numberPeriods: 6,
        institutionId,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseUpdateCourse.status).toBe(401);
  });

  it("should not be able to update a profile Course if you are not authenticated", async () => {
    const responseUpdateCourse = await request(app)
      .put(`/courses?courseId=${courseId}`)
      .send({
        name: "Sistemas de Informação",
        numberPeriods: 6,
        institutionId,
      });

    expect(responseUpdateCourse.status).toBe(401);
  });
});
