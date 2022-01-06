import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { City } from "@modules/territory/infra/typeorm/entities/City";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Create Course Controller", () => {
  let city: City;
  const institutionId = uuidV4();

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    city = await connection.manager.findOne(City, { name: "Arinos" });

    await connection.query(
      `INSERT INTO
          "institution"(id, name, city_id)
          VALUES('${institutionId}', 'Institution Mable Matthews', '${city.id}')`,
    );

    const password = await hash("Co2arCmS", 8);

    await connection.query(
      `INSERT INTO
        "user"(id, name, last_name, password, email, identifier, access_level, institution_id)
        VALUES('${uuidV4()}', 'Francisco Wheeler', 'Loretta Gutierrez', '${password}', 'zaz@idazapup.it', '12445961325', 'administrador do campus', '${institutionId}')`,
    );

    await connection.query(
      `INSERT INTO
          "user"(id, name, last_name, password, email, identifier, access_level)
          VALUES('${uuidV4()}', 'Gilbert Jordan', 'Francis Conner', '${password}', 'ecoge@zagpuzef.vg', '76252991806', 'coordenador de curso')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new course", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "zaz@idazapup.it",
      password: "Co2arCmS",
    });

    const { token } = responseToken.body;

    const responseCourse = await request(app)
      .post("/courses")
      .send({
        name: "Course Hilda McGuire",
        numberPeriods: 6,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseCourse.status).toBe(201);
  });

  it("should not be able to create a new course with name exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "zaz@idazapup.it",
      password: "Co2arCmS",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/courses")
      .send({
        name: "Course Gertrude Cannon",
        numberPeriods: 4,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const responseCourse = await request(app)
      .post("/courses")
      .send({
        name: "Course Gertrude Cannon",
        numberPeriods: 4,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseCourse.status).toBe(400);
  });

  it("should not be able to create a new course if you don't have permission", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "ecoge@zagpuzef.vg",
      password: "Co2arCmS",
    });

    const { token } = responseToken.body;

    const responseCourse = await request(app)
      .post("/courses")
      .send({
        name: "Course Trevor Sparks",
        cityId: city.id,
        institutionId,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseCourse.status).toBe(401);
  });

  it("should not be able to create an course if you are not authenticated", async () => {
    const responseCourse = await request(app).post("/courses").send({
      name: "Course Troy Zimmerman",
      cityId: city.id,
      institutionId,
    });

    expect(responseCourse.status).toBe(401);
  });
});
