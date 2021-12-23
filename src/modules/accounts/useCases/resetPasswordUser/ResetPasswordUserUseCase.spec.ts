import { compare } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

let dateProvider: IDateProvider;
let createUserUseCase: CreateUserUseCase;
let resetPasswordUserUseCase: ResetPasswordUserUseCase;
let usersRepositoryInMemory: IUsersRepository;
let usersTokensRepositoryInMemory: IUsersTokensRepository;

describe("Reset Password", () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    resetPasswordUserUseCase = new ResetPasswordUserUseCase(
      dateProvider,
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
    );
  });

  it("should be able to reset password user", async () => {
    const password = "tyeDPcR1";

    let user: ICreateUserDTO = {
      email: "vidwu@ir.fr",
      lastName: "Andre Sparks",
      name: "Cory Moreno",
      password,
    };

    await createUserUseCase.execute(user);

    user = await usersRepositoryInMemory.findByEmail(user.email);
    const token = uuidV4();
    const expiresDate = dateProvider.addHours(3);

    await usersTokensRepositoryInMemory.create({
      userId: user.id,
      refreshToken: token,
      expiresDate,
    });

    const newPassword = "8OWGEj0L";
    await resetPasswordUserUseCase.execute({ token, password: newPassword });
    const changedUser = await usersRepositoryInMemory.findById(user.id);

    expect(await compare(newPassword, changedUser.password)).toBe(true);
    expect(await compare(password, changedUser.password)).toBe(false);
  });

  it("should not be able to reset password user with token expired", async () => {
    const password = "zMBtNUFA";
    let user: ICreateUserDTO = {
      email: "etdi@rawetme.io",
      lastName: "Lulu Sharp",
      name: "Blanche Daniels",
      password,
    };

    await createUserUseCase.execute(user);

    user = await usersRepositoryInMemory.findByEmail(user.email);
    const token = uuidV4();
    const expiresDate = dateProvider.subtractHours(1);

    await usersTokensRepositoryInMemory.create({
      userId: user.id,
      refreshToken: token,
      expiresDate,
    });

    await expect(
      resetPasswordUserUseCase.execute({ token, password: "EpiptRk7" }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to reset password user with invalid token", async () => {
    await expect(
      resetPasswordUserUseCase.execute({
        token: "BOwVAJQZjoys7jI",
        password: "LMJfAoAc",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
