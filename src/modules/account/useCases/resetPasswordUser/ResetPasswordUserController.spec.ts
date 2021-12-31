import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { app } from "@shared/infra/http/app";

let dateProvider: IDateProvider;
let connection: Connection;
const token = uuidV4();
const tokenExpired = uuidV4();

describe("Reset Password Controller", () => {
  beforeAll(async () => {
    dateProvider = new DayjsDateProvider();

    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("skusX9", 8);
    const userId = uuidV4();

    await connection.query(`
      INSERT INTO "user"(id, name, last_name, password, email, identifier)
      VALUES('${userId}', 'Frances Barnes', 'Ella Shelton', '${password}', 'ovoak@em.mq', '37876105040')
    `);

    let expiresDate = dateProvider.convertToUTC(dateProvider.addHours(3));
    await connection.query(`
      INSERT INTO "user_token"(id, refresh_token, expires_date, user_id)
      VALUES('${uuidV4()}', '${token}', '${expiresDate}', '${userId}')
    `);

    expiresDate = dateProvider.convertToUTC(dateProvider.subtractHours(1));
    await connection.query(`
      INSERT INTO "user_token"(id, refresh_token, expires_date, user_id)
      VALUES('${uuidV4()}', '${tokenExpired}', '${expiresDate}', '${userId}')
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to reset password user", async () => {
    const response = await request(app)
      .post(`/password/reset?token=${token}`)
      .send({
        password: "4iZcQSnj",
      });

    expect(response.status).toBe(204);
  });

  it("should not be able to reset password user with token expired", async () => {
    const response = await request(app)
      .post(`/password/reset?token=${tokenExpired}`)
      .send({
        password: "4iZcQSnj",
      });

    expect(response.status).toBe(400);
  });

  it("should not be able to reset password user with token invalid", async () => {
    const response = await request(app)
      .post(`/password/reset?token=123523445`)
      .send({
        password: "4iZcQSnj",
      });

    expect(response.status).toBe(400);
  });
});
