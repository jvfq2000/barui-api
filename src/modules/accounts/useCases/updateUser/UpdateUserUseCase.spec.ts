import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let updateUserUseCase: UpdateUserUseCase;

describe("Update User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    updateUserUseCase = new UpdateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to update a user", async () => {
    let user: ICreateUserDTO = {
      name: "Sophia Obrien",
      lastName: "Adeline Dennis",
      identifier: "90060257428",
      email: "cubu@fimefi.tg",
      password: "MM287hAp",
    };

    await createUserUseCase.execute(user);

    user = await usersRepositoryInMemory.findByEmail(user.email);

    Object.assign(user, {
      id: user.id,
      name: "Alexander Clayton",
      lastName: "Randall Abbott",
      identifier: "67371587546",
      email: "izzunba@ma.pe",
    });
    user = await updateUserUseCase.execute(user);

    expect(user.name).toBe("Alexander Clayton");
    expect(user.lastName).toBe("Randall Abbott");
    expect(user.email).toBe("izzunba@ma.pe");
  });
});
