import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ModifyIsActiveUserUseCase } from "./ModifyIsActiveUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let modifyIsActiveUserUseCase: ModifyIsActiveUserUseCase;

describe("Activate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    modifyIsActiveUserUseCase = new ModifyIsActiveUserUseCase(
      usersRepositoryInMemory,
    );
  });

  it("should be able to modify active or inactive user status", async () => {
    let userInactivated: ICreateUserDTO = {
      email: "uvahego@kivake.sm",
      lastName: "Birdie Hopkins",
      name: "Alvin Graham",
      password: "KXogAsbd",
    };

    await createUserUseCase.execute(userInactivated);
    userInactivated = await usersRepositoryInMemory.findByEmail(
      userInactivated.email,
    );

    await modifyIsActiveUserUseCase.execute(userInactivated.id);

    let userActivated: ICreateUserDTO = {
      email: "hi@obakugi.kr",
      lastName: "Howard McKenzie",
      name: "Cory Griffith",
      password: "KXogAsbd",
    };

    await createUserUseCase.execute(userActivated);
    userActivated = await usersRepositoryInMemory.findByEmail(
      userActivated.email,
    );
    await modifyIsActiveUserUseCase.execute(userActivated.id);
    await modifyIsActiveUserUseCase.execute(userActivated.id);

    expect(userActivated.isActive).toBe(true);
    expect(userInactivated.isActive).toBe(false);
  });
});
