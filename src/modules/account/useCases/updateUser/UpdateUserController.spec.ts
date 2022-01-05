import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;

const userId = uuidV4();

describe("Update User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("h08f563J", 8);

    await connection.query(
      `INSERT INTO
          "user"(id, name, last_name, password, email, identifier, access_level)
          VALUES('${uuidV4()}', 'Ruby Barnett', 'Max Hammond', '${password}', 'bora@ruc.cw', '88471531365', 'aluno')`,
    );

    await connection.query(
      `INSERT INTO
          "user"(id, name, last_name, password, email, identifier, access_level)
          VALUES('${userId}', 'Eddie Clayton', 'Gavin Terry', '${password}', 'tan@tihuhoh.la', '38770871889', 'administrador geral')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to update a user", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "tan@tihuhoh.la",
      password: "h08f563J",
    });

    const { token } = responseToken.body;

    const responseUpdateUser = await request(app)
      .put(`/users?userId=${userId}`)
      .send({
        name: "Francis Watson",
        lastName: "Marion Montgomery",
        email: "julponu@lu.om",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseUpdateUser.status).toBe(200);
  });

  it("should not be able to update a profile user if you are not authenticated", async () => {
    const responseUpdateUser = await request(app)
      .put(`/users?userId=${userId}`)
      .send({
        name: "Mathilda Griffith",
        lastName: "Edward May",
        email: "bir@litiw.ee",
      });

    expect(responseUpdateUser.status).toBe(401);
  });
});
