import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersTokensRepositoryInMemory";
import { CreateUserUseCase } from "@modules/account/useCases/createUser/CreateUserUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;
let refreshTokenUseCase: RefreshTokenUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

describe("Refresh Token", () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    refreshTokenUseCase = new RefreshTokenUseCase(
      usersTokensRepositoryInMemory,
      usersRepositoryInMemory,
      dateProvider,
    );

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
  });

  it("should be able to create a new token", async () => {
    const user: ISaveUserDTO = {
      name: "Winifred McCarthy",
      lastName: "Edna Santos",
      email: "odelej@odeni.org",
      password: "vyQgOiDz",
    };

    await createUserUseCase.execute(user);

    const authenticate = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    const { refreshToken } = authenticate;

    const newRefreshToken = await refreshTokenUseCase.execute(refreshToken);

    expect(newRefreshToken).toHaveProperty("token");
    expect(newRefreshToken).toHaveProperty("refreshToken");
  });

  it("should not be able to create a new token if refreshToken not exists", async () => {
    await expect(
      refreshTokenUseCase.execute("395133824845219"),
    ).rejects.toEqual(new AppError("Refresh token inválido!", 401));
  });
});
