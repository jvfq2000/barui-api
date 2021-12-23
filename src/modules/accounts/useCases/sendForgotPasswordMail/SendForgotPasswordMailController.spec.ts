import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Send Forgot Password Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("dWttHNc5", 8);

    await connection.query(
      `INSERT INTO
          "user"(id, name, last_name, password, email, identifier, access_level)
          VALUES('${uuidV4()}', 'Logan Simon', 'Albert Wright', '${password}', 'joao.quintal@ji.dev.br', '08551045582', 'cliente')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to send forgot password mail to user", async () => {
    const responseForgotPassword = await request(app)
      .post("/password/forgot")
      .send({
        email: "joao.quintal@ji.dev.br",
      });

    expect(responseForgotPassword.status).toBe(204);
  });

  it("should not be able to send forgot password mail if user does not exists", async () => {
    const responseForgotPassword = await request(app)
      .post("/password/forgot")
      .send({
        email: "afetocez@da.ba",
      });

    expect(responseForgotPassword.status).toBe(400);
  });
});
