import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Create User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("Co2arCmS", 8);

    await connection.query(
      `INSERT INTO
        "user"(id, name, last_name, password, email, identifier, access_level)
        VALUES('${uuidV4()}', 'Francisco Wheeler', 'Loretta Gutierrez', '${password}', 'zaz@idazapup.it', '12445961325', 'administrador')`,
    );

    await connection.query(
      `INSERT INTO
          "user"(id, name, last_name, password, email, identifier, access_level)
          VALUES('${uuidV4()}', 'Gilbert Jordan', 'Francis Conner', '${password}', 'ecoge@zagpuzef.vg', '76252991806', 'cliente')`,
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

    const response = await request(app)
      .post("/users")
      .send({
        name: "Emily Dixon",
        lastName: "Jimmy Hopkins",
        email: "vojwacle@ku.ae",
        password: "1tYxZqCE",
      })
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

    await request(app)
      .post("/users")
      .send({
        name: "Jesus Miles",
        lastName: "Dorothy Bell",
        email: "maimbub@etnaf.sj",
        password: "bSlyYLyD",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .post("/users")
      .send({
        name: "Jesus Miles",
        lastName: "Dorothy Bell",
        email: "maimbub@etnaf.sj",
        password: "bSlyYLyD",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });

  it("should not be able to create a new user if you don't have permition", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "ecoge@zagpuzef.vg",
      password: "Co2arCmS",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/users")
      .send({
        name: "Cecilia Terry",
        lastName: "Leonard Herrera",
        email: "ja@zuhvodver.cw",
        password: "1tYxZqCE",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(401);
  });
});
