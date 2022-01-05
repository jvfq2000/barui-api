import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("List Users Controller", () => {
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
          VALUES('${uuidV4()}', 'Gilbert Jordan', 'Francis Conner', '${password}', 'ecoge@zagpuzef.vg', '76252991806', 'aluno')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all users if you have permission", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "zaz@idazapup.it",
      password: "Co2arCmS",
    });

    const { token } = responseToken.body;

    const responseUsers = await request(app)
      .get("/users")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseUsers.status).toBe(200);
    expect(responseUsers.body.users.length > 0).toBe(true);
  });

  it("should not be able to list all users if you don't have permission", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "ecoge@zagpuzef.vg",
      password: "Co2arCmS",
    });

    const { token } = responseToken.body;

    const responseUsers = await request(app)
      .get("/users")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseUsers.status).toBe(401);
  });

  it("should not be able to list all users if you are not authenticated", async () => {
    const responseUsers = await request(app).get("/users");

    expect(responseUsers.status).toBe(401);
  });
});
