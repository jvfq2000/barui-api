import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UpdateProfileUserUseCase } from "./UpdateProfileUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let updateProfileUserUseCase: UpdateProfileUserUseCase;

describe("Update Profile User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    updateProfileUserUseCase = new UpdateProfileUserUseCase(
      usersRepositoryInMemory,
    );
  });

  it("should be able to update a profile user", async () => {
    let user: ICreateUserDTO = {
      name: "Sophia Obrien",
      lastName: "Adeline Dennis",
      email: "cubu@fimefi.tg",
      password: "MM287hAp",
    };

    await createUserUseCase.execute(user);

    user = await usersRepositoryInMemory.findByEmail(user.email);

    Object.assign(user, {
      name: "Alexander Clayton",
      lastName: "Randall Abbott",
      email: "izzunba@ma.pe",
    });
    user = await updateProfileUserUseCase.execute(user);

    expect(user.name).toBe("Alexander Clayton");
    expect(user.lastName).toBe("Randall Abbott");
    expect(user.email).toBe("izzunba@ma.pe");
  });
});
