import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("List States Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all states", async () => {
    const responseStates = await request(app).get("/states");

    expect(responseStates.status).toBe(200);
    expect(responseStates.body.states.length > 0).toBe(true);
  });
});
