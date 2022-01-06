import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { City } from "@modules/territory/infra/typeorm/entities/City";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Create Institution Controller", () => {
  let city: City;

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
          VALUES('${uuidV4()}', 'Gilbert Jordan', 'Francis Conner', '${password}', 'ecoge@zagpuzef.vg', '76252991806', 'administrador do campus')`,
    );

    city = await connection.manager.findOne(City, { name: "Arinos" });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new institution", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "zaz@idazapup.it",
      password: "Co2arCmS",
    });

    const { token } = responseToken.body;

    const responseInstitution = await request(app)
      .post("/institutions")
      .send({
        name: "Institution Hilda McGuire",
        cityId: city.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseInstitution.status).toBe(201);
  });

  it("should not be able to create a new institution with name exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "zaz@idazapup.it",
      password: "Co2arCmS",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/institutions")
      .send({
        name: "Institution Gertrude Cannon",
        cityId: city.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const responseInstitution = await request(app)
      .post("/institutions")
      .send({
        name: "Institution Gertrude Cannon",
        cityId: city.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseInstitution.status).toBe(400);
  });

  it("should not be able to create a new institution if you don't have permission", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "ecoge@zagpuzef.vg",
      password: "Co2arCmS",
    });

    const { token } = responseToken.body;

    const responseInstitution = await request(app)
      .post("/institutions")
      .send({
        name: "Institution Trevor Sparks",
        cityId: city.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseInstitution.status).toBe(401);
  });

  it("should not be able to create an institution if you are not authenticated", async () => {
    const responseInstitution = await request(app).post("/institutions").send({
      name: "Institution Troy Zimmerman",
      cityId: city.id,
    });

    expect(responseInstitution.status).toBe(401);
  });
});
