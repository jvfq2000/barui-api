import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Authenticate User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const password = await hash("N6aF6Zwt", 8);

    await connection.query(
      `INSERT INTO
        "user"(id, name, last_name, password, email, identifier, access_level)
        VALUES('${uuidV4()}', 'Micheal Glover', 'Caleb Horton', '${password}', 'nuv@roibmuf.bd', '81613429227', 'administrador')`,
    );

    await connection.query(
      `INSERT INTO
          "user"(id, name, last_name, password, email, identifier, access_level)
          VALUES('${uuidV4()}', 'Sam Singleton', 'Rodney Anderson', '${password}', 'maw@sipefful.cc', '43381416592', 'cliente')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to authenticate an user", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "nuv@roibmuf.bd",
      password: "N6aF6Zwt",
    });

    expect(responseToken.status).toBe(200);
    expect(responseToken.body).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "ci@wuzwuow.pa",
      password: "N6aF6Zwt",
    });

    expect(responseToken.status).toBe(401);
  });

  it("should not be able to authenticate an user with incorrect password", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "maw@sipefful.cc",
      password: "incorrect",
    });

    expect(responseToken.status).toBe(401);
  });
});
