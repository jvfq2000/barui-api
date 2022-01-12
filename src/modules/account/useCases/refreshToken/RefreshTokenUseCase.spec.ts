import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersTokensRepositoryInMemory";
import { CreateUserUseCase } from "@modules/account/useCases/createUser/CreateUserUseCase";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory copy";
import { CreateInstitutionUseCase } from "@modules/activityRegulation/useCases/institutions/createInstitution/CreateInstitutionUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createInstitutionUseCase: CreateInstitutionUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let refreshTokenUseCase: RefreshTokenUseCase;
let dateProvider: DayjsDateProvider;

describe("Refresh Token", () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    institutionsRepositoryInMemory = new InstitutionsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    createInstitutionUseCase = new CreateInstitutionUseCase(
      institutionsRepositoryInMemory,
    );

    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      institutionsRepositoryInMemory,
    );

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
    let institution: ISaveInstitutionDTO = {
      cityId: "1d05966e-c0cb-50b3-84f5-0fe898aa16f0",
      name: "Institution Iva Rowe",
    };

    await createInstitutionUseCase.execute(institution);

    institution = await institutionsRepositoryInMemory.findByName(
      institution.name,
    );

    const user: ISaveUserDTO = {
      name: "Emily Dixon",
      lastName: "Jimmy Hopkins",
      email: "vojwacle@ku.ae",
      identifier: "24233361131",
      telephone: "(921) 583-5241",
      initialSemester: "1/2022",
      registration: "31191",
      accessLevel: "administrador do campus",
      institutionId: institution.id,
    };

    await createUserUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      user,
    );

    const authenticate = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.identifier,
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
