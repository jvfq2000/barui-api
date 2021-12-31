import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create a new user", async () => {
    const user: ISaveUserDTO = {
      name: "Harvey Day",
      lastName: "Darrell Boyd",
      email: "olovi@miogabod.in",
      password: "ukCrA3H8",
    };

    await createUserUseCase.execute(user);

    const userCreated = await usersRepositoryInMemory.findByEmail(user.email);

    expect(userCreated).toHaveProperty("id");
  });

  it("should not be able to create a new user with email exists", async () => {
    expect(async () => {
      const user: ISaveUserDTO = {
        name: "John Wilkerson",
        lastName: "Leah Hammond",
        email: "jipel@ovhojje.jm",
        password: "A5dEe21j",
      };

      await createUserUseCase.execute(user);
      await createUserUseCase.execute(user);
    }).rejects.toBeInstanceOf(AppError);
  });
});
