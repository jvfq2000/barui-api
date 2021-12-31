import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;
const userId = uuidV4();
const userId2 = uuidV4();

describe("Update User Access Level Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("skusX9", 8);

    await connection.query(`
      INSERT INTO "user"(id, name, last_name, password, email, identifier, access_level)
      VALUES('${userId}', 'Frances Barnes', 'Ella Shelton', '${password}', 'ovoak@em.mq', '65827747034', 'administrador')
    `);

    await connection.query(`
      INSERT INTO "user"(id, name, last_name, password, email, identifier, access_level)
      VALUES('${userId2}', 'Olive Harrison', 'Mayme Dawson', '${password}', 'noogo@rowin.mz', '91211856892', 'cliente')
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to update user access level", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "ovoak@em.mq",
      password: "skusX9",
    });

    const { token } = responseToken.body;

    const responseUpdateAccessLevel = await request(app)
      .patch(`/users/access-level?userId=${userId2}`)
      .send({
        accessLevel: "profissional",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseUpdateAccessLevel.status).toBe(204);
  });

  it("should not be able to update user access level with non exist user", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "ovoak@em.mq",
      password: "skusX9",
    });

    const { token } = responseToken.body;

    const responseUpdateAccessLevel = await request(app)
      .patch(`/users/access-level?userId=fd3c77a7-f700-4ffb-a544-8410bb7b2544`)
      .send({
        accessLevel: "profissional",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseUpdateAccessLevel.status).toBe(400);
  });

  it("should not be able to update user access level with non exist access level", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "ovoak@em.mq",
      password: "skusX9",
    });

    const { token } = responseToken.body;

    const responseUpdateAccessLevel = await request(app)
      .patch(`/users/access-level?userId=${userId}`)
      .send({
        accessLevel: "krhrkomz",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseUpdateAccessLevel.status).toBe(400);
  });

  it("should not be able to update access level if user don't have permission", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "noogo@rowin.mz",
      password: "skusX9",
    });

    const { token } = responseToken.body;

    const responseUpdateAccessLevel = await request(app)
      .patch(`/users/access-level?userId=${userId2}`)
      .send({
        accessLevel: "administrador",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseUpdateAccessLevel.status).toBe(401);
  });
});
