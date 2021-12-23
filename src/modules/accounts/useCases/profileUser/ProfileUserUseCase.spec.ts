import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ProfileUserUseCase } from "./ProfileUserUseCase";

let usersRepositoryInMemory: IUsersRepository;
let createUserUseCase: CreateUserUseCase;
let profileUserUseCase: ProfileUserUseCase;

describe("Profile User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    profileUserUseCase = new ProfileUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to access profile user", async () => {
    let user: ICreateUserDTO = {
      email: "uhu@zo.sz",
      lastName: "Anthony Gonzales",
      name: "Katie Mann",
      password: "nnTPMEKR",
    };

    await createUserUseCase.execute(user);
    user = await usersRepositoryInMemory.findByEmail(user.email);

    const profile = await profileUserUseCase.execute(user.id);

    expect(profile).toHaveProperty("id");
  });
});
