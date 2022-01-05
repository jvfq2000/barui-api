import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Refresh Token Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("3ZWeQ11M", 8);

    await connection.query(
      `INSERT INTO
          "user"(id, name, last_name, password, email, identifier, access_level)
          VALUES('${uuidV4()}', 'Gabriel Guerrero', 'Jeffrey Bates', '${password}', 'rofafa@wi.va', '07122105908', 'aluno')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new token", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "rofafa@wi.va",
      password: "3ZWeQ11M",
    });

    const { refreshToken } = responseToken.body;

    const responseUsers = await request(app).post("/refresh-token").send({
      token: refreshToken,
    });

    expect(responseUsers.status).toBe(200);
    expect(responseUsers.body).toHaveProperty("token");
    expect(responseUsers.body).toHaveProperty("refreshToken");
  });

  it("should not be able to create a new token if refreshToken not exists", async () => {
    const responseUsers = await request(app).post("/refresh-token");

    expect(responseUsers.status).toBe(401);
  });
});
