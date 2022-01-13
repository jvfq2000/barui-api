import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
import { CoursesRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/CoursesRepositoryInMemory";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory";
import { CreateInstitutionUseCase } from "@modules/activityRegulation/useCases/institutions/createInstitution/CreateInstitutionUseCase";
import { CitiesRepositoryInMemory } from "@modules/territory/repositories/inMemory/CitiesRepositoryInMemory";
import { StatesRepositoryInMemory } from "@modules/territory/repositories/inMemory/StatesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { FindUserByIdUseCase } from "./FindUserByIdUseCase";

let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let citiesRepositoryInMemory: CitiesRepositoryInMemory;
let statesRepositoryInMemory: StatesRepositoryInMemory;
let createInstitutionUseCase: CreateInstitutionUseCase;
let createUserUseCase: CreateUserUseCase;
let findUserByIdUseCase: FindUserByIdUseCase;

describe("Find User By Id", () => {
  beforeEach(() => {
    institutionsRepositoryInMemory = new InstitutionsRepositoryInMemory();
    coursesRepositoryInMemory = new CoursesRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    citiesRepositoryInMemory = new CitiesRepositoryInMemory();
    statesRepositoryInMemory = new StatesRepositoryInMemory();

    createInstitutionUseCase = new CreateInstitutionUseCase(
      institutionsRepositoryInMemory,
    );

    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      institutionsRepositoryInMemory,
    );

    findUserByIdUseCase = new FindUserByIdUseCase(
      usersRepositoryInMemory,
      institutionsRepositoryInMemory,
      coursesRepositoryInMemory,
      citiesRepositoryInMemory,
      statesRepositoryInMemory,
    );
  });

  it("should be able to find user by id", async () => {
    let institution: ISaveInstitutionDTO = {
      cityId: "1d05966e-c0cb-50b3-84f5-0fe898aa16f0",
      name: "Institution Iva Rowe",
    };

    await createInstitutionUseCase.execute(institution);

    institution = await institutionsRepositoryInMemory.findByName(
      institution.name,
    );

    let user: ISaveUserDTO = {
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

    user = await usersRepositoryInMemory.findByEmail(user.email);

    const userFoundById = await findUserByIdUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      user.id,
    );
    expect(userFoundById.id).toBe(user.id);
  });

  it("should not be able to find user if id non exists", async () => {
    await expect(
      findUserByIdUseCase.execute(
        "a79e1e38-62bf-5223-9be4-f5081c33eec7",
        "test",
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});
