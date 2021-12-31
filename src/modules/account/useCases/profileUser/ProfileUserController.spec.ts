import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Profile User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("dh2gnCF6", 8);

    await connection.query(
      `INSERT INTO
        "user"(id, name, last_name, password, email, identifier)
        VALUES('${uuidV4()}', 'Randy Bell', 'Alejandro Martin', '${password}', 'sebojjot@ofni.su', '75857438221')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to access profile user", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "sebojjot@ofni.su",
      password: "dh2gnCF6",
    });

    const { token } = responseToken.body;

    const responseProfile = await request(app)
      .get("/users/profile")
      .set({ Authorization: `Bearer ${token}` });

    expect(responseProfile.status).toBe(200);
  });

  it("should not be able to access profile user if you are not authenticated", async () => {
    const responseProfile = await request(app).get("/users/profile");
    expect(responseProfile.status).toBe(401);
  });
});
