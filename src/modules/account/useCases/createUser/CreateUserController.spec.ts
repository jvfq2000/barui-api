import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { City } from "@modules/territory/infra/typeorm/entities/City";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Create User Controller", () => {
  let city: City;
  const courseId = uuidV4();
  const institutionId = uuidV4();

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
          VALUES('${uuidV4()}', 'Gilbert Jordan', 'Francis Conner', '${password}', 'ecoge@zagpuzef.vg', '76252991806', 'coordenador de atividades')`,
    );

    city = await connection.manager.findOne(City, { name: "Arinos" });

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

  it("should be able to create a new user", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "zaz@idazapup.it",
      password: "Co2arCmS",
    });

    const { token } = responseToken.body;

    const user: ISaveUserDTO = {
      name: "Emily Dixon",
      lastName: "Jimmy Hopkins",
      email: "vojwacle@ku.ae",
      identifier: "24233361131",
      telephone: "(921) 583-5241",
      initialSemester: "1/2022",
      registration: "31191",
      accessLevel: "aluno",
      courseId,
      institutionId,
    };

    const response = await request(app)
      .post("/users")
      .send(user)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new user with email exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "zaz@idazapup.it",
      password: "Co2arCmS",
    });

    const { token } = responseToken.body;

    const user: ISaveUserDTO = {
      name: "Allen Miles",
      lastName: "Aaron Herrera",
      email: "ge@za.lk",
      identifier: "58570130036",
      telephone: "(511) 910-6224",
      initialSemester: "1/2022",
      registration: "59319",
      accessLevel: "aluno",
      courseId,
      institutionId,
    };

    await request(app)
      .post("/users")
      .send(user)
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .post("/users")
      .send(user)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });

  it("should not be able to create a new user if you don't have permission", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "ecoge@zagpuzef.vg",
      password: "Co2arCmS",
    });

    const { token } = responseToken.body;

    const user: ISaveUserDTO = {
      name: "Christopher Phelps",
      lastName: "Joshua Carlson",
      email: "fi@luhrifo.me",
      identifier: "16612293933",
      telephone: "(919) 477-4232",
      initialSemester: "1/2022",
      registration: "56583",
      accessLevel: "aluno",
      courseId,
      institutionId,
    };

    const response = await request(app)
      .post("/users")
      .send(user)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(401);
  });
});
