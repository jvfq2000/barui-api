import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;

const useId = uuidV4();

describe("List User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("TFVsS8T7", 8);

    await connection.query(
      `INSERT INTO
        "user"(id, name, last_name, password, email, identifier, access_level)
        VALUES('${uuidV4()}', 'Frank Snyder', 'Ryan Kelley', '${password}', 'ri@fur.kg', '05690937755', 'administrador')`,
    );

    await connection.query(
      `INSERT INTO
          "user"(id, name, last_name, password, email, identifier, access_level)
          VALUES('${useId}', 'Daniel Morton', 'Maurice Kelley', '${password}', 'idwodom@puveda.mv', '54557123075', 'cliente')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to modify active or inactive user status", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "ri@fur.kg",
      password: "TFVsS8T7",
    });

    const { token } = responseToken.body;

    const responseModfyIsActive = await request(app)
      .patch(`/users/is-active?userId=${useId}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseModfyIsActive.status).toBe(204);
  });
});
