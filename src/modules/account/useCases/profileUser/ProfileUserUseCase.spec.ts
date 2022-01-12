import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
import { CoursesRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/CoursesRepositoryInMemory";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory copy";
import { CreateInstitutionUseCase } from "@modules/activityRegulation/useCases/institutions/createInstitution/CreateInstitutionUseCase";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ProfileUserUseCase } from "./ProfileUserUseCase";

let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createInstitutionUseCase: CreateInstitutionUseCase;
let createUserUseCase: CreateUserUseCase;
let profileUserUseCase: ProfileUserUseCase;

describe("Profile User", () => {
  beforeEach(() => {
    institutionsRepositoryInMemory = new InstitutionsRepositoryInMemory();
    coursesRepositoryInMemory = new CoursesRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    createInstitutionUseCase = new CreateInstitutionUseCase(
      institutionsRepositoryInMemory,
    );

    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      institutionsRepositoryInMemory,
    );

    profileUserUseCase = new ProfileUserUseCase(
      usersRepositoryInMemory,
      institutionsRepositoryInMemory,
      coursesRepositoryInMemory,
    );
  });

  it("should be able to access profile user", async () => {
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

    const profile = await profileUserUseCase.execute(user.id);

    expect(profile).toHaveProperty("id");
  });
});
