import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";

import { ListUsersUseCase } from "./ListUsersUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let listUsersUseCase: ListUsersUseCase;

describe("List Users", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
  });

  it("should be able to list all users", async () => {
    const listUsers = await listUsersUseCase.execute({
      page: 1,
      registersPerPage: 10,
      filter: "",
    });

    expect(listUsers).toHaveProperty("users");
    expect(listUsers).toHaveProperty("totalCount");
  });
});
