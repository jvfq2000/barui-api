import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersTokensRepositoryInMemory";
import { CreateUserUseCase } from "@modules/account/useCases/createUser/CreateUserUseCase";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory copy";
import { CreateInstitutionUseCase } from "@modules/activityRegulation/useCases/institutions/createInstitution/CreateInstitutionUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createInstitutionUseCase: CreateInstitutionUseCase;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
  beforeEach(() => {
    institutionsRepositoryInMemory = new InstitutionsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    createInstitutionUseCase = new CreateInstitutionUseCase(
      institutionsRepositoryInMemory,
    );

    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      institutionsRepositoryInMemory,
    );

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
  });

  it("should be able to authenticate an user", async () => {
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

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.identifier,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an user with incorrect password", async () => {
    expect(async () => {
      let institution: ISaveInstitutionDTO = {
        cityId: "1d05966e-c0cb-50b3-84f5-0fe898aa16f0",
        name: "Institution Iva Rowe",
      };

      await createInstitutionUseCase.execute(institution);

      institution = await institutionsRepositoryInMemory.findByName(
        institution.name,
      );

      const user: ISaveUserDTO = {
        name: "Eliza Waters",
        lastName: "Sallie Harper",
        email: "fosgoc@kejundo.pl",
        identifier: "39257058502",
        telephone: "(921) 583-5241",
        initialSemester: "1/2022",
        registration: "43073",
        accessLevel: "administrador do campus",
        institutionId: institution.id,
      };

      await createUserUseCase.execute(
        "a79e1e38-62bf-5223-9be4-f5081c33eec7",
        user,
      );

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "9IjL3SqP",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "tene@pud.kw",
        password: "QIFSOpDN",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
