import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { FindUserByIdUseCase } from "./FindUserByIdUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let findUserByIdUseCase: FindUserByIdUseCase;

describe("Find User By Id", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    findUserByIdUseCase = new FindUserByIdUseCase(usersRepositoryInMemory);
  });

  it("should be able to find user by id", async () => {
    let user: ICreateUserDTO = {
      name: "Lillian Wagner",
      lastName: "Mary Garza",
      email: "afarok@kig.cg",
      accessLevel: "cliente",
      identifier: "24950373925",
      password: "VcHnuvgK",
    };

    await createUserUseCase.execute(user);
    user = await usersRepositoryInMemory.findByEmail("afarok@kig.cg");

    const userFoundById = await findUserByIdUseCase.execute(user.id);
    expect(userFoundById.id).toBe(user.id);
  });

  it("should not be able to find user if id non exists", async () => {
    await expect(findUserByIdUseCase.execute("test")).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
