import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;

const userId = uuidV4();

describe("Find User By Id Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("h08f563J", 8);

    await connection.query(
      `INSERT INTO
          "user"(id, name, last_name, password, email, identifier, access_level)
          VALUES('${userId}', 'Eddie Clayton', 'Gavin Terry', '${password}', 'tan@tihuhoh.la', '38770871889', 'cliente')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to find user by id", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "tan@tihuhoh.la",
      password: "h08f563J",
    });

    const { token } = responseToken.body;

    const responseUpdateProfileUser = await request(app)
      .get(`/users/by-id?userId=${userId}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseUpdateProfileUser.status).toBe(200);
  });

  it("should not be able to find user if id non exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "tan@tihuhoh.la",
      password: "h08f563J",
    });

    const { token } = responseToken.body;

    const responseUpdateProfileUser = await request(app)
      .get(`/users/by-id?userId=${uuidV4()}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseUpdateProfileUser.status).toBe(400);
  });
});
