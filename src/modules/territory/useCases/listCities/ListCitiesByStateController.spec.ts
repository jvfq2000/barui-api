import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("List Cities Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all cities", async () => {
    const responseStates = await request(app).get("/states");

    const responseCities = await request(app).get(
      `/cities?stateId=${responseStates.body[0].id}`,
    );

    expect(responseCities.status).toBe(200);
    expect(responseCities.body.length > 0).toBe(true);
  });
});
