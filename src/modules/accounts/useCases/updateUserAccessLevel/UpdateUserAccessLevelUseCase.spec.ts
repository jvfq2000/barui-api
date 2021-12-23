import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UpdateUserAccessLevelUseCase } from "./UpdateUserAccessLevelUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let updateUserAccessLevelUseCase: UpdateUserAccessLevelUseCase;

describe("Update User Access Level", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

    updateUserAccessLevelUseCase = new UpdateUserAccessLevelUseCase(
      usersRepositoryInMemory,
    );
  });

  it("should be able to update user access level", async () => {
    let user: ICreateUserDTO = {
      email: "zuk@mud.gh",
      lastName: "Ivan Barrett",
      name: "Sophie Stewart",
      accessLevel: "cliente",
      password: "JxUqaiXF",
    };

    await createUserUseCase.execute(user);

    user = await usersRepositoryInMemory.findByEmail(user.email);
    const newAccessLevel = "profissional";

    await updateUserAccessLevelUseCase.execute({
      userId: user.id,
      newAccessLevel,
    });

    expect(user.accessLevel === newAccessLevel).toBe(true);
  });

  it("should not be able to update user access level with non exist user", async () => {
    await expect(
      updateUserAccessLevelUseCase.execute({
        userId: "ovljjwhm",
        newAccessLevel: "cliente",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update user access level with non exist access level", async () => {
    let user: ICreateUserDTO = {
      email: "zuk@mud.gh",
      lastName: "Ivan Barrett",
      name: "Sophie Stewart",
      accessLevel: "cliente",
      password: "JxUqaiXF",
    };

    await createUserUseCase.execute(user);

    user = await usersRepositoryInMemory.findByEmail(user.email);

    await expect(
      updateUserAccessLevelUseCase.execute({
        userId: user.id,
        newAccessLevel: "non exists",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
